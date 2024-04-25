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
import { 
  apiMarineTrafficSetting,
  apiTraksatSetting,
  apiSpiderTrakSetting,
  apiCarTrackSettings
 } from '../../api/api_urls';
 import GetToken from '../../components/token/GetToken'

export default function Settings() {
  const [marineTrafficApiKey, setMarineTrafficApikey] = useState('')
  const [marineTrafficUrl, setMarineTrafficUrl] = useState('')
  const [marineTrafficMessage, setMarineTrafficMessage] = useState('extended')
  const [trakSatUrl, setTrakSatUrl] = useState('https://traksat.net/0259bb696454208dc7cfbdb2733c325e/list')
  // const [trakSatUrlDisplay, setTrakSatUrlDisplay] = useState('')
  const [spiderTrakUrl, setSpiderTrakUrl] = useState('https://apigw.spidertracks.io/go/aff/feed')
  const csrfToken = GetToken()
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [carTrackUrl, setCarTrackUrl] = useState('');
  const [carTrackUsername, setCarTrackUsername] = useState('');
  const [carTrackPassword, setCarTrackPassword] = useState('');
  const [carTrackToken, setCarTrackToken] = useState('');
  
  // const [isForbidden, setIsForbidden] = useState(false);
  const [updateMessageInfo, setUpdateMessageInfo] = useState({ message: '', visible: false });
  const [urlErrorInfo, setUrlErrorInfo] = useState({ message: '', visible: false });

 



  const fetchData = async (url, stateSetter, additionalHeaders = {}) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'X-CSRFToken': getCsrfToken(),
          ...additionalHeaders,
        },
      });
      stateSetter(response.data.success[0]);
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
    }
  };


  useEffect(() => {
    fetchData(apiMarineTrafficSetting, (data) => {
      setMarineTrafficApikey(data.marine_traf_api_key);
      setMarineTrafficUrl(data.marine_traf_base_url);
    });
  }, []);


  useEffect(() => {
    const fetchDataCar = async () => {
      try {
        const response = await axios.get(apiCarTrackSettings, {
          headers: {
            'X-CSRFToken': getCsrfToken(),
          },
        });

        console.log("car settings", response)
      } catch (error) {
        console.error(`Failed to fetch data from ${url}:`, error);
      }
    };

    fetchDataCar()
  }, []);


  useEffect(() => {
    fetchData(apiTraksatSetting, (data) => {
      setTrakSatUrl(data.traksat_base_url);
    });
  }, []);

  useEffect(() => {
    fetchData(apiSpiderTrakSetting, (data) => {
      setSpiderTrakUrl(data.spidertracks_base_url);
    });
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
  
      await axios.put(apiTraksatSetting, data, { headers });
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
  
      await axios.put(apiSpiderTrakSetting, data, { headers });
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
      const response = await axios.put(apiSpiderTrakSetting, data, { headers });
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
    const response = await axios.put(apiMarineTrafficSetting, data, { headers });
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
    const response = await axios.put(apiMarineTrafficSetting, data, { headers });

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
    const response = await axios.put(apiMarineTrafficSetting, data, { headers });

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


const handleCarTrackSubmit = async (e) => {
  e.preventDefault();

  try {
    const headers = {
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    };

    const data = {
      cartrack_base_url: carTrackUrl,
      cartrack_username: carTrackUsername,
      cartrack_password: carTrackPassword,
      cartrack_token: carTrackToken
    };

    const response = await axios.put(apiCarTrackSettings, data, { headers });
    console.log('Car Track settings updated successfully', response.data.success);
    setUpdateMessageInfo({ message: 'Car Track settings updated successfully', visible: true });

    // Clear the update message after 3 seconds
    setTimeout(() => {
      setUpdateMessageInfo({ message: '', visible: false });
    }, 3000);
  } catch (error) {
    console.error('Car Track settings update error:', error);
    // Handle error here if needed
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

        <div className='settings_box'>
  <span>Car Track</span>
  <div className="flex gap-2">
    <TextField value={carTrackUrl} onChange={(e) => setCarTrackUrl(e.target.value)} id="outlined-basic" label="URL" variant="outlined" />
    <TextField value={carTrackUsername} onChange={(e) => setCarTrackUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
    <TextField value={carTrackPassword} onChange={(e) => setCarTrackPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
    <TextField value={carTrackToken} onChange={(e) => setCarTrackToken(e.target.value)} id="outlined-basic" label="Token" variant="outlined" />
    <Button variant="contained" onClick={handleCarTrackSubmit}>Submit</Button>
  </div>
</div>


     

      </div>
    </div>
  )
}
