import React, { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from 'axios';

import { useAuth } from "../../../context/AuthContext";
import { apiAdmin } from "../../../utils/apiURLS";


import toast from 'react-hot-toast';
import { DNA } from 'react-loader-spinner';

export default function PiechartHolder() {
  const [chartData, setChartData] = useState(null);
  const { accessToken } = useAuth();
  const options = {
    plugins: {
      legend: {  
        position: 'right', // This places the legend on the right side
        align: 'center', // This aligns the legend items to the start (top) of the container
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
    },
    maintainAspectRatio: true, // This allows you to control the chart's dimensions
  };

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/getLanguageWiseSubmissionCounts`);
        
        const data = response.data;
        console.log(data)
        setChartData({
          labels: Object.keys(data),
          datasets: [{
            label: 'Submissions ',
            data: Object.values(data),
            backgroundColor: [
              "#007D9C",
              "#244D70",
              "#D123B3",
              "#F7E018",
              "#FE452A",
              "#795548", // Additional color for more languages
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            hoverOffset: 10,
          }],
        });
      } catch (error) {
        toast.error("Error fetching language wise analysis")
        console.error('Error fetching language data:', error);
      }
    };

    if (accessToken) {
      fetchLanguageData();
    }
  }, [accessToken]);

  //loading state
  if (!chartData) {
    return ( <DNA
      visible={true}
      height="50"
      width="50"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />)
  }

  return (
    <div className="bg-white rounded-md shadow-lg p-3" style={{ width: 450, textAlign: "center" }}>
      <h1 className="text-2xl">
        Language Wise Analysis
      </h1>
      <Pie data={chartData} width={40} height={40} options={options}/>
    </div>
  );
}