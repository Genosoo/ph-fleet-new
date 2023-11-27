import BarChart from "./barchart/BarChart";
import DoughnutChart from "./doughnutchart/DoughnutChart";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;

const getMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
const getTrakSatData = `${baseUrl}/api/traksat_latest/`;
const getSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
// const getPersonnelData = `${baseUrl}/api/personnel_latest`;
// const getVideoStreamData = `${baseUrl}/api/video_stream_latest`;

export default function Charts() {
  const [loading, setLoading] = useState(false);
  const [marineTrafficData, setMarineTrafficData] = useState([]);
  const [trakSatData, setTrakSatData] = useState([]);
  const [spiderTrakData, setSpiderTrakData] = useState([]);
  // const [personnelData, setPersonnelData] = useState([]);
  // const [videoStreamData, setVideoStreamData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const marineTrafficResponse = await axios.get(getMarineTrafficData);
      const trackSatResponse = await axios.get(getTrakSatData);
      const spiderTrakResponse = await axios.get(getSpiderTrakData);
      // const personnelResponse = await axios.get(getPersonnelData);
      // const videoStreamResponse = await axios.get(getVideoStreamData);

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
