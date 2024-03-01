/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  marineTrafficClusterCustomIcon,
  trakSatClusterCustomIcon,
  spiderTrakClusterCustomIcon,
  personnelClusterCustomIcon,
  incidentClusterCustomIcon,
  vehicleClusterCustomIcon,
  carClusterCustomIcon
} from './clusterIcon/ClusterIcon';
import WindyMap from './windy/WindyMap'; 
import FilterDrawer from './filterDrawer/FilterDrawer';
import MarineTrafficMarker from './markers/MarineTrafficMarker';
import VideoStreamMarker from './markers/VideoStreamMarker';
import PersonnelMarker from './markers/PersonnelTrafficMarker';
import TrakSatMarker from './markers/TrakSatMarker';
import SpiderTrakMarker from './markers/SpiderTrakMarker';
import OfficeMarker from './markers/OfficeMarker'
import WeatherMarker from './markers/WeatherMarker';
import VehiclesMarker from './markers/VehiclesMarker'
import IncidentsMarker from './markers/IncidentsMarker'
import CarTrackMarker from './markers/CarMarker';

import ButtonToggleDrawer from './buttons/btnToggleDrawer';
import ButtonMapChange from './buttons/btnChangeMap';
import ButtonFullScreenMap from './buttons/btnFullScreenMap'
import ButtonToggleCluster from './buttons/btnToggleCluster'

import axios from "axios";
import CityData from '../../city.list.json'
import { videoStreamUrl } from '../../api/api_urls';




export default function MapComponent({ 
  marineTrafficData, 
  tracksatData, 
  spiderTrakData, 
  personnelData,
  videoStreamData,
  officeData,
  vehiclesData,
  incidentData,
  carData
  
}) {
  const mapRef = useRef(null);
  const [showMarineTraffic, setShowMarineTraffic] = useState(false);
  const [showTrakSat, setShowTrakSat] = useState(false);
  const [showIncident, setShowIncident] = useState(false)
  const [showVehicles, setShowVehicles] = useState(false)
  const [showVideoStream, setShowVideoStream] = useState(false)
  const [showWeather, setShowWeather] = useState(false);
  const [showSpiderTrak, setShowSpiderTrak] = useState(false);
  const [showCarTrack, setShowCarTrack] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showOffice, setShowOffice] = useState(false)
  const [showSpiderTrakDesc, setShowSpiderTrakDesc] = useState(false);
  const [showTrakSatLabel, setShowTrakSatLabel] = useState(false);
  const [showSpiderTrakLabel, setShowSpiderTrakLabel] = useState(false);

  const [showPersonnel, setShowPersonnel] = useState(false)
  const [showOnDuty, setShowOnDuty] = useState(false);
  const [showOnLeave, setShowOnLeave] = useState(false);
  const [showRnr, setShowRnr] = useState(false);
  const [showNonUniform, setShowNonUniform] = useState(false);
  const [showAllUsernames, setShowAllUsernames] = useState(false);

  const [selectedMarineTraffic, setSelectedMarineTraffic] = useState(null);
  const [selectedTrakSat, setSelectedTrakSat] = useState(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState(null);
  const [selectedVideoStream, setSelectedVideoStream] = useState(null);
  const [selectedSpiderTrak, setSelectedSpiderTrak] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedCarTrack, setSelectedCarTrack] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [cities, setCities] = useState([]);
  const isCelsius = true;

  const [mapLayer, setMapLayer] = useState('osm');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      map.on('fullscreenchange', () => {
        setIsFullscreen(document.fullscreenElement !== null);
      });
    }
  }, []);

  const toggleFullscreen = () => {
    const map = mapRef.current;
    setIsFullscreen(!isFullscreen)
    if (map) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        map.getContainer().requestFullscreen();
      }
    }
  };

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
    setShowVideoStream(getCheckboxState('showVideoStream', false));
    setShowPersonnel(getCheckboxState('showShowPersonnel', false));
    setShowWeather(getCheckboxState('showWeather', false));
    setShowVehicles(getCheckboxState('showVehicles', false));
    setShowIncident(getCheckboxState('showIncident', false));
    setShowCarTrack(getCheckboxState('showCarTrack', false));
  }, []);

   // Update local storage based on state changes
   useEffect(() => {
    updateLocalStorage('showMarineTraffic', showMarineTraffic);
    updateLocalStorage('showTrakSat', showTrakSat);
    updateLocalStorage('showSpiderTrak', showSpiderTrak);
    updateLocalStorage('showVideoStream', showVideoStream);
    updateLocalStorage('showPersonnel', showPersonnel);
    updateLocalStorage('showWeather', showWeather);
    updateLocalStorage('showVehicles', showVehicles);
    updateLocalStorage('showIncident', showIncident);
    updateLocalStorage('showCarTrack', showCarTrack);
  }, [
    showMarineTraffic,
    showTrakSat,
    showSpiderTrak,
    showPersonnel,
    showVideoStream,
    showWeather,
    showVehicles,
    showIncident,
    showCarTrack
  ]);


  const handleToggleOnDuty = () => {
    setShowOnDuty(!showOnDuty);

    };
  
  const handleToggleOnLeave = () => {
    setShowOnLeave(!showOnLeave);

  };

  const handleToggleRnr = () => {
    setShowRnr(!showRnr);
   };


    const handleToggleShowAllUsernames = () => {
      setShowAllUsernames(!showAllUsernames);
    };


    
  const handleToggleNonUniform = () => {
    setShowNonUniform(!showNonUniform);

    };
  

  const handleToggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };


  const handlePersonnel = () => {
    setShowPersonnel(!showPersonnel)
  }

  const handleVehicles = () => {
    setShowVehicles(!showVehicles)
  }

  const handleCarTrack = () => {
    setShowCarTrack(!showCarTrack)
  }

  const handleIncident = () => {
    setShowIncident(!showIncident)
  }

  const handleVideoStream = () => {
    setShowVideoStream(!showVideoStream)
  }


  const handleMarineTraffic = () => {
    setShowMarineTraffic(!showMarineTraffic)

  }
  

  const handleTrakSat = () => {
    setShowTrakSat(!showTrakSat)
    setShowTrakSatLabel(!showTrakSatLabel)
  }

  const handleSpiderTrak = () => {
    setShowSpiderTrak(!showSpiderTrak)
    setShowSpiderTrakLabel(!showSpiderTrakLabel)

  };

  const handleVehiclesMarkerClick = (vehiclesData) => {
    setSelectedVehicles(vehiclesData);
  };

  const handleIncidentMarkerClick = (incidentData) => {
    setSelectedIncident(incidentData);
  };

  const handleOfficeMarkerClick = (officeData) => {
    setSelectedOffice(officeData,);
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

   const handleCarTrackMarker = (carData) => {
    setSelectedCarTrack(carData)
   };
 
 


   const toggleDrawer = () => {
     setIsDrawerOpen(!isDrawerOpen);
   };

   const handleOffice = () => {
    setShowOffice(!showOffice)
  }

  const toggleWeather = () => {
    setShowWeather(!showWeather); // Toggle the state to show/hide weather
  };


  useEffect(() => {
    // Filter cities with country code "PH"
    const philippinesCities = CityData.filter(city => city.country === 'PH');
    
    // Update state with filtered cities
    const limitedCities = philippinesCities.slice(0, 30);
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
  const [withCluster, setWithCluster] = useState(true);

  const handleToggleCluster = () => {
    setWithCluster(!withCluster);
  };
  return (
    <>
  <div className='map_container' >
     <MapContainer ref={mapRef} center={[12.8797, 121.7740]} zoom={3} style={{ height: '100%', width: '100%' }}>
      
      
     {mapLayer === 'osm' ? (
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
      ) : mapLayer === 'windy' ? (
        <WindyMap /> 
      ) : (
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
      )}
   


<FilterDrawer

      isDrawerOpen={isDrawerOpen}
      toggleDrawer={toggleDrawer}


      showOnDuty={showOnDuty}
      handleToggleOnDuty={handleToggleOnDuty}
      showOnLeave={showOnLeave}
      handleToggleOnLeave={handleToggleOnLeave}

      showRnr={showRnr}
      handleToggleRnr={handleToggleRnr}

      showAllUsernames={showAllUsernames}
      handleToggleShowAllUsernames={handleToggleShowAllUsernames}

      showIncident={showIncident}
      handleIncident={handleIncident}

      showVehicles={showVehicles}
      handleVehicles={handleVehicles}

      showMarineTraffic={showMarineTraffic}
      handleMarineTraffic={handleMarineTraffic}

      showTrakSat={showTrakSat}
      handleTrakSat={handleTrakSat}
      showTrakSatLabel={showTrakSatLabel}

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

      showWeather={showWeather}
      toggleWeather={toggleWeather}

      showNonUniform={showNonUniform}
      handleToggleNonUniform={handleToggleNonUniform}

      showCarTrack={showCarTrack}
      handleCarTrack={handleCarTrack}
    
    />

   <div className='button_map_wrapper'>
          <ButtonFullScreenMap isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
         <ButtonMapChange setMapLayer={setMapLayer} mapLayer={mapLayer} />
        {/* <ButtonToggleDrawer  toggleDrawer={toggleDrawer} /> */}
        {mapLayer !== 'windy' && <ButtonToggleDrawer toggleDrawer={toggleDrawer} />}
        {mapLayer !== 'windy' &&  <ButtonToggleCluster handleToggleCluster={handleToggleCluster}  withCluster={withCluster}/> }
      
    </div>


{mapLayer !== 'windy' &&  showWeather &&
    weatherData.map((location) => (
      <WeatherMarker key={`weather-${location.id}`} location={location} isCelsius={isCelsius} />
    ))}

{mapLayer !== 'windy' &&  showOffice && officeData && officeData.map((item, index) => (
            item && item.latitude && item.longitude && (
             <OfficeMarker
             key={`cargo-${index}`}
             item={item}
             index={index}
             selectedOffice={selectedOffice}
             handleOfficeMarkerClick={handleOfficeMarkerClick}
             />
            )
            
          ))}

          {mapLayer !== 'windy' &&  showVideoStream && videoStreamData && videoStreamData.map((item, index) => (
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

{mapLayer !== 'windy' && !withCluster ? 
<MarkerClusterGroup chunkedLoading iconCreateFunction={incidentClusterCustomIcon} >
{mapLayer !== 'windy' &&  showPersonnel &&
  personnelData &&
  personnelData
    .filter(
      (item) =>
        item &&
        item.glatitude &&
        item.glongitude &&
        item.personal_details &&  
        (!showOnDuty || item.personal_details.status_name === 'On-Duty') &&
        (!showOnLeave || item.personal_details.status_name === 'On-Leave') &&
        (!showRnr || item.personal_details.status_name === 'Rest and Recreation') &&
        (!showNonUniform || item.personal_details.status_name === 'non-uniform')  // Check if showAllUsernames is true or if username is available
    )
    .map((item, index) => (
      item &&
      item.glatitude &&
      item.glongitude && (
        <PersonnelMarker
          key={`cargo-${index}`}
          item={item}
          index={index}
          selectedPersonnel={selectedPersonnel}
          handlePersonnelMarkerClick={handlePersonnelMarkerClick}
          showAllUsernames={showAllUsernames}  // Pass showAllUsernames as a prop to PersonnelMarker
        />
      )
    ))}

  </MarkerClusterGroup> :

   <>
     {mapLayer !== 'windy' &&  showPersonnel &&
    personnelData &&
    personnelData
      .filter(
        (item) =>
          item &&
          item.glatitude &&
          item.glongitude &&
          item.personal_details &&  
          (!showOnDuty || item.personal_details.status_name === 'On-Duty') &&
          (!showOnLeave || item.personal_details.status_name === 'On-Leave') &&
          (!showRnr || item.personal_details.status_name === 'Rest and Recreation') &&
          (!showNonUniform || item.personal_details.status_name === 'non-uniform')  // Check if showAllUsernames is true or if username is available
      )
      .map((item, index) => (
        item &&
        item.glatitude &&
        item.glongitude && (
          <PersonnelMarker
            key={`cargo-${index}`}
            item={item}
            index={index}
            selectedPersonnel={selectedPersonnel}
            handlePersonnelMarkerClick={handlePersonnelMarkerClick}
            showAllUsernames={showAllUsernames}  // Pass showAllUsernames as a prop to PersonnelMarker
          />
        )
      ))}
   </>
  }

 

          {/* {showPersonnel && personnelData && personnelData.map((item, index) => (
            item && item.glatitude && item.glongitude && (
             <PersonnelMarker 
             key={`cargo-${index}`}
             item={item}
             index={index}
             selectedPersonnel={selectedPersonnel}
             handlePersonnelMarkerClick={handlePersonnelMarkerClick}
             />
            )
            
          ))} */}


{mapLayer !== 'windy' && !withCluster ? 
<MarkerClusterGroup chunkedLoading iconCreateFunction={personnelClusterCustomIcon} >

{showIncident && incidentData && incidentData.map((item, index) => (
            item && item.glatitude_incident && item.glongitude_incident && (
             <IncidentsMarker 
             key={`cargo-${index}`}
             item={item}
             index={index}
             selectedIncident={selectedIncident}
             handleIncidentMarkerClick={handleIncidentMarkerClick}
             />
            )
            
          ))}
        </MarkerClusterGroup>  
 : <>
{mapLayer !== 'windy' &&  showIncident && incidentData && incidentData.map((item, index) => (
            item && item.glatitude_incident && item.glongitude_incident && (
             <IncidentsMarker 
             key={`incident-${index}`}
             item={item}
             index={index}
             selectedIncident={selectedIncident}
             handleIncidentMarkerClick={handleIncidentMarkerClick}
             />
            )
            
          ))}
</> }    

{mapLayer !== 'windy' && !withCluster ? 
    <MarkerClusterGroup chunkedLoading iconCreateFunction={vehicleClusterCustomIcon} >
        {mapLayer !== 'windy' &&  showVehicles && vehiclesData && vehiclesData.map((item, index) => (
          item && item.latitude && item.longitude && (
            <VehiclesMarker 
            key={`vehicle-${index}`}
            item={item}
            index={index}
            selectedVehicles={selectedVehicles}
            handleVehiclesMarkerClick={handleVehiclesMarkerClick}
            />
          )
        ))} 
    </MarkerClusterGroup> 
    : <>
      {mapLayer !== 'windy' &&  showVehicles && vehiclesData && vehiclesData.map((item, index) => (
          item && item.latitude && item.longitude && (
            <VehiclesMarker 
            key={`vehicle-${index}`}
            item={item}
            index={index}
            selectedVehicles={selectedVehicles}
            handleVehiclesMarkerClick={handleVehiclesMarkerClick}
            />
          )
        ))} 
      </>
}

 {mapLayer !== 'windy' && !withCluster ? 
    <MarkerClusterGroup chunkedLoading iconCreateFunction={carClusterCustomIcon} >
      {showCarTrack &&  carData &&  carData.map((item, index) => (
          item && item.location.latitude && item.location.longitude && (
            <CarTrackMarker 
            key={`car-${index}`}
            item={item}
            index={index}
            selectedCarTrack={selectedCarTrack}
            handleCarTrackMarker={handleCarTrackMarker}
            />
          )
      ))}
    </MarkerClusterGroup> 
    : <>
        {mapLayer !== 'windy' &&  showCarTrack &&  carData &&  carData.map((item, index) => (
          item && item.location.latitude && item.location.longitude && (
            <CarTrackMarker 
            key={`car-${index}`}
            item={item}
            index={index}
            selectedCarTrack={selectedCarTrack}
            handleCarTrackMarker={handleCarTrackMarker}
            />
          )
        ))}
      </>}




      {mapLayer !== 'windy' && !withCluster ? 
          <MarkerClusterGroup chunkedLoading iconCreateFunction={marineTrafficClusterCustomIcon} >
                {showMarineTraffic && marineTrafficData && marineTrafficData.map((item, index) => (
                  <MarineTrafficMarker 
                    key={`cargo-${index}`}
                    item={item}
                    index={index}
                    selectedMarineTraffic={selectedMarineTraffic}
                    handleMarineTrafficMarkerClick={handleMarineTrafficMarkerClick}
                  />
                ))}
        </MarkerClusterGroup> :
        <>
        { mapLayer !== 'windy' &&  showMarineTraffic && marineTrafficData && marineTrafficData.map((item, index) => (
          <MarineTrafficMarker 
            key={`cargo-${index}`}
            item={item}
            index={index}
            selectedMarineTraffic={selectedMarineTraffic}
            handleMarineTrafficMarkerClick={handleMarineTrafficMarkerClick}
          />
        ))}
        </>
      }



        {mapLayer !== 'windy' && !withCluster ? 
        <MarkerClusterGroup chunkedLoading iconCreateFunction={trakSatClusterCustomIcon}>
        {mapLayer !== 'windy' &&   showTrakSat && tracksatData && tracksatData.map((item, index) => (
              <TrakSatMarker
                key={`trakcsat-craft-${index}`}
                item={item}
                selectedTrakSat={selectedTrakSat}
                showDescription={showDescription}
                handleTrakSatMarkerClick={handleTrakSatMarkerClick}
              />
            ))}
        </MarkerClusterGroup>
        : <>
        {mapLayer !== 'windy' && showTrakSat && tracksatData && tracksatData.map((item, index) => (
              <TrakSatMarker
                key={`trakcsat-craft-${index}`}
                item={item}
                selectedTrakSat={selectedTrakSat}
                showDescription={showDescription}
                handleTrakSatMarkerClick={handleTrakSatMarkerClick}
              />
            ))}

        </>}
        

        {mapLayer !== 'windy' && !withCluster ?
         <MarkerClusterGroup chunkedLoading iconCreateFunction={spiderTrakClusterCustomIcon}>
         {showSpiderTrak && spiderTrakData && spiderTrakData.map((item, index) => (
             <SpiderTrakMarker
               key={`spidertrak-${index}`}
               item={item}
               selectedSpiderTrak={selectedSpiderTrak}
               showSpiderTrakDesc={showSpiderTrakDesc}
               handleSpiderTrack={handleSpiderTrack}
             />
           ))}
           </MarkerClusterGroup>
        :
        <>
        {mapLayer !== 'windy' &&  showSpiderTrak && spiderTrakData && spiderTrakData.map((item, index) => (
            <SpiderTrakMarker
              key={`spidertrak-${index}`}
              item={item}
              selectedSpiderTrak={selectedSpiderTrak}
              showSpiderTrakDesc={showSpiderTrakDesc}
              handleSpiderTrack={handleSpiderTrack}
            />
          ))}
        </>
        }
       



     </MapContainer>

   </div>
    </>
  );
}


