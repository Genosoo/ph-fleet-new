/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'chart.js/auto';
import { styled } from '@mui/material/styles';
import { Padding } from "@mui/icons-material";


const StyledSelect = styled(Select)({
  fontWeight: 'bold',
  boxShadow: 'none',
  '.MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '& .MuiMenuItem-root': {
    fontWeight: 'normal', // Reset font weight for all menu items
  },
  '& .MuiMenuItem-root[aria-selected="true"]': {
    fontWeight: 'bold', // Make font bold for selected menu item
  },
});

const BoldMenuItem = styled(MenuItem)(({ isSelected }) => ({
  fontWeight: isSelected ? 'bold' : 'normal',
}));


const DoughnutChart = ({ traksatData, marineTrafficData, spidertracksData }) => {
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
        labels: {
          usePointStyle: true,
          pointStyle: 'rounded',
          boxWidth:40
        },
       
      }
    }
  };
  

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "traksatData") {
      setSelectedData(traksatData);
      setGroupingProperty("group");
    } else if (selectedValue === "marineTrafficData") {
      setSelectedData(marineTrafficData);
      setGroupingProperty("ais_type_summary");
    } else if (selectedValue === "spidertracksData") {
      setSelectedData(spidertracksData);
      setGroupingProperty("unit_id");
    }
  };

  return (
    <div className="doughnut_chart_box">
       <div className="absolute top-0">
       <StyledSelect  defaultValue={'marineTrafficData'} onChange={handleSelectionChange}>
      <BoldMenuItem value="traksatData" isSelected={selectedData === traksatData}>
          Traksat Donut Chart By Vessel Type
      </BoldMenuItem>
      <BoldMenuItem value="marineTrafficData" isSelected={selectedData === marineTrafficData}>
          MarineTraffic Donut Chart By Vessel Type
      </BoldMenuItem>
      <BoldMenuItem value="spidertracksData" isSelected={selectedData === spidertracksData}>
          Spidertracks Donut Chart By Vessel Type
      </BoldMenuItem>
      </StyledSelect>
       </div>
       <br />
      <Doughnut  data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
