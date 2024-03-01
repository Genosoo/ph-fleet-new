import { useEffect, useState } from "react";
import axios from "axios";
import { apiLatestMarineTraffic, apiLatestTraksat, apiLatestSpiderTrak } from "../../../api/api_urls";



export default function RefreshData() {
  const refreshInterval = 120000; // 2 minutes
  const [countdown, setCountdown] = useState(refreshInterval / 1000);



  const refreshMarineTraffic = async () => {
    try {
      const responseMarineTraffic = await axios.get(apiLatestMarineTraffic);
      console.log('refresh MarineTraffic', responseMarineTraffic);
    } catch (error) {
      console.error("Error Marine Traffic",error);
      
    }
  };
  

  const refreshTraksat = async () => {
    try {
      const responseTraksat = await axios.get(apiLatestTraksat);
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
      const responseSpiderTrak = await axios.get(apiLatestSpiderTrak);
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
