// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal } from 'react-bootstrap';
// import { Pie, Doughnut } from 'react-chartjs-2';
// import axios from 'axios';
// import { apiAdmin, apiUser } from '../../utils/apiURLS';
// import toast from 'react-hot-toast';

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);
// //   const [stats, setStats] = useState({});
// const [chartVerdictData, setChartVerdictData] = useState(null);

// const [chartLanguageData, setChartLanguageData] = useState(null);

// const [chartLevelData, setCharLevelData] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.get(`${apiAdmin}/users`);//getAllusers
//           setUsers(response.data.users);
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//       };
//     fetchUsers();
//   }, []);


//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${apiAdmin}/users/${id}`);
//       // Update the users state locally
//       setUsers(currentUsers => currentUsers.filter(user => user._id !== id));   
//       // Optionally, show a success message to the user
//       toast.success('User deleted successfully');
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       // Optionally, show an error message to the user
//       toast.error('Failed to delete user');
//     }
//   };

//   const handleShowStats = async (user) => {
//     setSelectedUser(user);
//     setIsLoading(true);
//     try {
//         const [verdictCounts, languageCounts, levelCounts] = await Promise.all([
//             axios.get(`${apiUser}/verdictCounts/${user._id}`),
//             axios.get(`${apiUser}/languageCounts/${user._id}`),
//             axios.get(`${apiUser}/levelCounts/${user._id}`),
//           ]);
//           Object.keys(verdictCounts).length > 0  ? setChartVerdictData({
//             labels: Object.keys(verdictCounts.data),
//             datasets: [{
//               label: 'Submissions ',
//               data: Object.values(verdictCounts.data),
//               backgroundColor: [
//                 "#007D9C",
//                 "#244D70",
//                 "#D123B3",
//                 "#F7E018",
//                 "#FE452A",
//                 "#795548", // Additional color for more languages
//               ],
//               borderColor: [
//                 "rgba(255,99,132,1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//               ],
//               borderWidth: 1,
//               hoverOffset: 10,
//             }],
//           }) : setChartVerdictData(null);
//           Object.keys(languageCounts).length > 0 ? setChartLanguageData({
//             labels: Object.keys(languageCounts.data),
//             datasets: [{
//               label: 'Count  ',
//               data: Object.values(languageCounts.data),
//               backgroundColor: [
//                 '#4CAF50', // AC : Accepted
//                 '#F44335', // WA : Wrong Answer
//                 '#FF9800', // RE : Runtime Error
//                 '#2196F3', // TLE : Time Limit Exceeded
//                 '#9C27B0', // MLE : Memory Limit Exceeded
//                 '#795548'  // For any unexpected verdicts
//               ],
//               hoverOffset: 10
//             }]
//           }): setChartLanguageData(null);
//           Object.keys(levelCounts).length > 0 ?  setCharLevelData({
//             labels: Object.keys(levelCounts.data),
//             datasets: [{
//               label: 'Count  ',
//               data: Object.values(levelCounts.data),
//               backgroundColor: [
//                 '#4CAF50', // AC : Accepted
//                 '#F44335', // WA : Wrong Answer
//                 '#FF9800', // RE : Runtime Error
//                 '#2196F3', // TLE : Time Limit Exceeded
//                 '#9C27B0', // MLE : Memory Limit Exceeded
//                 '#795548'  // For any unexpected verdicts
//               ],
//               hoverOffset: 10
//             }]
//           }):setCharLevelData(null);
//           setIsLoading(false); // Set loading state to false
//           setShowModal(true);
//     } catch (error) {
//       console.error('Error fetching user stats:', error);
//     }
//   };

//   return (
//     <div>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Score</th>
//             <th>Solved Questions</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user,idx) => (
//             <tr key={user._id}>
//               <td>{idx+1}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{user.score}</td>
//               <td>{user.premiumQs.length}</td>
//               <td>
//                 <Button variant="info" onClick={() => handleShowStats(user)}>
//                   Show Stats
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(user._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Statistics</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedUser && (
//             <div>
//               <h4>{selectedUser.fullname}'s Stats</h4>
//               {isLoading ? (
//       <h2>Loading...</h2>
//     ) : (

//               <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                 <div style={{ width: '30%' }}>
//                   <h5>Verdict Counts</h5>
//                 {chartVerdictData ?  (<Pie data={chartVerdictData} />): (<h2>No Submission Done yet</h2>)}
//                 </div>
//                 <div style={{ width: '30%' }}>
//                   <h5>Language Submission Counts</h5>
//                  {chartLanguageData ?  (<Doughnut data={chartLanguageData} />) :(<h2>No Submission Done yet</h2>) }
//                 </div>
//                 <div style={{ width: '30%' }}>
//                   <h5>Problem Level Counts</h5>
//                  {chartLevelData ?  (<Doughnut data={chartLevelData} />) : (<h2>Problems are not there</h2>)}
//                 </div>
//               </div>)}
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default AllUsers;
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { apiAdmin, apiUser } from '../../utils/apiURLS';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartVerdictData, setChartVerdictData] = useState(null);
  const [chartLanguageData, setChartLanguageData] = useState(null);
  const [chartLevelData, setChartLevelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/users`); // getAllusers
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiAdmin}/users/${id}`);
      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleShowStats = async (user) => {
    setSelectedUser(user);
    setIsLoading(true);
    try {
      const [verdictCounts, languageCounts, levelCounts] = await Promise.all([
        axios.get(`${apiUser}/verdictCounts/${user._id}`),
        axios.get(`${apiUser}/languageCounts/${user._id}`),
        axios.get(`${apiUser}/levelCounts/${user._id}`),
      ]);
      Object.keys(verdictCounts.data).length > 0
        ? setChartVerdictData({
            labels: Object.keys(verdictCounts.data),
            datasets: [
              {
                label: 'Submissions',
                data: Object.values(verdictCounts.data),
                backgroundColor: [
                  '#007D9C',
                  '#244D70',
                  '#D123B3',
                  '#F7E018',
                  '#FE452A',
                  '#795548', // Additional color for more languages
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 10,
              },
            ],
          })
        : setChartVerdictData(null);
      Object.keys(languageCounts.data).length > 0
        ? setChartLanguageData({
            labels: Object.keys(languageCounts.data),
            datasets: [
              {
                label: 'Count',
                data: Object.values(languageCounts.data),
                backgroundColor: [
                  '#4CAF50', // AC : Accepted
                  '#F44335', // WA : Wrong Answer
                  '#FF9800', // RE : Runtime Error
                  '#2196F3', // TLE : Time Limit Exceeded
                  '#9C27B0', // MLE : Memory Limit Exceeded
                  '#795548', // For any unexpected verdicts
                ],
                hoverOffset: 10,
              },
            ],
          })
        : setChartLanguageData(null);
      Object.keys(levelCounts.data).length > 0
        ? setChartLevelData({
            labels: Object.keys(levelCounts.data),
            datasets: [
              {
                label: 'Count',
                data: Object.values(levelCounts.data),
                backgroundColor: [
                  '#4CAF50', // AC : Accepted
                  '#F44335', // WA : Wrong Answer
                  '#FF9800', // RE : Runtime Error
                  '#2196F3', // TLE : Time Limit Exceeded
                  '#9C27B0', // MLE : Memory Limit Exceeded
                  '#795548', // For any unexpected verdicts
                ],
                hoverOffset: 10,
              },
            ],
          })
        : setChartLevelData(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  return (
    <div>
        <div className='p-1 mx-8 my-3 shadow-lg rounded-md bg-white'>

       <Table striped hover className="w-full p-1">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Solved Questions</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user, idx) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.score}</td>
              <td className="px-4 py-2">{user.solvedQs.length}</td>
              <td className="px-4 py-2 flex justify-center">
                <button className='cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[1px] hover:brightness-110  hover:border-b-[3px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]' onClick={() => handleShowStats(user)}>
                  Show Stats
                </button>
                <button className="ml-2 cursor-pointer transition-all bg-rose-500 text-white px-6 py-2 rounded-lg
border-rose-600
border-b-[1px] hover:brightness-110  hover:border-b-[3px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', marginTop: '20px' }}>
        <div style={{ width: '30%' }}>
              <h1 className="text-2xl italic">
                  Problem Level Distribution
                  </h1>
          <div className="flex justify-center items-center bg-white rounded-md shadow-lg" style={{ height: 450, textAlign: "center" }}>
          {chartVerdictData ? (
           <Doughnut data={chartVerdictData} width={50} height={50}/>
        ) : (
            <h2>No Submission Done yet</h2>
        )}
        </div>
        </div>
        <div style={{ width: '30%' }}>
              <h1 className="text-2xl italic">
                  Language wise Distribution
                  </h1>
          <div className="flex justify-center items-center bg-white rounded-md shadow-lg" style={{ height: 450, textAlign: "center" }}>
          {chartLanguageData ? (
            <Doughnut data={chartLanguageData} />
          ) : (
            <h2>No Submission Done yet</h2>
          )}
        </div>
        </div>
        <div style={{ width: '30%' }}>
              <h1 className="text-2xl italic">
                  Problem Level Distribution
              </h1>
          <div className= "flex justify-center items-center bg-white rounded-md shadow-lg" style={{ height: 450, textAlign: "center" }}>
          {chartLevelData ? (
            <Doughnut data={chartLevelData} />
          ) : (
            <h2>Problems are not there</h2>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
