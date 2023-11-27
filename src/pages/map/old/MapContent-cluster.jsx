/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  marineTrafficClusterCustomIcon,
  trakSatClusterCustomIcon,
  personnelClusterCustomIcon,
  videoStreamClusterCustomIcon,
  spiderTrakClusterCustomIcon,
} from '../clusterIcon/ClusterIcon';

import FilterDrawer from '../filterDrawer/FilterDrawer';
import MarineTrafficMarker from '../markers/MarineTrafficMarker';
import VideoStreamMarker from '../markers/VideoStreamMarker';
import PersonnelMarker from '../markers/PersonnelTrafficMarker';
import TrakSatMarker from '../markers/TrakSatMarker';
import SpiderTrakMarker from '../markers/SpiderTrakMarker';

import ButtonToggleDrawer from '../buttons/btnToggleDrawer';
import ButtonMapChange from '../buttons/btnChangeMap';



const videoStreamUrl = import.meta.env.VITE_VIDEOSTREAM_URL;


export default function Map({ 
  marineTrafficData, 
  tracksatData, 
  spiderTrakData, 
  personnelData,
  videoStreamData
  
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

  const [showTrakSat, setShowTrakSat] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showSpiderTrakLabel, setShowSpiderTrakLabel] = useState(false);

  const [mapLayer, setMapLayer] = useState('osm');
 
  const [showPersonnel, setShowPersonnel] = useState(false)
  const [showVideoStream, setShowVideoStream] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


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


    

      <MarkerClusterGroup chunkedLoading iconCreateFunction={videoStreamClusterCustomIcon} >
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
          </MarkerClusterGroup>
         
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

          </MarkerClusterGroup>



        <MarkerClusterGroup chunkedLoading iconCreateFunction={trakSatClusterCustomIcon} >
          {showTrakSat && tracksatData && tracksatData.map((item, index) => (
              <TrakSatMarker
                key={`trakcsat-craft-${index}`}
                item={item}
                selectedTrakSat={selectedTrakSat}
                showDescription={showDescription}
                handleTrakSatMarkerClick={handleTrakSatMarkerClick}
              />
            ))}
          </MarkerClusterGroup>


        <MarkerClusterGroup chunkedLoading iconCreateFunction={spiderTrakClusterCustomIcon} >
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

     </MapContainer>

   </div>
    </>
  );
}
