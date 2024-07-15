const mongoose = require('mongoose');
const User = require('../models/Users');
const Problem = require('../models/Problems');
const TestCase = require('../models/TestCases');

// fetching admin dashboard stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAcceptedSubmissions = await Problem.aggregate([{ $group: { _id: null, total: { $sum: "$acceptedSols" } } }]);
        const totalRejectedSubmissions = await Problem.aggregate([{ $group: { _id: null, total: { $sum: { $subtract: ["$totalSubmissions", "$acceptedSols"] } } } }]);
        const totalProblems = await Problem.countDocuments();

        res.status(200).json({
            totalUsers,
            totalAcceptedSubmissions: totalAcceptedSubmissions[0]?.total || 0,
            totalRejectedSubmissions: totalRejectedSubmissions[0]?.total || 0,
            totalProblems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// fetching problems with pagination
exports.getAllProblems = async (req, res) => {
    const { page = 1, limit = 15 } = req.query;

    try {
        const problems = await Problem.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('testcases')
            .populate('demoTestCases');
        const total = await Problem.countDocuments();
        res.status(200).json({
            problems,
            total,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get a problem with id from params
exports.getProblem = async (req, res) => {
    try {
        const { id } = req.params;

        // get the  specific problem
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        console.log("BC: prob fetched from db")
        res
          .status(200)
          .json({ message: "Problem recieved successfully", 
                    problem 
                 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// inserting new problem into db 
exports.addProblem = async (req, res) => {
    try {
        const { 
            probName, 
            probStatement, 
            difficulty, 
            testcases, 
            demoTestCases, 
            level, 
            setNum, 
            tags, 
            hints, 
            constraintTime, 
            constraintMemory
        } = req.body;//getting input from user

        // Create the problem document
        const problem = new Problem({
            probName,
            probStatement,
            difficulty,
            level,
            setNum,
            tags,
            hints,
            testcases,
            demoTestCases,
            constraintTime,
            constraintMemory
        });

        // Save the problem
        await problem.save();

        res.status(201).json({ message: "Problem created successfully", problem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// updating a problem again with id based
exports.updateProblem = async (req, res) => {
    console.log("update problem called")
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the problem and update it
        const updatedProblem = await Problem.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        res.status(200).json({ message: "Problem updated successfully", updatedProblem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// deleting a problem
exports.deleteProblem = async (req, res) => {
    console.log("delete problem")
    try {
        const { id } = req.params;

        // Delete the problem
        const deletedUser = await Problem.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // Delete associated test cases
        await TestCase.deleteMany({ pid: id });

        res.status(200).json({ message: "Problem deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get all users
exports.getAllUsers = async (req,res)=>{
    console.log("getting all users")
    try {
        const users = await User.find();
        res.status(200).json({users});

    } catch (error) {
        res.status(500).json({ error: error.message || "error fetching all users"});
    }
}

// deleting a user
exports.deleteUser = async (req, res) => {
    console.log("delete user")
    try {
        const { id } = req.params;

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User erased successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
