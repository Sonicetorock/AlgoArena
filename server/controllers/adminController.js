const mongoose = require('mongoose');
const User = require('../models/Users');
const Problem = require('../models/Problems');
const TestCase = require('../models/TestCases');
const Submissions = require('../models/Submissions');

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

//get overall verdict analysis
exports.getOverallVerdictCounts = async (req, res) => {
    try {
      console.log(`called overall verdict analysis for user`)
      const verdictCounts = await Submissions.aggregate([
        { $group: {
          _id: '$verdict',
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          verdict: '$_id',
          count: 1
        }}
      ]);
  
      // Transform the result into the format needed for the chart
      const formattedCounts = {
        'AC : Accepted': 0,
        'WA : Wrong Answer': 0,
        'RE : Runtime Error': 0,
        'TLE : Time Limit Exceeded': 0,
        'MLE : Memory Limit Exceeded': 0
      };
  
      verdictCounts.forEach(item => {
        if (item.verdict in formattedCounts) {
          formattedCounts[item.verdict] = item.count;
        } else {
          // Handle any unexpected verdicts
          formattedCounts[item.verdict] = item.count;
        }
      });
  
      res.json(formattedCounts);
    } catch (error) {
      console.error('Error fetching overall verdict counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//get verdict counts by userID
exports.getVerdictCounts = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you want to get counts for a specific user
    
      console.log(`called verdict analysis for user ${userId}`)
      const verdictCounts = await Submissions.aggregate([
        { $match: { uid: mongoose.Types.ObjectId(userId) } },
        { $group: {
          _id: '$verdict',
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          verdict: '$_id',
          count: 1
        }}
      ]);
  
      // Transform the result into the format needed for the chart
      const formattedCounts = {
        'AC : Accepted': 0,
        'WA : Wrong Answer': 0,
        'RE : Runtime Error': 0,
        'TLE : Time Limit Exceeded': 0,
        'MLE : Memory Limit Exceeded': 0
      };
  
      verdictCounts.forEach(item => {
        formattedCounts[item.verdict] = item.count;
      });
  
      res.json(formattedCounts);
    } catch (error) {
      console.error('Error fetching verdict counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.getLanguageWiseSubmissionCounts = async (req, res) => {
    console.log("Called language wise sub analysis")
    try {
      const languageCounts = await Submissions.aggregate([
        { $group: {
          _id: '$choseLang',
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          language: '$_id',
          count: 1
        }},
        { $sort: { count: -1 } } // Sort by count in descending order
      ]);
  
      //formatting
      const formattedCounts = {};
      languageCounts.forEach(item => {
        formattedCounts[item.language.toUpperCase()] = item.count;
      });
  
      res.json(formattedCounts);
    } catch (error) {
      console.error('Error fetching language wise submission analysis:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getProblemLevelCounts = async (req, res) => {
    try {
      const levelCounts = await Problem.aggregate([
        { $group: {
          _id: '$level',
          count: { $sum: 1 }
        }},
        { $project: {
          _id: 0,
          level: '$_id',
          count: 1
        }}
      ]);
  
      // Transform the result into the format needed for the chart
      const formattedCounts = {
        normal: 0,
        premium: 0,
        elite: 0
      };
  
      levelCounts.forEach(item => {
        if (item.level in formattedCounts) {
          formattedCounts[item.level] = item.count;
        }
      });
  
      res.json(formattedCounts);
    } catch (error) {
      console.error('Error fetching problem level counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  //monthly wise total questions, submissions, users
  exports.getMonthlyStats = async (req, res) => {
    try {
      const currentDate = new Date();
      const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
  
      // get cumulative counts
      const getCumulativeCounts = async (Model) => {
        const counts = await Model.aggregate([
          {
            $group: {
              _id: null,
              countsByMonth: {
                $push: {
                  date: "$createdAt",
                  count: 1
                }
              }
            }
          }
        ]);
  
        return counts.length > 0 ? counts[0] : { totalCount: 0, countsByMonth: [] };
      };
  
      const userCounts = await getCumulativeCounts(User);
      const submissionCounts = await getCumulativeCounts(Submissions);
      const questionCounts = await getCumulativeCounts(Problem);
  
      //indivudual arr
      const months = [];
      const userCountsArray = [];
      const submissionCountsArray = [];
      const questionCountsArray = [];
  
      // Generate data for the last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        months.push(date.toLocaleString('default', { month: 'short' }));
  
        userCountsArray.push(userCounts.countsByMonth.filter(item => item.date <= monthEnd).length);
        submissionCountsArray.push(submissionCounts.countsByMonth.filter(item => item.date <= monthEnd).length);
        questionCountsArray.push(questionCounts.countsByMonth.filter(item => item.date <= monthEnd).length);
      }
  
      res.json({
        months,
        userCounts: userCountsArray,
        submissionCounts: submissionCountsArray,
        questionCounts: questionCountsArray,
        // totals: {
        //   users: userCounts.totalCount,
        //   submissions: submissionCounts.totalCount,
        //   questions: questionCounts.totalCount
        // }
      });
  
    } catch (error) {
      console.error('Error fetching monthly statistics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };