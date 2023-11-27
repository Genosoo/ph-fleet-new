/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useCallback, useState } from 'react';

const AppLogout = ({ children }) => {
  const baseUrl = import.meta.env.VITE_URL;
  const logoutUrl = `${baseUrl}/api/logout/`;
  const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

  const [csrfToken, setCsrfToken] = useState('');
  const events = ['mousemove'];
  let timer;

  const resetTimer = useCallback(() => {
    if (timer) clearTimeout(timer);
    handleLogoutTimer();
  }, [timer]);

  const handleLogoutTimer = useCallback(() => {
    timer = setTimeout(() => {
      logoutAction();
    }, 10 * 60 * 1000); // Set timeout to 5 minutes (5 * 60 seconds * 1000 milliseconds)
  }, []);

  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await fetch(getCsrfTokenUrl);
        const csrfTokenFromServer = await response.json();
        setCsrfToken(csrfTokenFromServer['csrf-token']);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    getTheCsrfToken();
  }, [getCsrfTokenUrl]);

  useEffect(() => {
    const handleUserActivity = () => {
      resetTimer();
      console.log('Mouse moved'); // Add this line for logging mouse movement
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetTimer, events]);

  const logoutAction = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };

      // Display a message before logging out
      console.log('Logout will occur in a moment...');

      // Simulate a delay before redirecting to the login page
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Perform the actual logout
      const response = await fetch(logoutUrl, {
        method: 'GET',
        headers,
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = '/login';
        console.log('Logout successful');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return children;
};

export default AppLogout;
