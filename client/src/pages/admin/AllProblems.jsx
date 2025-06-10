import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

//built imports
import { useAuth } from "../../context/AuthContext";
import { apiAdmin } from "../../utils/apiURLS";

//icons
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { SearchCheck, SearchCode } from "lucide-react";

const AllProblems = () => {
    const { accessToken } = useAuth();
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
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
        fetchProblems();
    }, [accessToken, currentPage]);

    //deleting a problem
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this problem?")) {
            try {
                await axios.delete(`${apiAdmin}/problems/${id}`);
                setProblems(problems.filter((problem) => problem._id !== id));
                toast.success("Problem deleted successfully");
            } catch (error) {
                toast.error("Error deleting problem");
                console.error("Error deleting problem:", error);
            }
        }
    };

    const difficultyColors = {
        0:"text-rose-400",
        1: "text-green-500",
        2: "text-yellow-500",
        3: "text-red-500",
        4: "text-purple-500",
      };
      
      const levelColors = {
        normal: "blue-500",
        premium: "orange-500",
        elite: "red-500",
      };
    return (
        <>
            {/* Problems section */}
            <div className="p-6">
                <div className="flex justify-start items-center gap-2 m-6">
                    <h2 className="text-3xl font-bold text-blue-600">Problems</h2>
                    <Link
                        to="/admin/post-problem"
                        className="text-center p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                    >
                        Post a new one
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {problems?.map((problem) => (
                        <div key={problem._id} className="bg-white rounded-md shadow-lg">
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center mb-2">
                                    {/* kept ellipses if text length overflows */}
                                    <h3 className="text-lg font-semibold text-gray-900 max-w-[25ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                        {problem.probName.charAt(0).toUpperCase() +
                                            problem.probName.slice(1)}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            to={`/admin/edit-problem/${problem._id}`}
                                            className="text-yellow-500 hover:text-yellow-600"
                                        >
                                            <FaEdit sx={{ fontSize: "24px" }} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(problem._id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <FaTrashAlt sx={{ fontSize: "24px" }} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    Posted on: {new Date(problem.createdAt).toDateString()}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-2">
                                        <SearchCheck />
                                        <span>
                                            Total Accepted: {problem.acceptedSols}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <SearchCode />
                                        <span>Total Submissions: {problem.totalSubmissions}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-2 flex justify-between items-center">
                                <span
                                    className={`text-md font-semibold px-2 py-1 rounded-full animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent`}
                                >
                                    {problem.level.toUpperCase()}
                                </span>
                                <span
                                    className={`${difficultyColors[problem.difficulty]} text-md font-semibold px-2 py-1 rounded-full`}
                                >
                                    Difficulty {problem.difficulty}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg ${page === currentPage
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"} hover:bg-blue-700 hover:text-white transition duration-200`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllProblems;
