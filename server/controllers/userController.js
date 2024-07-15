const { StatusCodes } = require("http-status-codes");
require('dotenv').config();
const bcrypt = require('bcryptjs');

//model imports
const Users = require('../models/Users');
const Problems = require('../models/Problems');
const Submissions = require('../models/Submissions');

//utility function for code execution of a user
const { generateFile } = require('../utils/generateFile');
const { execute } = require('../utils/execute');
const { deleteFile } =require('../utils/generateFile');
const { generateInputFile } = require("../utils/generateInputFile");


//account details based on email
const getAccountDetails = async (req,res)=>{
    try {
        const {email}= req.body
        const user = await Users.findOne({email})
        if(!user) return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'User does not exist! Please Sign Up' });
        return res.status(StatusCodes.OK).json({user});
    } catch (error) {
        console.log("Error Fetching account details : " +error)
    }
}

//update profile based on email and old passwrod too
const updateAccountDetails = async (req, res) => {
    console.log("called update profile");
    try {
        //came here, through verifyjwt, so we can get usermail id from req.user also

        const { oldPassword, updatedData } = req.body;

        // Find  user by email 
        const user = await Users.findOne({ email: updatedData.email });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect Old Password' });
        }

        // Hash the new password if it is being updated
        if (updatedData.password && updatedData.password !== user.password) {
            const salt = await bcrypt.genSalt(8);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        // Update user details
        Object.assign(user, updatedData);

        // Save the updated user details
        await user.save();
        user.password = undefined;
        user.refreshToken = undefined;
        res.status(200).json({ message: 'Account details updated successfully', user });
    } catch (error) {
        console.log('BC: Error updating account details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// fetching problems with pagination sending pagination limit
const getAllProblems = async (req, res) => {
    const { page = 1, limit = 15 } = req.query;

    try {
        const problems = await Problems.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('testcases')
            .populate('demoTestCases');
        const total = await Problems.countDocuments();
        res.status(200).json({
            problems,
            total,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get a problem based on id
const getProblem = async (req, res) => {
    try {
        const { id } = req.params;

        // get the  specific problem
        const problem = await Problems.findById(id);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        console.log("BC: prob fetched from db",problem)
        res
          .status(200)
          .json({ message: "Problem recieved successfully", 
                    problem 
                 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//compile the problem upon run button in frontend
const compile = async (req, res) => {
    try {
      const { code, language, input, pid } = req.body;
      console.log({ code, language, input, pid });
  
      const codeFilePath = generateFile(code, language);
      console.log('Code File created at :',codeFilePath);

      const inputFilePath = generateInputFile(input, language);
      console.log('Input File created at :',inputFilePath);

      const output = await execute(codeFilePath, language, inputFilePath);
      console.log('exe created at :', codeFilePath);


      //delete the genrated code file
        deleteFile(`${codeFilePath}`)
        console.log("code file deleted")

      //deleting the input file
        deleteFile(`${inputFilePath}`) 
        console.log("input file deleted")

      res.status(200).json({ codeFilePath, output , inputFilePath});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message || error.toString(), msg: "Error in compiling the Code" });
    }
};  

const submitCode = async (req, res) => {
    try {
        const { code, language, pid, uid } = req.body;
        console.log({ code, language, pid, uid });

        // Retrieve the problem and its test cases
        const problem = await Problems.findById(pid);
        if (!problem) {
            return res.status(404).json({ error: "Problem not found" });
        }

        const codeFilePath = generateFile(code, language);
        console.log('Code File created at:', codeFilePath);

        const results = [];
        let allTestsPassed = true;
        let maxExecTime = 0;
        let maxExecMemory = 0;
        let verdict = 'AC : Accpeted'; // Assume Accepted initially
        const totalTCs = problem.testcases.length;
        // Execute code for each test case
        for (const testCase of problem.testcases) {
            const inputFilePath = generateInputFile(testCase.input);
            console.log('Input File created at:', inputFilePath);

            try {
                const startTime = process.hrtime();
                const output = await execute(codeFilePath, language, inputFilePath);
                const endTime = process.hrtime(startTime);
                const execTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

                maxExecTime = Math.max(maxExecTime, execTime);
                // Note: Measuring memory usage accurately requires additional setup

                const passed = output.trim() === testCase.output.trim();
                     results.push({
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    actualOutput: output,
                    passed: passed,
                    execTime: execTime
                });

                if (!passed) {
                    allTestsPassed = false;
                    verdict = 'WA :Wrong answer'; // Wrong Answer
                    break;
                }

                // Clean up input file
                deleteFile(inputFilePath);
            } catch (error) {
                results.push({
                    input: testCase.input,
                    error: error.toString(),
                    passed: false
                });
                allTestsPassed = false;
                verdict = 'RE :Runtime Error'; // Runtime Error
                break;
            }
        }

        // Clean up code file
        deleteFile(codeFilePath);

        // Update problem statistics
        problem.totalSubmissions += 1;
        if (allTestsPassed) {
            problem.acceptedSols += 1;
        }
        await problem.save();

        // Create and save submission
        const submission = new Submissions({
            pid: pid,
            uid: uid,
            code: code,
            choseLang: language,
            verdict: verdict,
            score: allTestsPassed ? 100 : -15, // scores
            execTime: maxExecTime,
            execMemory: maxExecMemory // This will be 0 unless you implement memory measurement
        });

        await submission.save();

        res.status(200).json({
            allTestsPassed,
            results, // an array
            submissionId: submission._id,
            verdict: verdict, 
            execTime: maxExecTime,
            execMemory: maxExecMemory,
            totalTCs : totalTCs
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || error.toString(), msg: "Error in processing submission" });
    }
};

  
module.exports = {getAccountDetails,updateAccountDetails,getAllProblems,getProblem,compile,submitCode}