import BarChart from "./BarChart";
import DoughnutChart from "./DonutChart";
import { useEffect, useState } from "react";
import { useFetchData } from "../../../context/FetchData";
import Loader from "../../../Loader";
import './ChartStyle.css'

export default function Charts() {
  const [loading, setLoading] = useState(true); // State to track loading status
  const fetchedData = useFetchData();


  useEffect(() => {
    if (fetchedData !== null) {
      setLoading(false);
    }
  }, [fetchedData]); 

 
  if (loading) {
    return <Loader />
  }


  return (
    <div className="chartContainer">
      <h2 className="chartTitle">Graphs</h2>
      <div className="chartWrapper">
            <div className="chartBox p-10">
              <BarChart 
               marineTrafficData={fetchedData.marineTrafficData}
               trakSatData={fetchedData.tracksatData}
               spiderTrakData={fetchedData.spiderTrakData}
              />
            </div>
            <div className="chartBox p-10">
              <DoughnutChart 
               marineTrafficData={fetchedData.marineTrafficData}
               trakSatData={fetchedData.tracksatData}
               spiderTrakData={fetchedData.spiderTrakData}
              />
            </div>
      </div>
    </div>
  );
}
