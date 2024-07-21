import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { apiAdmin } from '../../../utils/apiURLS';
import { DNA } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const MonthlyStats_LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/getMonthlyStats`);
        
        const data = response.data;
        console.log(data)
        setChartData({
          labels: data.months,
          datasets: [
            {
              label: 'Users',
              data: data.userCounts,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderDash: [5, 5],

            },
            {
              label: 'Submissions',
              data: data.submissionCounts,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',

            },
            {
              label: 'Questions',
              data: data.questionCounts,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              fill:true
            }
          ]
        });
      } catch (error) {
        toast.error('Error fetching monthly statistics');
        console.error('Error fetching monthly statistics:', error);
      }
    };

    if (accessToken) {
      fetchMonthlyStats();
    }
  }, [accessToken]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) {
    return (
      <DNA
        visible={true}
        height="50"
        width="50"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-1/2 bg-white shadow-lg p-1 m-3 rounded-md" style={{  height: 550 }}>
      <Line data={chartData} options={options} />
      {/* <Line data={chartData} options={options} /> */}
    </div>
  );
};

export default MonthlyStats_LineChart;