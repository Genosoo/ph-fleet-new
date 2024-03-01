/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apilogout, getCsrfToken } from '../../../api/api_urls';



export default function btnLogout() {
    const [csrfToken, setCsrfToken] = useState('');
    const { dispatch } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const getTheCsrfToken = async () => {
          try {
            const response = await axios.get(getCsrfToken);
            setCsrfToken(response.data['csrf-token']);
            console.log(response.data['csrf-token'])
          } catch (error) {
            console.log(error);
          }
        };
    
      
        getTheCsrfToken();
      }, []);


      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          const headers = {
            'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          };
      
          await axios.get(apilogout, null, { headers });
          dispatch({ type: 'LOGOUT' });
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
    

  return (
    <button className='w-full text-left' onClick={handleLogout}>Logout</button>
  )
}
