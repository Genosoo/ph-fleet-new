/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import  {useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import FilterDrawer from '../filterDrawer/FilterDrawer';
import TrakSatMarker from '../markers/TrakSatMarker';

import ButtonToggleDrawer from '../buttons/btnToggleDrawer';
import ButtonMapChange from '../buttons/btnChangeMap';




export default function Map({ 
  tracksatData, 
}) {
  const mapRef = useRef(null);
  const [selectedTrakSat, setSelectedTrakSat] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showTrakSat, setShowTrakSat] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [mapLayer, setMapLayer] = useState('osm');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [distanceMarkerPosition, setDistanceMarkerPosition] = useState(null);


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
    setShowTrakSat(getCheckboxState('showTrakSat', false));
  }, []);


  useEffect(() => {
    updateLocalStorage('showTrakSat', showTrakSat);
  }, [showTrakSat]);



  const handleTrakSat = () => {
    setShowTrakSat(!showTrakSat)
    setShowLabel(!showLabel)

  }


  const handleDistanceMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setDistanceMarkerPosition({ lat, lng });
    console.log(lat,lng)
  };
 
  const handleTrakSatMarkerClick = (trackData) => {
   setSelectedTrakSat(trackData)
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
      showTrakSat={showTrakSat}
      handleTrakSat={handleTrakSat}
      showLabel={showLabel}
      showDescription={showDescription}
      setShowDescription={setShowDescription}
    />
  <div className='map_container'>
     

 

     <MapContainer  ref={mapRef} center={[12.8797, 121.7740]} zoom={3} style={{ height: '100%', width: '100%' }}>
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

      

{distanceMarkerPosition && (
            <>
              <Marker
                position={distanceMarkerPosition}
                draggable={true}
                onDragend={handleDistanceMarkerDrag}
              />
              {selectedTrakSat && (
                <Polyline
                  positions={[
                    [selectedTrakSat.latitude, selectedTrakSat.longitude],
                    [distanceMarkerPosition.lat, distanceMarkerPosition.lng],
                  ]}
                  color="red"
                />
              )}
            </>
          )}


          {showTrakSat && tracksatData && tracksatData.map((item, index) => (
              <TrakSatMarker
                key={`trakcsat-craft-${index}`}
                item={item}
                selectedTrakSat={selectedTrakSat}
                showDescription={showDescription}
                handleTrakSatMarkerClick={handleTrakSatMarkerClick}
              />
            ))}


      

     </MapContainer>

   </div>
    </>
  );
}
