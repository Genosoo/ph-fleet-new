/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ trakSatData }) => {
  const trakSatGroupData = trakSatData.reduce((acc, item) => {
    const { network } = item;
    if (!acc[network]) {
      acc[network] = [];
    }
    acc[network].push(item);
    return acc;
  }, {});

  // Extract vessel names as labels and count of items as data
  const labels = Object.keys(trakSatGroupData);
  const data = labels.map((vessel) => trakSatGroupData[vessel].length);

  const colorPalette = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',

  ];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor:colorPalette.slice(0, labels.length),
      borderColor: "rgb(255, 99, 132)",
      data: data, // Count of items for each vessel
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return <Bar data={chartData} />;
};

export default BarChart;
