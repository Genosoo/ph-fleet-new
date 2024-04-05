/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'chart.js/auto';
import { styled } from '@mui/material/styles';

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

export default function Barchart({ trakSatData, marineTrafficData, spiderTrakData }) {
  const countItemsByDay = (data) => {
    if (!data) return []; // Check if data is undefined or null

    const dayCounts = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    data.forEach(item => {
      const createdAt = new Date(item.created_at);
      const dayOfWeek = createdAt.toLocaleDateString('en-US', { weekday: 'short' }); // Use short day names
      dayCounts[dayOfWeek]++;
    });

    return Object.values(dayCounts);
  };

  const [selectedDataset, setSelectedDataset] = useState('trakSatData');
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    setCounts(countItemsByDay(eval(selectedDataset)));
  }, [selectedDataset, trakSatData, marineTrafficData, spiderTrakData]);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Count',
        fill: "start",
        backgroundColor: (context ) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(50, 0, 0, 200);
          gradient.addColorStop(0, "#86705E");
          gradient.addColorStop(1, "#404958");
          return gradient;
        },
        borderColor: 'transparent', // Gradient border color
        data: counts
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false // Disable legend
      },
      
    }
  };
  

  return (
    <div className="bar_chart_box">
        <StyledSelect value={selectedDataset} onChange={handleDatasetChange}>
      <BoldMenuItem value="trakSatData" isSelected={selectedDataset === 'trakSatData'}>
        Traksat Bar Graph By Day (10-days)
      </BoldMenuItem>
      <BoldMenuItem value="marineTrafficData" isSelected={selectedDataset === 'marineTrafficData'}>
        MarineTraffic Bar Graph By Day (10-days)
      </BoldMenuItem>
      <BoldMenuItem value="spiderTrakData" isSelected={selectedDataset === 'spiderTrakData'}>
        Spidertracks Bar Graph By Day (10-days)
      </BoldMenuItem>
    </StyledSelect>

      <Bar data={data} options={options}  />
    </div>
  );
}
