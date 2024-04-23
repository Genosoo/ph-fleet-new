/* eslint-disable react/prop-types */
import BarChart from "./BarChart";
import DoughnutChart from "./DonutChart";
import './ChartStyle.css'
import { DataContext } from "../../../context/DataProvider";
import { useContext } from "react";

export default function Charts() {
  const {
    marineTrafficData,
    marineTrafficHistoryData,
    traksatData, 
    traksatHistoryData,
    spidertracksData, 
    spidertracksHistoryData, 
   
  } = useContext(DataContext)


  return (
    <div className="chartContainer">
      <h2 className="chartTitle">Graphs</h2>
      <div className="chartWrapper">
            <div className="chartBox p-10">
              <BarChart 
               marineTrafficData={marineTrafficData}
               marineTrafficHistoryData={marineTrafficHistoryData}
               traksatData={traksatData}
               traksatHistoryData={traksatHistoryData}
               spidertracksData={spidertracksData}
               spidertracksHistoryData={spidertracksHistoryData}
              />
            </div>
            <div className="chartBox p-10">
              <DoughnutChart 
               marineTrafficData={marineTrafficData}
               traksatData={traksatData}
               spidertracksData={spidertracksData}
              />
            </div>
      </div>
    </div>
  );
}
