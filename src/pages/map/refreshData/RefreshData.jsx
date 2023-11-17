import { useEffect, useState } from "react";
import axios from "axios";


const baseUrl = import.meta.env.VITE_URL;
const getLatestMarineTraffic = `${baseUrl}/api/get_latest_marine_traffic/`;
const getLatestTraksat = `${baseUrl}/api/get_traksat_latest/`;
const getLatestSpiderTrak = `${baseUrl}/api/get_spidertracks_latest/`;

export default function RefreshData() {
  const refreshInterval = 120000; // 2 minutes
  const [countdown, setCountdown] = useState(refreshInterval / 1000);



  const refreshMarineTraffic = async () => {
    try {
      const responseMarineTraffic = await axios.get(getLatestMarineTraffic);
      console.log('refresh MarineTraffic', responseMarineTraffic);
    } catch (error) {
      console.error("Error Marine Traffic",error);
      
    }
  };
  

  const refreshTraksat = async () => {
    try {
      const responseTraksat = await axios.get(getLatestTraksat);
      console.log('refresh Traksat', responseTraksat);
      if (responseTraksat.status === 400) {
        console.log("Error: Bad Request for Traksat data");
      }
    } catch (error) {
      console.error("Error refresh Traksat:", error);
    }
  };
  
  const refreshSpiderTrak = async () => {
    try {
      const responseSpiderTrak = await axios.get(getLatestSpiderTrak);
      console.log('refresh SpiderTrak', responseSpiderTrak);
    } catch (error) {
      console.error("Error refresh SpiderTrak",error);
    }
  };

  
  useEffect(() => {
    refreshMarineTraffic();
    const marineTrafficIntervalId = setInterval(() => {
      refreshMarineTraffic();
    }, refreshInterval);

    return () => {
      clearInterval(marineTrafficIntervalId);
    };
  }, [refreshInterval]);

  useEffect(() => {
    refreshTraksat();
    const refreshTraksatIntervalId = setInterval(() => {
      refreshTraksat();
    }, refreshInterval);

    return () => {
      clearInterval(refreshTraksatIntervalId);
    };
  }, [refreshInterval]);


  useEffect(() => {
    refreshSpiderTrak();
    const refreshSpiderTrakIntervalId = setInterval(() => {
      refreshSpiderTrak();
    }, refreshInterval);

    return () => {
      clearInterval(refreshSpiderTrakIntervalId);
    };
  }, [refreshInterval]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        // Reset the countdown to the new interval after each refresh
        setCountdown(refreshInterval / 1000);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, refreshInterval]);

  return (
   <>
   </>
  );
}
