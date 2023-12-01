/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'chart.js/auto';

const DoughnutChart = ({ trakSatData, marineTrafficData, spiderTrakData }) => {
  // Use localStorage to persist state
  const [selectedData, setSelectedData] = useState(marineTrafficData);
  const [groupingProperty, setGroupingProperty] = useState("ais_type_summary");

  useEffect(() => {
    // Update localStorage whenever state changes
    localStorage.setItem("selectedDoughnutData", JSON.stringify(selectedData));
    localStorage.setItem("doughnutGroupingProperty", groupingProperty);
  }, [selectedData, groupingProperty]);

  // UseEffect to set default data when the component mounts
  useEffect(() => {
    // Set default data when the component mounts
    setSelectedData(marineTrafficData);
    setGroupingProperty("ais_type_summary");
  }, [marineTrafficData]); // Run when marineTrafficData changes

  const groupData = selectedData.reduce((acc, item) => {
    const groupKey = item[groupingProperty];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const labels = Object.keys(groupData);
  const data = labels.map((vessel) => groupData[vessel].length);

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
      backgroundColor: colorPalette.slice(0, labels.length),
      data: data,
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "trakSatData") {
      setSelectedData(trakSatData);
      setGroupingProperty("group");
    } else if (selectedValue === "marineTrafficData") {
      setSelectedData(marineTrafficData);
      setGroupingProperty("ais_type_summary");
    } else if (selectedValue === "spiderTrakData") {
      setSelectedData(spiderTrakData);
      setGroupingProperty("unit_id");
    }
  };

  return (
    <div className="doughnut_chart_box">
      <Select sx={{ width: "300px" }} defaultValue={'marineTrafficData'} onChange={handleSelectionChange}>
        <MenuItem value="trakSatData">TrakSat</MenuItem>
        <MenuItem value="marineTrafficData">Marine Traffic</MenuItem>
        <MenuItem value="spiderTrakData">Spider Trak</MenuItem>
      </Select>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
