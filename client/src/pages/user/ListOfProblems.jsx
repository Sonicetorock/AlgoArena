
// // export default ListOfProblems;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { apiUser } from "../../utils/apiURLS";
// import Sidebar from "./Sidebar"; 
// import { useAuth } from "../../context/AuthContext";

// const ListOfProblems = () => {
//   const {accessToken,user} = useAuth();
//   const [problems, setProblems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortField, setSortField] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const response = await axios.get(`${apiUser}/problems`);
//         setProblems(response.data.problems);
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//       }
//     };
//     fetchProblems();
//   }, [accessToken]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSort = (field) => {
//     const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortOrder(order);
//   };

//   const handleLevelChange = (event) => {
//     setSelectedLevel(event.target.value);
//   };

//   const handleDifficultyChange = (event) => {
//     setSelectedDifficulty(event.target.value);
//   };

//   const handleFilterChange = (filter) => {
//     setSelectedFilter(filter);
//   };

//   const filteredProblems = problems
//     .filter((problem) => {
//       if (selectedFilter === "all") return true;
//       if (selectedFilter === "solved") return user.solvedQs?.includes(problem._id);
//       if (selectedFilter === "attempted") return user.attemptedQs?.includes(problem._id);
//       return problem.level.toLowerCase() === selectedFilter.toLowerCase();
//     })
//     .filter((problem) =>
//       problem.probName.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     // .filter(
//     //   (problem) =>
//     //     !selectedLevel || problem.level.toLowerCase() === selectedLevel.toLowerCase()
//     // )
//     .filter(
//       (problem) =>
//         !selectedDifficulty || problem.difficulty === parseInt(selectedDifficulty)
//     )
//     .sort((a, b) => {
//       if (sortField === "createdAt") {
//         const dateA = new Date(a.createdAt);
//         const dateB = new Date(b.createdAt);
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortField === "totalSubmissions") {
//         return sortOrder === "asc"
//           ? a.totalSubmissions - b.totalSubmissions
//           : b.totalSubmissions - a.totalSubmissions;
//       }
//       return 0;
//     });

//   return (
//     <div className="flex justify-center items-center">
//       <div className="w-4/5 m-8 overflow-x-auto shadow-xl rounded-lg">
//       < h1 className=" bg-gradient-to-r font-bold text-2xl  from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">{selectedFilter.toUpperCase()} Problems</h1>
//         <div className="m-4">
//           <input
//             type="text"
//             placeholder="🔍 Search by problem name"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="text-md custom-input w-1/2 px-2 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
//           />
//           {/* <select
//             value={selectedLevel}
//             onChange={handleLevelChange}
//             className="text-md mx-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
//           >
//             <option value="">All Levels</option>
//             <option value="normal">Normal</option>
//             <option value="premium">Premium</option>
//             <option value="elite">Elite</option>
//           </select> */}
//           <select
//             value={selectedDifficulty}
//             onChange={handleDifficultyChange}
//             className="text-md mx-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
//           >
//             <option value="">All Difficulties</option>
//             {[1, 2, 3, 4, 5].map((difficulty) => (
//               <option key={difficulty} value={difficulty}>
//                 {difficulty}
//               </option>
//             ))}
//           </select>
//         </div>
//         <table className="w-full text-sm text-center rtl:text-right text-gray-600 dark:text-gray-400 bg-white border border-gray-300 rounded-lg">
//           <thead className="border-b dark:bg-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-600">
//             <tr>
//               <th className="py-2 px-4 border-b"></th>
//               <th className="py-2 px-4 border-b">Problem Name</th>
//               <th
//                 className="py-2 px-4 border-b cursor-pointer"
//                 onClick={() => handleSort("createdAt")}
//               >
//                 Posted On
//               </th>
//               <th
//                 className="py-2 px-4 border-b cursor-pointer"
//                 onClick={() => handleSort("totalSubmissions")}
//               >
//                 Submissions
//               </th>
//               <th className="py-2 px-4 border-b">Level</th>
//               <th className="py-2 px-4 border-b">Difficulty</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProblems.length > 0 ? (
//               filteredProblems.map((problem, idx) => (
//                 <tr
//                   key={problem._id}
//                   className="border-b hover:bg-gray-200 hover:text-black cursor-pointer"
//                   onClick={() => navigate(`/user/problems/${problem._id}`)}
//                   >
//                   <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
//                   <td className="py-2 px-4 border-b text-center text-blue-500">
//                     {problem.probName.charAt(0).toUpperCase() + problem.probName.slice(1)}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {new Date(problem.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {problem.totalSubmissions}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {problem.level.charAt(0).toUpperCase() + problem.level.slice(1)}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     {problem.difficulty}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="py-4 text-center">
//                   No data under this category.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <Sidebar selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
//     </div>
//   );
// };

// export default ListOfProblems;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUser } from "../../utils/apiURLS";
import Sidebar from "./Sidebar"; 
import { useAuth } from "../../context/AuthContext";

const ListOfProblems = () => {
  const {accessToken, user} = useAuth();
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${apiUser}/problems`);
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchProblems();
  }, [accessToken]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleCombinedSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    // Apply combined sort logic here if needed
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredProblems = problems
    .filter((problem) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "solved") return user.solvedQs?.includes(problem._id);
      if (selectedFilter === "attempted") return user.attemptedQs?.includes(problem._id);
      return problem.level.toLowerCase() === selectedFilter.toLowerCase();
    })
    .filter((problem) =>
      problem.probName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // .filter(
    //   (problem) =>
    //     !selectedLevel || problem.level.toLowerCase() === selectedLevel.toLowerCase()
    // )
    .filter(
      (problem) =>
        !selectedDifficulty || problem.difficulty === parseInt(selectedDifficulty)
    )
    .sort((a, b) => {
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "totalSubmissions") {
        return sortOrder === "asc"
          ? a.totalSubmissions - b.totalSubmissions
          : b.totalSubmissions - a.totalSubmissions;
      }
      return 0;
    });

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/5 m-8 overflow-x-auto shadow-xl rounded-lg">
        <h1 className="bg-gradient-to-r font-bold text-2xl from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          {selectedFilter.toUpperCase()} Problems
        </h1>
        <div className="m-4">
          <input
            type="text"
            placeholder="🔍 Search by problem name"
            value={searchTerm}
            onChange={handleSearch}
            className="text-md custom-input w-1/2 px-2 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          />
          {/* <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="text-md mx-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          >
            <option value="">All Levels</option>
            <option value="normal">Normal</option>
            <option value="premium">Premium</option>
            <option value="elite">Elite</option>
          </select> */}
          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="text-md mx-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          >
            <option value="">All Difficulties</option>
            {[1, 2, 3, 4, 5].map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <table className="w-full text-sm text-center rtl:text-right text-gray-600 dark:text-gray-400 bg-white border border-gray-300 rounded-lg">
          <thead className="border-b dark:bg-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-600">
            <tr>
              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b">Problem Name</th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Posted On
                {sortField === "createdAt" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort("totalSubmissions")}
              >
                Submissions
                {sortField === "totalSubmissions" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th className="py-2 px-4 border-b">Level</th>
              <th className="py-2 px-4 border-b">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, idx) => (
                <tr
                  key={problem._id}
                  className="border-b hover:bg-gray-200 hover:text-black cursor-pointer"
                  onClick={() => navigate(`/user/problems/${problem._id}`)}
                >
                  <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                  <td className="py-2 px-4 border-b text-center text-blue-500">
                    {problem.probName.charAt(0).toUpperCase() + problem.probName.slice(1)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {problem.totalSubmissions}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {problem.level.charAt(0).toUpperCase() + problem.level.slice(1)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {problem.difficulty}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No data under this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Sidebar selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default ListOfProblems;
