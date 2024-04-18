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
} from './clusterIcon/ClusterIcon';
import WindyMap from './windy/WindyMap'; 
import FilterDrawer from './filterDrawer/FilterDrawer';
import MarineTrafficMarker from './markers/MarineTrafficMarker';

import ButtonMapChange from './buttons/btnChangeMap';
import ButtonFullScreenMap from './buttons/btnFullScreenMap'
import ButtonToggleCluster from './buttons/btnToggleCluster'
import ButtonZoom from './buttons/buttonZoom'
import ButtonToggleDrawer from './buttons/btnToggleDrawer'






export default function MapComponent({ 
  marineTrafficData, 
  
}) {
  const mapRef = useRef(null);
  const [showMarineTraffic, setShowMarineTraffic] = useState(false);
  const [mapLayer, setMapLayer] = useState('osm');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [toggleDrawer, setToggleDrawer] = useState(true)

  const handleToggleDrawer = () => {
       setToggleDrawer(!toggleDrawer)
  }

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
  }, []);

   // Update local storage based on state changes
   useEffect(() => {
    updateLocalStorage('showMarineTraffic', showMarineTraffic);
 
  }, [
    showMarineTraffic,
  
  ]);


  const handleShowAllVessels = () => {
    setShowAllVessels(!showAllVessels)
    setShowMarineTraffic(!showMarineTraffic)
    setShowTrakSat(!showTrakSat)

  }

 

  const handleMarineTraffic = () => {
    setShowMarineTraffic(!showMarineTraffic)

  }
  




  const handleMarineTrafficMarkerClick = (vesselData) => {
    setSelectedMarineTraffic(vesselData);
    console.log("vessel data:", vesselData)
  };

 
 

  const [withCluster, setWithCluster] = useState(true);

  const handleToggleCluster = () => {
    setWithCluster(!withCluster);
  };
  return (
    <>
  <div className='map_container' >


  {!isFullscreen &&  toggleDrawer && mapLayer !== 'windy' && (
   <FilterDrawer
    toggleDrawer={toggleDrawer}

    
    showMarineTraffic={showMarineTraffic}
    handleMarineTraffic={handleMarineTraffic}

    />
  )}


     <MapContainer  zoomControl={false} ref={mapRef} center={[12.8797, 121.7740]} zoom={6} style={{cursor:"pointer", height: '100%', width: '100%' }}>
      
     {isFullscreen && toggleDrawer && mapLayer !== 'windy' && (
   <FilterDrawer
    
    showMarineTraffic={showMarineTraffic}
    handleMarineTraffic={handleMarineTraffic}

  
    />
  )}

     {mapLayer === 'osm' ? (
        <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
      ) : mapLayer === 'windy' ? (
        <WindyMap /> 
      ) : (
        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
      )}
   


   <ButtonMapChange setMapLayer={setMapLayer} mapLayer={mapLayer} />
    <div className="btnBottomSide">
        {mapLayer !== 'windy' &&  <ButtonToggleDrawer toggleDrawer={toggleDrawer}  handleToggleDrawer={handleToggleDrawer} />}
        {mapLayer !== 'windy' &&  <ButtonToggleCluster handleToggleCluster={handleToggleCluster}  withCluster={withCluster}/> }
        {mapLayer !== 'windy' && <ButtonZoom /> }
        <ButtonFullScreenMap isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
    </div>





{/*=============================== MARINETRAFFIC MARKER ==================================*/}
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




     </MapContainer>

   </div>
    </>
  );
}


