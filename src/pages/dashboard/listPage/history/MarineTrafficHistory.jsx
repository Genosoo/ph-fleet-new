import { useState, useEffect } from 'react'; 
import { apiMarineTrafficHistory} from '../../../../api/api_urls';
import axios from 'axios'

export default function MarineTrafficHistory() {
    const [marineTrafficHistory, setMarineTrafficHistory] = useState([]);
    
    useEffect(() => {
        const getMarineTrafficHistory = async () => {
          try {
            const marineTrafficHistoryResponse = await axios.get(apiMarineTrafficHistory);
            setMarineTrafficHistory(marineTrafficHistoryResponse.data.success);
            console.log('Marine Traffic History',marineTrafficHistoryResponse.data);
          } catch (error) {
            console.log(error);
          }
        };

      
    
        getMarineTrafficHistory();
      }, []);

    // Return the CSRF token
    return marineTrafficHistory;
}
