/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext/AuthContext';
import axios from 'axios';
import loginLogo from '../assets/logo.png';
import nlogo from '../assets/nlgo.jpg';
import nlogo1 from '../assets/fleet_logo.png';
import { apilogin} from '../api/api_urls';
import GetToken from '../components/token/GetToken';


export default function Login() {
  const csrfToken = GetToken()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { authState, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });



  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(apilogin, formData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      // Check the response for errors
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const { token } = response.data;
        dispatch({ type: 'LOGIN', payload: { user: formData.username, token } });
        navigate('/fleet/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError('Wrong credentials. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="login_container">
      <div className="login_form_wrapper w-[550px]">
      <div className='flex gap-4 w-full items-center justify-center'>
      <img className='w-[140px] h-[110px]' src={nlogo1} alt="" />
        <img className='w-[100px] h-[100px] ' src={loginLogo} alt="" />
        <img className='w-[100px] h-[100px] ' src={nlogo} alt="" />
      </div>
      <h2 className='text-[2rem] mt-10'>WELCOME</h2>
        <span className='mt-10'>
          <p className='px-10 text-center font-semibold '> 
           <span className='text-sm'>Access to this site is limited to authorized users only. If you are not an authorized user,
            please close your browser and do not attempt further access. All activities in this 
            site is monitored and logged. Thank you!</span></p>
        </span>
        <form onSubmit={handleSubmit}>
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
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="" type="submit">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
