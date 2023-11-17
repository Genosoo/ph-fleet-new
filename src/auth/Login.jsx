/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// Login.js
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from './authContext/AuthContext';
import axios from 'axios';
import loginLogo from '../assets/logo.png'


const baseUrl = import.meta.env.VITE_URL;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`
const loginUrl = `${baseUrl}/api/login/`


export default function Login() {
  const [error, setError] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username:'',
    password: ''
  })


  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
       
      } catch (error) {
        console.log(error);
      }
    };

  
    getTheCsrfToken();
  }, []); 


  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginUrl, formData,{
        headers: {
          'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
        }
      });

      // Check the response for errors
      if (response.data.error) {
        setError(response.data.error); // Set error message
      } else {
        const { token } = response.data;
        dispatch({ type: 'LOGIN', payload: { user: formData.username, token } });
        navigate('/fleet/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  
  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (authState.user || localStorage.getItem('token')) {
      navigate('/fleet');
    }
  }, [authState.user]);
  

  return (
    <div className="login_container">
       
      <div className="login_form_wrapper">
        <img src={loginLogo} alt="" />
        <span>
          <h2>Login</h2>
          <p>Registered users can login to access the system. </p>
          </span>
        <form onSubmit={handleSubmit} >
          <input
            className="border-2 p-3 rounded-lg "
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter username "
            onChange={handleChange}
          />
          <input
            className="border-2 p-3 rounded-lg "
            type="password"
            value={formData.password}
            name='password'
            placeholder="Enter Password"
            onChange={handleChange}
          />

          {/* <label>
            <div className="rememberBox">
              <input
                type="checkbox"
              />
              <p>Remember me.</p>
            </div>

            <Link to="/">Forgot password?</Link>
          </label> */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="" type='submit'>
              Sign In
            </button>
          {/* {message && <p>{message}</p>} */}
        </form>
      </div>   
    </div>
  );
}
