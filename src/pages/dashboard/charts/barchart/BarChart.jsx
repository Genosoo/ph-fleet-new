/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'chart.js/auto';

const BarChart = ({ trakSatData, marineTrafficData, spiderTrakData }) => {
  // Use localStorage to persist state
  const [selectedData, setSelectedData] = useState(trakSatData);
  const [groupingProperty, setGroupingProperty] = useState("network");

  useEffect(() => {
    // Update localStorage whenever state changes
    localStorage.setItem("selectedData", JSON.stringify(selectedData));
    localStorage.setItem("groupingProperty", groupingProperty);
  }, [selectedData, groupingProperty]);

  // UseEffect to set default data and grouping property when the component mounts
  useEffect(() => {
    // Set default data and grouping property when the component mounts
    setSelectedData(trakSatData);
    setGroupingProperty("network");
  }, [trakSatData]); // Run when trakSatData changes

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
  ];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length),
      borderColor: "rgb(255, 99, 132)",
      data: data,
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "trakSatData") {
      setSelectedData(trakSatData);
      setGroupingProperty("network");
    } else if (selectedValue === "marineTrafficData") {
      setSelectedData(marineTrafficData);
      setGroupingProperty("ais_type_summary");
    } else if (selectedValue === "spiderTrakData") {
      setSelectedData(spiderTrakData);
      setGroupingProperty("unit_id");
    }
  };

  return (
    <div className="bar_chart_box">
      <Select sx={{ width: "300px" }} value={selectedData === trakSatData ? 'trakSatData' : (selectedData === marineTrafficData ? 'marineTrafficData' : 'spiderTrakData')} onChange={handleSelectionChange}>
        <MenuItem value="trakSatData">TrakSat</MenuItem>
        <MenuItem value="marineTrafficData">Marine Traffic</MenuItem>
        <MenuItem value="spiderTrakData">Spider Trak</MenuItem>
      </Select>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
