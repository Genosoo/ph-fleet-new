/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const LogoutTimer = ({ onLogout }) => {
  const [idleTimer, setIdleTimer] = useState(null);

  const handleUserActivity = () => {
    // Reset the timer on user activity
    clearTimeout(idleTimer);

    // Trigger logout after a certain period of inactivity (e.g., 1 minute)
    const newIdleTimer = setTimeout(() => {
      onLogout();
    }, 10 * 1000); // 1 minute in milliseconds

    setIdleTimer(newIdleTimer);
  };

  useEffect(() => {
    // Add event listeners for user activity
    const mouseMoveListener = () => handleUserActivity();
    const keyDownListener = () => handleUserActivity();

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('keydown', keyDownListener);

    // Set an initial timer on component mount
    const initialIdleTimer = setTimeout(() => {
      // Trigger logout after a certain period of inactivity (e.g., 1 minute)
      onLogout();
    }, 60 * 500); // 1 minute in milliseconds

    setIdleTimer(initialIdleTimer);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', mouseMoveListener);
      clearTimeout(initialIdleTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogout]);

  return null;
};

export default LogoutTimer;
