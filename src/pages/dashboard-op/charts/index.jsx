/* eslint-disable react/prop-types */
import BarChart from "./BarChart";
import DoughnutChart from "./DonutChart";
import './ChartStyle.css'
import { DataContext } from "../../../context/DataProvider";
import { useContext } from "react";

export default function Charts() {
  const {marineTrafficData,
    traksatData, 
    spidertracksData, 
   
  } = useContext(DataContext)


  return (
    <div className="chartContainer">
      <h2 className="chartTitle">Graphs</h2>
      <div className="chartWrapper">
            <div className="chartBox p-10">
              <BarChart 
               marineTrafficData={marineTrafficData}
               traksatData={traksatData}
               spidertracksData={spidertracksData}
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
