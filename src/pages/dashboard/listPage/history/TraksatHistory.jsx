import { useState, useEffect } from 'react'; 
import { apiTrakSatHistory } from '../../../../api/api_urls';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function TraksatHistory() {
    const [traksatHistory, setTraksatHistory] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    
    useEffect(() => {
        const getTraksatHistory = async () => {
            try {
                const traksatHistoryResponse = await axios.get(apiTrakSatHistory);
                setTraksatHistory(traksatHistoryResponse.data.success);
                setLoading(false); // Set loading to false once data is fetched
                console.log('Traksat History', traksatHistoryResponse.data);
            } catch (error) {
                console.log(error);
                setLoading(false); // Make sure to set loading to false even if an error occurs
            }
        };

        getTraksatHistory();
    }, []);

    // Render the loader if loading state is true
    if (loading) {
        return <CircularProgress />;
    }

    // Return the fetched data
    return traksatHistory;
}
