/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'


const baseUrl = import.meta.env.VITE_URL;

const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`

const getMarineTrafficSettingUrl = `${baseUrl}/api/marine_traffic_settings/`
const getTraksatSettingUrl = `${baseUrl}/api/traksat_settings/`
const getSpiderTrakSettingUrl = `${baseUrl}/api/spidertracks_settings/`

const postMarineTrafficSettingUrl = `${baseUrl}/api/marine_traffic_settings/`
const postTraksatSettingUrl = `${baseUrl}/api/traksat_settings/`
const postSpiderTrakSettingUrl = `${baseUrl}/api/spidertracks_settings/`

export default function Settings() {
  const [marineTrafficApiKey, setMarineTrafficApikey] = useState('')
  const [marineTrafficUrl, setMarineTrafficUrl] = useState('')
  const [marineTrafficMessage, setMarineTrafficMessage] = useState('extended')
  const [trakSatUrl, setTrakSatUrl] = useState('https://traksat.net/0259bb696454208dc7cfbdb2733c325e/list')
  // const [trakSatUrlDisplay, setTrakSatUrlDisplay] = useState('')
  const [spiderTrakUrl, setSpiderTrakUrl] = useState('https://apigw.spidertracks.io/go/aff/feed')
  const [csrfToken, setCsrfToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // const [isForbidden, setIsForbidden] = useState(false);
  const [updateMessageInfo, setUpdateMessageInfo] = useState({ message: '', visible: false });
  const [urlErrorInfo, setUrlErrorInfo] = useState({ message: '', visible: false });

 

  
  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
        console.log(response.data['csrf-token'])
      } catch (error) {
        console.log(error);
      }
    };

  
    getTheCsrfToken();
  }, []); 

    // Fetch and set the API key when the component mounts
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(getMarineTrafficSettingUrl,{
                headers: {
                  'X-CSRFToken': csrfToken
                }
              });
              console.log("Marine Traffic Settings: ",response.data.success)
              setMarineTrafficApikey(response.data.success[0].marine_traf_api_key)
              setMarineTrafficUrl(response.data.success[0].marine_traf_base_url)
          } catch (error) {
              console.error('Failed to fetch API key:', error);
              if (error.response && error.response.status === 403) {
                setIsForbidden(true); // Set status to forbidden
            }
          }
      };
  
      fetchData();
  }, []);


  useEffect(() => {
    const fetchDataTraksat = async () => {
      try {
        const response = await axios.get(getTraksatSettingUrl, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        setTrakSatUrl(response.data.success[0].traksat_base_url);
        console.log('tracksat settings', response.data.success[0].traksat_base_url);
      } catch (error) {
        console.error('Failed to fetch traksat_base_url:', error);
        // if (error.response && error.response.status === 403) {
        //   setIsForbidden(true);
        // }
      }
    };
  
   
    fetchDataTraksat();
  }, []);


  useEffect(() => {
    const fetchDataSpiderTrak = async () => {
      try {
        const response = await axios.get(getSpiderTrakSettingUrl, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        setSpiderTrakUrl(response.data.success[0].spidertracks_base_url);
        console.log('spidertrack settings', response.data.success);
      } catch (error) {
        console.error('Failed to fetch traksat_base_url:', error);
        // if (error.response && error.response.status === 403) {
        //   setIsForbidden(true);
        // }
      }
    };
  
   
    fetchDataSpiderTrak();
  }, []);


  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    
    if (trakSatUrl.trim() === '' || trakSatUrl.trim().length < 6) {
      setUrlErrorInfo('URL must be at least 6 characters long');
      return; // Do not proceed with the API request
    }
  
    try {
      const headers = {
        'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
      };
  
      // Define the data to be sent with the PUT request
      const data = { traksat_base_url: trakSatUrl };
  
      await axios.put(postTraksatSettingUrl, data, { headers });
      setUpdateMessageInfo({ message: 'URL updated successfully', visible: true });
  
      // Clear the update message after 3 seconds
      setTimeout(() => {
        setUpdateMessageInfo({ message: '', visible: false });
      }, 3000);
      console.log('URL updated successfully', data);
    } catch (error) {
      console.error('URL update error:', error);
      // if (error.response && error.response.status === 403) {
      //   setIsForbidden(true); // Set status to forbidden
      // }
    }
  };


  const handleSpiderTrakUrl = async (e) => {
    e.preventDefault();
  
    if (spiderTrakUrl.trim() === '' || spiderTrakUrl.trim().length < 6) {
      setUrlErrorInfo('URL must be at least 6 characters long');
      return; // Do not proceed with the API request
    }
  
    try {
      const headers = {
        'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
      };
  
      // Define the data to be sent with the PUT request
      const data = { spidertracks_base_url: spiderTrakUrl };
  
      await axios.put(postSpiderTrakSettingUrl, data, { headers });
      setUpdateMessageInfo({ message: 'URL updated successfully', visible: true });
  
    // Clear the update message after 3 seconds
    setTimeout(() => {
      setUpdateMessageInfo({ message: '', visible: false });
    }, 3000);
  
      console.log('URL updated successfully', data);
    } catch (error) {
      console.error('URL update error:', error);
      // if (error.response && error.response.status === 403) {
      //   setIsForbidden(true); // Set status to forbidden
      // }
    }
  };
  
  
  // Email and Password Settings
  const handleEmailAndPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'X-CSRFToken': csrfToken 
      };
  
      const data = {
        spidertracks_username: userName, 
        spidertracks_password: userPassword, 
      };
  
      // Send the request and get the updated data
      const response = await axios.put(postSpiderTrakSettingUrl, data, { headers });
      console.log('Username and Password Settings updated successfully', response.data.success);
      setUpdateMessageInfo({ message: 'Username and Password updated successfully', visible: true });
      // Clear the update message after 3 seconds
      setTimeout(() => {
        setUpdateMessageInfo({ message: '', visible: false });
      }, 3000);
    } catch (error) {
      console.error('Username and Password update error:', error);
      // You can add an error message here if needed.
    }
  };


  // MARINETRAFFIC TRACKSAT SETTINGS
const handleApiKeySubmit = async (e) => {
  e.preventDefault();
  try {
    const headers = {
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    };

    // Define the data to be sent with the PUT request
    const data = {
      marine_traf_api_key: marineTrafficApiKey,
      marine_traf_base_url:marineTrafficUrl,
      marine_traf_msg_type:marineTrafficMessage
    };

    // Send the request and get the updated data
    const response = await axios.put(postMarineTrafficSettingUrl, data, { headers });
    console.log('Marine Traffice API KEY Sucessfully updated', response.data.success);
    setUpdateMessageInfo({ message: 'API KEY updated successfully', visible: true });
 // Clear the update message after 3 seconds
 setTimeout(() => {
  setUpdateMessageInfo({ message: '', visible: false });
}, 3000);

  } catch (error) {
    console.error('API Key update error:', error);
    // You can add an error message here if needed.
  }
};


const handleMarineTrafficUrlSubmit = async (e) => {
  e.preventDefault();
  try {
    const headers = {
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    };

    // Define the data to be sent with the PUT request
    const data = {
      marine_traf_base_url:marineTrafficUrl,
    };

    // Send the request and get the updated data
    const response = await axios.put(postMarineTrafficSettingUrl, data, { headers });

    console.log('Marine Traffice Url Sucessfully updated', response.data.success);
    setUpdateMessageInfo({ message: 'URL updated successfully', visible: true });
      // Clear the update message after 3 seconds
      setTimeout(() => {
        setUpdateMessageInfo({ message: '', visible: false });
      }, 3000);
        } catch (error) {
          console.error('API Key update error:', error);
          // You can add an error message here if needed.
        }
      };


// MARINETRAFFIC TRACKSAT SETTINGS
const handleMarineTrafficMessageSubmit = async (e) => {
  e.preventDefault();
  try {
    const headers = {
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    };

    // Define the data to be sent with the PUT request
    const data = {
      marine_traf_msg_type:marineTrafficMessage
    };

    // Send the request and get the updated data
    const response = await axios.put(postMarineTrafficSettingUrl, data, { headers });

    console.log('Marine Traffice Message Type Sucessfully updated', response.data.success);
    setUpdateMessageInfo({message: 'Message Type updated successfully', visible: true});
  // Clear the update message after 3 seconds
  setTimeout(() => {
    setUpdateMessageInfo({ message: '', visible: false });
  }, 3000);
 
  } catch (error) {
    console.error('API Key update error:', error);
    // You can add an error message here if needed.
  }
};

  return (
    <div>

<div className='sticky z-[4000] top-0'>
      {updateMessageInfo.visible && (
            <div className=" text-green-500 font-bold mt-2 bg-[#0f0f0f] p-2 text-center rounded-[5px] shadow-lg">
              {updateMessageInfo.message}
            </div>
          )}
          {urlErrorInfo.visible && (
            <div className="text-red-500 font-bold mt-2  bg-[#0f0f0f] p-2 text-center rounded-[5px] shadow-lg">
              {urlErrorInfo.message}
            </div>
          )}
      </div>

      <div className="settings_wrapper">
        <div className='settings_box'>
            <span>TrakSat</span>
           <div className="flex gap-2">
           <TextField value={trakSatUrl} onChange={(e) => setTrakSatUrl(e.target.value)} id="outlined-basic" label="Url" variant="outlined" />
           <Button onClick={handleUrlSubmit} variant="contained">Submit</Button>
           </div>
        </div>

        <div className='settings_box'>
            <span>SpiderTrak</span>
            <div className="flex gap-2">
              <TextField value={spiderTrakUrl} onChange={(e) => setSpiderTrakUrl(e.target.value)} id="outlined-basic" label="Url" variant="outlined" />
              <Button variant="contained" onClick={handleSpiderTrakUrl}>Submit</Button>
            </div>

           <div className='flex  gap-2 mt-10'> 
             <TextField value={userName} onChange={(e) => setUserName(e.target.value)}  id="outlined-basic" label="Username" variant="outlined" />
              <TextField value={userPassword} onChange={(e) => setUserPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
            <Button variant="contained" onClick={handleEmailAndPasswordSubmit}>Submit</Button>
           </div>

        </div>

        <div className='settings_box'>
            <span>Marine Traffic</span>

           <div className='flex gap-2'>
              <TextField value={marineTrafficUrl} onChange={(e) => setMarineTrafficUrl(e.target.value)} id="outlined-basic" label="Url" variant="outlined" />
              <Button variant="contained" onClick={handleMarineTrafficUrlSubmit}>Submit</Button>
           </div>

           <div className="flex gap-2">
              <TextField value={marineTrafficApiKey} onChange={(e) => setMarineTrafficApikey(e.target.value)} id="outlined-basic" label="Api key" variant="outlined" />
              <Button variant="contained" onClick={handleApiKeySubmit}>Submit</Button>
           </div>

           <div className="flex gap-2">
          <FormControl sx={{width:"222px"}}>
          <InputLabel id="demo-simple-select-label">Message Type</InputLabel>
          <Select
              value={marineTrafficMessage}
              onChange={(e) => setMarineTrafficMessage(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={"extended"}>Extended</MenuItem>
              <MenuItem value={"simple"}>Simple</MenuItem>
              <MenuItem value={"full"}>Full</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleMarineTrafficMessageSubmit}>Submit</Button>

      </div>
        </div>

     

      </div>
    </div>
  )
}
