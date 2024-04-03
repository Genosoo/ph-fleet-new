/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'chart.js/auto';

const BarChart = ({ trakSatData, marineTrafficData, spiderTrakData }) => {
  const [selectedData, setSelectedData] = useState(trakSatData);
  const [groupingProperty, setGroupingProperty] = useState("group");

  useEffect(() => {
    localStorage.setItem("selectedData", JSON.stringify(selectedData));
    localStorage.setItem("groupingProperty", groupingProperty);
  }, [selectedData, groupingProperty]);

  useEffect(() => {
    setSelectedData(trakSatData);
    setGroupingProperty("group");
  }, [trakSatData]);

  const getLast10DaysData = (data) => {
    const currentDate = new Date();
    const tenDaysAgo = new Date(currentDate);
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    return data.filter(item => {
      const itemDate = new Date(item.date); // Assuming there's a 'date' property in your data
      return itemDate >= tenDaysAgo && itemDate <= currentDate;
    });
  };

  const groupData = getLast10DaysData(selectedData).reduce((acc, item) => {
    const groupKey = item[groupingProperty];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const labels = Object.keys(groupData);
  const data = labels.map((vessel) => groupData[vessel].length);

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate dynamic colors for each bar
  const colorPalette = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 64, 255)'
  ];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length),
      borderColor: "rgba(0,0,0,0.1)", // Border color for bars
      borderWidth: 1, // Border width for bars
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
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day',
        },
        labels: dayLabels,
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "trakSatData") {
      setSelectedData(trakSatData);
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
      <Select sx={{ width:300, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} value={selectedData === trakSatData ? 'trakSatData' : (selectedData === marineTrafficData ? 'marineTrafficData' : 'spiderTrakData')} onChange={handleSelectionChange}>
        <MenuItem value="trakSatData">Traksat</MenuItem>
        <MenuItem value="marineTrafficData">MarineTraffic</MenuItem>
        <MenuItem value="spiderTrakData">Spidertracks</MenuItem>
      </Select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
