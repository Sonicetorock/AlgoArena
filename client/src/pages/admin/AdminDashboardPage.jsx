//package imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//built imports
import { useAuth } from "../../context/AuthContext";
import { apiAdmin } from "../../utils/apiURLS";



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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Dashboard
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {/* stats */}
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
              <span class="font-bold text-6xl ml-2">
                {stats.totalAcceptedSubmissions}+
              </span>
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
              <span class="font-bold text-6xl ml-2">
                {stats.totalRejectedSubmissions}+
              </span>
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
              <span class="font-bold text-6xl ml-2">
                {stats.totalProblems}+
              </span>
              <p class="font-bold">Total Problems</p>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default AdminDashboardPage;
