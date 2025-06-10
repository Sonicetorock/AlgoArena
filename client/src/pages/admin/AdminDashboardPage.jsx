import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { apiAdmin } from "../../utils/apiURLS";
import DoughnutHolder from "./graphs/DoughnutHolder.jsx"
import PiechartHolder from "./graphs/PiechartHolder.jsx";
import ProblemLevel_DoughnutHolder from "./graphs/ProblemLevel_DoughnutHolder.jsx";
import MonthlyStats_LineChart from "./graphs/MonthlyStats_LineChart.jsx";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({});
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/dashboard-stats`);
        setStats(response.data);
      } catch (error) {
        toast.error("Error fetching stats")
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [accessToken]);

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-wrap justify-evenly gap-4">
          <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div className="z-20 flex flex-col justify-center items-center">
              <span className="font-bold text-6xl ml-2">{stats.totalUsers}+</span>
              <p className="font-bold">Users</p>
            </div>
          </div>

          <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute blur z-10 fill-rose-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div className="z-20 flex flex-col justify-center items-center">
              <span className="font-bold text-6xl ml-2">
                {stats.totalAcceptedSubmissions}+
              </span>
              <p className="font-bold">Accepted Submissions</p>
            </div>
          </div>

          <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div className="z-20 flex flex-col justify-center items-center">
              <span className="font-bold text-6xl ml-2">
                {stats.totalRejectedSubmissions}+
              </span>
              <p className="font-bold">Rejected Submissions</p>
            </div>
          </div>

          <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-48 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
            >
              <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
              ></path>
            </svg>

            <div className="z-20 flex flex-col justify-center items-center">
              <span className="font-bold text-6xl ml-2">
                {stats.totalProblems}+
              </span>
              <p className="font-bold">Total Problems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="aspect-square">
            <PiechartHolder />
          </div>

          <div className="aspect-square">
            <DoughnutHolder />
          </div>
          <div className="aspect-square">
            <ProblemLevel_DoughnutHolder />
          </div>
      </div>

      {/* Full Width Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Monthly Statistics
        </h2>
        <div className="w-full" style={{ height: '400px' }}>
          <MonthlyStats_LineChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;