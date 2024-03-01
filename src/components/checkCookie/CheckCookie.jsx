import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CheckCookie = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRedirect = () => {
      const cookieExists = Cookies.get('sessionid');
      if (!cookieExists) {
        alert('Session Expired!');
        navigate('/login');
      }
    };

    checkAndRedirect();
  }, [navigate]);

};

export default CheckCookie;
