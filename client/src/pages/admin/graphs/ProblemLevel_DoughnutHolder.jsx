import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { apiAdmin } from "../../../utils/apiURLS";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";

const ProblemLevel_DoughnutHolder = () => {
  const [chartData, setChartData] = useState(null);
  const { accessToken } = useAuth();

  const levelFullForms = {
    'normal': 'Normal',
    'premium': 'Premium',
    'elite': 'Elite'
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
              text: label.charAt(0).toUpperCase() + label.slice(1),
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
            const label = context.label;
            const value = context.formattedValue;
            return `${levelFullForms[label]}: ${value}`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  useEffect(() => {
    const fetchProblemLevelCounts = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/getProblemLevelCount`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        const data = response.data;
        console.log(data);

        setChartData({
          labels: Object.keys(data),
          datasets: [{
            label: 'Count',
            data: Object.values(data),
            backgroundColor: [
              '#4CAF50', // normal
              '#FFC107', // premium
              '#2196F3', // elite
            ],
            hoverOffset: 10
          }]
        });
      } catch (error) {
        toast.error("Error fetching problem level analysis");
        console.error('Error fetching problem level counts:', error);
      }
    };

    if (accessToken) {
      fetchProblemLevelCounts();
    }
  }, [accessToken]);

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
    <div className="bg-white rounded-md shadow-lg p-3" style={{ width: 450, textAlign: "center" }}>
      <h1 className="text-2xl">
        Problem Level Distribution
      </h1>
      <Doughnut data={chartData} width={50} height={50} options={options}/>
    </div>
  );
};

export default ProblemLevel_DoughnutHolder;