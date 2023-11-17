/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ marineTrafficData }) => {
  const marineTrafficGroupData = marineTrafficData.reduce((acc, item) => {
    const { ais_type_summary } = item;
    if (!acc[ais_type_summary]) {
      acc[ais_type_summary] = [];
    }
    acc[ais_type_summary].push(item);
    return acc;
  }, {});

  // Extract vessel names as labels and count of items as data
  const labels = Object.keys(marineTrafficGroupData);
  const data = labels.map((vessel) => marineTrafficGroupData[vessel].length);

 // Define a static color palette
const colorPalette = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
  'rgb(102, 204, 255)',
  'rgb(255, 128, 0)',
  'rgb(0, 204, 102)',
  'rgb(255, 0, 255)',
];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length), // Use colors from the palette
      data: data, // Count of items for each vessel
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    plugins: {
      legend: {
        position: 'right', // Display legend on the right side
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
