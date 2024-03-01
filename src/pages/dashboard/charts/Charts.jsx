import BarChart from "./barchart/BarChart";
import DoughnutChart from "./doughnutchart/DoughnutChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiMarineTrafficData, apiTrakSatData, apiSpiderTrakData } from "../../../api/api_urls";


export default function Charts() {
  const [loading, setLoading] = useState(false);
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [trakSatData, setTrakSatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const marineTrafficResponse = await axios.get(apiMarineTrafficData);
      const trackSatResponse = await axios.get(apiTrakSatData);
      const spiderTrakResponse = await axios.get(apiSpiderTrakData);

      setMarineTrafficData(marineTrafficResponse.data.success);
      setTrakSatData(trackSatResponse.data.success);
      setSpiderTrakData(spiderTrakResponse.data.success);
      // setPersonnelData(personnelResponse.data.success);
      // setVideoStreamData(videoStreamResponse.data.success);

      console.log("Marine Traffic", marineTrafficResponse.data);
      console.log("TrakSat", trackSatResponse.data);
      console.log("Spider Track", spiderTrakResponse.data);
      // console.log("Personnel", personnelResponse.data);
      // console.log("video Stream", videoStreamResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  return (
    <div className="chart_container">
      <h2 className="chart_title">Graphs</h2>
      <div className="chart_wrapper">
        {loading ? (
          <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching Data...</p>
        </div>
        ) : (
          <>
            <div className="chart_box p-10">
              <BarChart spiderTrakData={spiderTrakData} trakSatData={trakSatData} marineTrafficData={marineTrafficData} />
            </div>
            <div className="chart_box">
              <DoughnutChart spiderTrakData={spiderTrakData}  trakSatData={trakSatData} marineTrafficData={marineTrafficData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
