import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { apiAdmin, apiUser } from '../../utils/apiURLS';
import toast from 'react-hot-toast';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Box,
  Checkbox,
  HStack
} from "@chakra-ui/react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartVerdictData, setChartVerdictData] = useState(null);
  const [chartLanguageData, setChartLanguageData] = useState(null);
  const [chartLevelData, setChartLevelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState({
    verdict: true,
    language: true,
    level: true
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      onOpen(); // Open modal after data is loaded
    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast.error('Failed to fetch user statistics');
    }
  };

  const handleChartToggle = (chartName) => {
    setSelectedCharts(prev => ({
      ...prev,
      [chartName]: !prev[chartName]
    }));
  };

  const getSelectedChartsCount = () => 
    Object.values(selectedCharts).filter(Boolean).length;

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      }
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent maxW="85vw" maxH={getSelectedChartsCount() > 1 ? "85vh" : "70vh"}>
          <ModalHeader>
            {selectedUser ? `${selectedUser.email}'s Statistics` : 'User Statistics'}
                <HStack spacing={8} justify="center" p={4} bg="gray.50" borderRadius="md">
                  <Checkbox
                    isChecked={selectedCharts.verdict}
                    onChange={() => handleChartToggle('verdict')}
                    colorScheme="blue"
                  >
                    Verdict Distribution
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedCharts.language}
                    onChange={() => handleChartToggle('language')}
                    colorScheme="green"
                  >
                    Language Distribution
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedCharts.level}
                    onChange={() => handleChartToggle('level')}
                    colorScheme="purple"
                  >
                    Level Distribution
                  </Checkbox>
                </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                {/* Horizontal Checkboxes */}

                {/* Fixed-size Charts Layout */}
                <div className="flex justify-between gap-4 mb-6">
                  <div className="w-1/3 bg-white p-4 rounded-lg shadow-sm">
                    {selectedCharts.verdict && chartVerdictData ? (
                      <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Verdict Distribution</h2>
                        <div>
                          <Doughnut data={chartVerdictData} options={chartOptions} />
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        {selectedCharts.verdict ? "No data available" : "Chart hidden"}
                      </div>
                    )}
                  </div>

                  <div className="w-1/3 bg-white p-4 rounded-lg shadow-sm">
                    {selectedCharts.language && chartLanguageData ? (
                      <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Language Distribution</h2>
                        <div>
                          <Doughnut data={chartLanguageData} options={chartOptions} />
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        {selectedCharts.language ? "No data available" : "Chart hidden"}
                      </div>
                    )}
                  </div>

                  <div className="w-1/3 bg-white p-4 rounded-lg shadow-sm">
                    {selectedCharts.level && chartLevelData ? (
                      <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Level Distribution</h2>
                        <div>
                          <Doughnut data={chartLevelData} options={chartOptions} />
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        {selectedCharts.level ? "No data available" : "Chart hidden"}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllUsers;
