import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiAdmin } from "../../utils/apiURLS";

const difficultyColors = {
  1: "text-green-500",
  2: "text-yellow-500",
  3: "text-red-500",
  4: "text-purple-500",
};

const levelColors = {
  normal: "text-blue-500",
  premium: "text-orange-500",
  elite: "text-red-500",
};

const AdminDashboardPage = () => {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState({});
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/dashboard-stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${apiAdmin}/problems?page=${currentPage}`
        );
        setProblems(response.data.problems);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchStats();
    fetchProblems();
  }, [accessToken, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await axios.delete(`${apiAdmin}/problems/${id}`);
        setProblems(problems.filter((problem) => problem._id !== id));
        setStats((prevStats) => ({
          ...prevStats,
          totalProblems: prevStats.totalProblems - 1,
        }));
        toast.success("Problem deleted successfully");
      } catch (error) {
        toast.error("Error deleting problem");
        console.error("Error deleting problem:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Dashboard
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-evenly gap-2 mb-6">
          {/* <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-xl font-semibold text-blue-600">Total Users</p>
            <p className="text-2xl">{stats.totalUsers}</p>
          </div> */}
          <div class="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div class="z-20 flex flex-col justify-center items-center">
              <span class="font-bold text-6xl ml-2">{stats.totalUsers}+</span>
              <p class="font-bold">Users</p>
            </div>
          </div>

          <div class="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute blur z-10 fill-rose-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>
            {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute blur z-10 fill-rose-300 duration-500 group-hover:blur-none group-hover:scale-105">
  <path fill="#fcdb35" transform="translate(100 100)" d="M33.6,-27.5C46.2,-11,61,3.2,59.8,15.8C58.7,28.5,41.6,39.7,23,49.2C4.4,58.7,-15.7,66.6,-34.2,61.4C-52.8,56.2,-69.7,38,-68.8,21.5C-67.9,5.1,-49.2,-9.6,-34.8,-26.5C-20.3,-43.4,-10.2,-62.5,0.2,-62.7C10.5,-62.8,21,-44,33.6,-27.5Z" />
</svg> */}

            <div class="z-20 flex flex-col justify-center items-center">
              <span class="font-bold text-6xl ml-2">{stats.totalAcceptedSubmissions}+</span>
              <p class="font-bold">Accepted Submissions</p>
            </div>
          </div>

          <div class="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div class="z-20 flex flex-col justify-center items-center">
              <span class="font-bold text-6xl ml-2">{stats.totalRejectedSubmissions}+</span>
              <p class="font-bold">Rejected Submissions</p>
            </div>
          </div>

          <div class="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div class="z-20 flex flex-col justify-center items-center">
              <span class="font-bold text-6xl ml-2">{stats.totalProblems}+</span>
              <p class="font-bold">Total Problems</p>
            </div>
          </div>
        </div>
        <Link
          to="/admin/post-problem"
          className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Post a Problem
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Problems</h2>
        <ul className="space-y-4">
          {problems?.map((problem) => (
            <li key={problem._id} className="bg-gray-50 p-4 rounded-lg h-auto">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-700">
                  {problem.probName}
                </p>
                <div className="space-x-4">
                  <Link
                    to={`/admin/edit-problem/${problem._id}`}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-200"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(problem._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 text-gray-600">
                <p>
                  Total Accepted Solutions: {problem.totalAcceptedSolutions}
                </p>
                <p>Total Submissions: {problem.totalSubmissions}</p>
                <span className={`${levelColors[problem.level]} border p-1`}>
                  {problem.level}
                </span>
                <span className={`${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-700 hover:text-white transition duration-200`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
