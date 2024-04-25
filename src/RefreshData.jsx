import { apiLatestMarineTraffic, apiLatestTraksat, apiLatestSpiderTrak } from './api/api_urls'
import axios from 'axios'
import { useEffect } from 'react'

export default function RefreshData() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(apiLatestTraksat);
                await axios.get(apiLatestSpiderTrak);
                await axios.get(apiLatestMarineTraffic);
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }

        // Initial fetch
        fetchData();

        // Set interval to fetch data every 5 minutes
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);

        // Clean up function to clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []) // Empty dependency array to ensure useEffect runs only once on component mount

}
