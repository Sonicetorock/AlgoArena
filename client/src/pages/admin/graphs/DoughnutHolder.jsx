import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {Doughnut} from "react-chartjs-2"
import { apiAdmin } from "../../../utils/apiURLS";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
const DoughnutHolder = () => {
  
  const [chartData, setChartData] = useState(null);
  const { accessToken } = useAuth(); // We only need the accessToken for authentication
  // const options = {
  //   plugins: {
  //     legend: {  
  //       position: 'right', // This places the legend on the right side
  //       align: 'center', // This aligns the legend items to the start (top) of the container
  //       labels: {
  //         boxWidth: 10,
  //         padding: 10,
  //       },
  //     },
  //   },
  //   maintainAspectRatio: true, // This allows you to control the chart's dimensions
  // };
  const verdictFullForms = {
    'AC': 'Accepted',
    'WA': 'Wrong Answer',
    'RE': 'Runtime Error',
    'TLE': 'Time Limit Exceeded',
    'MLE': 'Memory Limit Exceeded'
  };
  const options = {
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          boxWidth: 10,
          padding: 10,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => ({
              text: label.split(' : ')[0], // Use only the abbreviation
              fillStyle: datasets[0].backgroundColor[i],
              hidden: !chart.getDataVisibility(i),
              index: i
            }));
          }
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label.split(' : ')[0];
            const value = context.formattedValue;
            return `${label} (${verdictFullForms[label]}): ${value}`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };
  useEffect(() => {
    const fetchOverallVerdictCounts = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/overallVerdicts`);
        
        const data = response.data;
        console.log(data)
        setChartData({
          labels: Object.keys(data),
          datasets: [{
            label: 'Count  ',
            data: Object.values(data),
            backgroundColor: [
              '#4CAF50', // AC : Accepted
              '#F44335', // WA : Wrong Answer
              '#FF9800', // RE : Runtime Error
              '#2196F3', // TLE : Time Limit Exceeded
              '#9C27B0', // MLE : Memory Limit Exceeded
              '#795548'  // For any unexpected verdicts
            ],
            hoverOffset: 10
          }]
        });
      } catch (error) {
        toast.error("Error fetching overall verdict analysis")
        console.error('Error fetching overall verdict counts:', error);
      }
    };

    if (accessToken) {
      fetchOverallVerdictCounts();
    }
  }, [accessToken]);

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

  return(
  <>
  <div className="bg-white rounded-md shadow-lg p-3" style={{ width: 450, textAlign: "center" }}>
      <h1 className="text-2xl">
        Submission Verdict Analysis
      </h1>
    <Doughnut data={chartData} width={50} height={50} options={options}/>
  </div>
  </>); 
};

export default DoughnutHolder;

// const config = {
//   type: "doughnut",
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Chart.js Doughnut Chart",
//       },
//     },
//   },
// };