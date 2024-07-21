const express = require('express');
const { getDashboardStats, getAllProblems, addProblem, updateProblem, deleteProblem, getProblem, getAllUsers, deleteUser, getOverallVerdictCounts, getVerdictCounts, getLanguageWiseSubmissionCounts, getProblemLevelCounts, getMonthlyStats } = require('../controllers/adminController');
const { isAdmin } = require('../middleware/verifyJWT'); 

const adminRoutes = express.Router();
// MW to check if the user is an admin
adminRoutes.use(isAdmin); 

//for homepage 
adminRoutes.get( '/dashboard-stats', getDashboardStats);
adminRoutes.get('/problems',getAllProblems );

//http for individual prob
adminRoutes.get('/problems/:id',getProblem);
adminRoutes.post('/problems', addProblem);
adminRoutes.put( '/problems/:id',updateProblem );
adminRoutes.delete('/problems/:id',deleteProblem);

//controllers for user
adminRoutes.get('/users',getAllUsers);
adminRoutes.delete('/users/:id',deleteUser);

//graph visuals
adminRoutes.get('/overallVerdicts', getOverallVerdictCounts)
adminRoutes.get('/verdicts/:id', getVerdictCounts)
adminRoutes.get('/getLanguageWiseSubmissionCounts', getLanguageWiseSubmissionCounts);
adminRoutes.get('/getProblemLevelCount', getProblemLevelCounts)
adminRoutes.get('/getMonthlyStats', getMonthlyStats)
module.exports =  adminRoutes;
