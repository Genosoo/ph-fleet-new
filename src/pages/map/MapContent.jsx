/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import FilterDrawer from './filterDrawer/FilterDrawer';
import MarineTrafficMarker from './markers/MarineTrafficMarker';
import VideoStreamMarker from './markers/VideoStreamMarker';
import PersonnelMarker from './markers/PersonnelTrafficMarker';
import TrakSatMarker from './markers/TrakSatMarker';
import SpiderTrakMarker from './markers/SpiderTrakMarker';
import OfficeMarker from './markers/OfficeMarker'
import WeatherMarker from './markers/WeatherMarker';

import ButtonToggleDrawer from './buttons/btnToggleDrawer';
import ButtonMapChange from './buttons/btnChangeMap';
import axios from "axios";
import CityData from '../../city.list.json'



const videoStreamUrl = import.meta.env.VITE_VIDEOSTREAM_URL;


export default function MapComponent({ 
  marineTrafficData, 
  tracksatData, 
  spiderTrakData, 
  personnelData,
  videoStreamData,
  officeData
  
}) {
  const mapRef = useRef(null);
  const [showMarineTraffic, setShowMarineTraffic] = useState(false);
  const [selectedMarineTraffic, setSelectedMarineTraffic] = useState(null);
  const [selectedTrakSat, setSelectedTrakSat] = useState(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedVideoStream, setSelectedVideoStream] = useState(null);
  const [selectedSpiderTrak, setSelectedSpiderTrak] = useState(null);
  const [showSpiderTrak, setShowSpiderTrak] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showSpiderTrakDesc, setShowSpiderTrakDesc] = useState(false);
  
  const [weatherData, setWeatherData] = useState([]);
  const isCelsius = true;

  const [cities, setCities] = useState([]);
  const [showWeather, setShowWeather] = useState(false);

  const [showTrakSat, setShowTrakSat] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showSpiderTrakLabel, setShowSpiderTrakLabel] = useState(false);

  const [mapLayer, setMapLayer] = useState('osm');
 
  const [showPersonnel, setShowPersonnel] = useState(false)
  const [showVideoStream, setShowVideoStream] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const [showOffice, setShowOffice] = useState(false)


  console.log('dsadasdasdasd',weatherData)


  function GetCoodinates() {
    const map = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound: (location) => {
        console.log('location found:', location);
        setUserLocation(location);
      },
    });
    return null;
  }


    
  

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Function to retrieve checkbox state from localStorage
  const getCheckboxState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };




  


  // Update checkbox states based on localStorage on component mount
  useEffect(() => {
    setShowMarineTraffic(getCheckboxState('showMarineTraffic', false));
    setShowTrakSat(getCheckboxState('showTrakSat', false));
    setShowSpiderTrak(getCheckboxState('showSpiderTrak', false));
    setShowPersonnel(getCheckboxState('showPersonnel', false));
    setShowVideoStream(getCheckboxState('showVideoStream', false));
  }, []);

  useEffect(() => {
    updateLocalStorage('showMarineTraffic', showMarineTraffic);
  }, [showMarineTraffic]);

  useEffect(() => {
    updateLocalStorage('showTrakSat', showTrakSat);
  }, [showTrakSat]);

  useEffect(() => {
    updateLocalStorage('showSpiderTrak', showSpiderTrak);
  }, [showSpiderTrak]);

  useEffect(() => {
    updateLocalStorage('showPersonnel', showPersonnel);
  }, [showPersonnel]);


  useEffect(() => {
    updateLocalStorage('showVideoStream', showVideoStream);
  }, [showVideoStream]);



  const handleToggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };


  const handlePersonnel = () => {
    setShowPersonnel(!showPersonnel)
  }
  const handleVideoStream = () => {
    setShowVideoStream(!showVideoStream)
  }


  const handleMarineTraffic = () => {
    setShowMarineTraffic(!showMarineTraffic)

  }
  

  const handleTrakSat = () => {
    setShowTrakSat(!showTrakSat)
    setShowLabel(!showLabel)

  }

  const handleSpiderTrak = () => {
    setShowSpiderTrak(!showSpiderTrak)
    setShowSpiderTrakLabel(!showSpiderTrakLabel)

  };


  const handleMarineTrafficMarkerClick = (vesselData) => {
    setSelectedMarineTraffic(vesselData);
  };

 
  const handleTrakSatMarkerClick = (trackData) => {
   setSelectedTrakSat(trackData)
  };

  const handlePersonnelMarkerClick = (personnelData) => {
    setSelectedPersonnel(personnelData)
   };


   const handleVideoStreamMarkerClick = (videoStreamData) => {
    setSelectedVideoStream(videoStreamData)
   };


   
  const handleSpiderTrack = (spiderData) => {
    setSelectedSpiderTrak(spiderData)
   };
 


   const toggleDrawer = () => {
     setIsDrawerOpen(!isDrawerOpen);
   };

   const handleOffice = () => {
    setShowOffice(!showOffice)
  }

  const toggleWeather = () => {
    setShowWeather(prevState => !prevState); // Toggle the state to show/hide weather
  };


  useEffect(() => {
    // Filter cities with country code "PH"
    const philippinesCities = CityData.filter(city => city.country === 'PH');
    
    // Update state with filtered cities
    const limitedCities = philippinesCities.slice(0, 1);
      setCities(limitedCities);
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = cities.map(async (city) => {
          if (city.coord && city.coord.lat && city.coord.lon) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=57dc50d45df872ec0dc1ba3ad35db168
                `
              );
              return { ...city, weather: response.data };
            } catch (error) {
              if (error.response && error.response.status === 429) {
                // Implement a backoff strategy
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
                // Retry the failed request
                return axios.get(/* Retry request here */);
              }
              // Handle other errors
              console.error('Error fetching weather data:', error);
              return null;
            }
          }
          return null; // Skip if coordinates are not available
        });
    
        const weatherResults = await Promise.all(promises.filter(Boolean)); // Filter out null values
        setWeatherData(weatherResults);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    
  
    fetchData();
  }, [cities]);
  
  
  console.log(cities)
  
  console.log("weather data:", weatherData)

  return (
    <>
    <div className='button_map_wrapper'>
      <ButtonMapChange setMapLayer={setMapLayer} mapLayer={mapLayer} />
      <ButtonToggleDrawer  toggleDrawer={toggleDrawer} />
    </div>

    <FilterDrawer
      isDrawerOpen={isDrawerOpen}
      toggleDrawer={toggleDrawer}
      showMarineTraffic={showMarineTraffic}
      handleMarineTraffic={handleMarineTraffic}
      showTrakSat={showTrakSat}
      handleTrakSat={handleTrakSat}
      showLabel={showLabel}
      showDescription={showDescription}
      setShowDescription={setShowDescription}
      showSpiderTrak={showSpiderTrak}
      handleSpiderTrak={handleSpiderTrak}
      showSpiderTrakDesc={showSpiderTrakDesc}
      setShowSpiderTrakDesc={setShowSpiderTrakDesc}
      showPersonnel={showPersonnel}
      handlePersonnel={handlePersonnel}
      showVideoStream={showVideoStream}
      handleVideoStream={handleVideoStream}
      handleOffice={handleOffice}
      showOffice={showOffice}
      toggleWeather={toggleWeather}
    />
  <div className='map_container'>
     

     <MapContainer ref={mapRef} center={[12.8797, 121.7740]} zoom={3} style={{ height: '100%', width: '100%' }}>
       {mapLayer === 'osm' ? (
           <TileLayer
           url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
           subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
         />
     
        ) : (
          <TileLayer
       url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
       subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
     />
        )}


{showWeather &&
    weatherData.map((location) => (
      <WeatherMarker key={`weather-${location.id}`} location={location} isCelsius={isCelsius} />
    ))}

{showOffice && officeData && officeData.map((item, index) => (
            item && item.latitude && item.longitude && (
             <OfficeMarker
             key={`cargo-${index}`}
             item={item}
             index={index}
             />
            )
            
          ))}

          {showVideoStream && videoStreamData && videoStreamData.map((item, index) => (
            item && item.glatitude && item.glongitude && (
              <VideoStreamMarker
              key={`cargo-${index}`}
              item={item}
              index={index}
              selectedVideoStream={selectedVideoStream}
              handleVideoStreamMarkerClick={handleVideoStreamMarkerClick}
              isVideoPlaying={isVideoPlaying}
              handleToggleVideo={handleToggleVideo}
              videoStreamUrl={videoStreamUrl}
            />
            )))}
         
          {showPersonnel && personnelData && personnelData.map((item, index) => (
            item && item.glatitude && item.glongitude && (
             <PersonnelMarker 
             key={`cargo-${index}`}
             item={item}
             index={index}
             selectedPersonnel={selectedPersonnel}
             handlePersonnelMarkerClick={handlePersonnelMarkerClick}
             />
            )
            
          ))}

          {showMarineTraffic && marineTrafficData && marineTrafficData.map((item, index) => (
            <MarineTrafficMarker 
              key={`cargo-${index}`}
              item={item}
              index={index}
              selectedMarineTraffic={selectedMarineTraffic}
              handleMarineTrafficMarkerClick={handleMarineTrafficMarkerClick}
            />
          ))}




          {showTrakSat && tracksatData && tracksatData.map((item, index) => (
              <TrakSatMarker
                key={`trakcsat-craft-${index}`}
                item={item}
                selectedTrakSat={selectedTrakSat}
                showDescription={showDescription}
                handleTrakSatMarkerClick={handleTrakSatMarkerClick}
              />
            ))}


        {showSpiderTrak && spiderTrakData && spiderTrakData.map((item, index) => (
            <SpiderTrakMarker
              key={`spidertrak-${index}`}
              item={item}
              selectedSpiderTrak={selectedSpiderTrak}
              showSpiderTrakDesc={showSpiderTrakDesc}
              handleSpiderTrack={handleSpiderTrack}
            />
          ))}
      <GetCoodinates/>  
     </MapContainer>

   </div>
    </>
  );
}


