/* eslint-disable react/prop-types */
import BarChart from "./BarChart";
import DoughnutChart from "./DonutChart";
import './ChartStyle.css'

export default function Charts({ marineTrafficData, tracksatData, spiderTrakData }) {


  return (
    <div className="chartContainer">
      <h2 className="chartTitle">Graphs</h2>
      <div className="chartWrapper">
            <div className="chartBox p-10">
              <BarChart 
               marineTrafficData={marineTrafficData}
               trakSatData={tracksatData}
               spiderTrakData={spiderTrakData}
              />
            </div>
            <div className="chartBox p-10">
              <DoughnutChart 
               marineTrafficData={marineTrafficData}
               trakSatData={tracksatData}
               spiderTrakData={spiderTrakData}
              />
            </div>
      </div>
    </div>
  );
}
