/* eslint-disable react/prop-types */
// src/components/TrakSatMarker.js
import { Marker, Popup, Polyline, CircleMarker, useMapEvent,  useMap  } from 'react-leaflet';
import L from 'leaflet';
import { useState, useRef} from 'react';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";

import './MarkerStyle.css'

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  const R = 3440.065; // Radius of the Earth in nautical miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in nautical miles
  return distance;
};

const TrakSatMarker = ({ item, selectedTrakSat, showDescription, handleTrakSatMarkerClick }) => {
  const [endPosition, setEndPosition] = useState([0, 0]); // Default values or any valid initial coordinates
  const [showDistance, setShowDistance] = useState(false);
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  const startPosition = [item.glatitude, item.glongitude];
  const map = useMap();
  const prevZoomRef = useRef(9);


  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleTrakSatMarkerClick(null);
    setShowDistance(false)
  map.flyTo([item.glatitude, item.glongitude], prevZoomRef.current);

  };




  console.log("selected :", selectedTrakSat)

  useMapEvent({
    click: (e) => {
      // Set the endPosition to the clicked coordinates
      setEndPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const distance = calculateDistance(
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1]
  );
  

  const handleDrag = (e) => {
    // Prevent event propagation to the map
    e.stopPropagation();
  };

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
  prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 10);
    handleTrakSatMarkerClick(item);
  };
 
  
 
  if (item.glatitude !== null && item.glongitude !== null) {
    let iconHtml;

    if (item.heading_deg !== null) {
      iconHtml = `<div style="transform: rotate(${item.heading_deg}deg);"><img src='https://traksat.net/i/arrow1.png' alt="" /></div>`;
    } else {
      iconHtml = '<div class="circle-marker"></div>';
    }

    return (
     <>
      <Marker
      position={startPosition}
        icon={L.divIcon({
          className: `traksat-marker ${selectedTrakSat && selectedTrakSat.id === item.id  ? 'selected-marker-traksat' : ''}`, 
          html: `
            ${iconHtml}
            ${showDescription ? `<div class="text-[9px] left-7 text-white font-bold px-2 rounded-[10px] bg-green-600  p-1 absolute">
              ${item.description}
            </div>` : `<div></div>` }
          `,
        })}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      >
      </Marker>


      {showSelectedInfo && selectedTrakSat &&  selectedTrakSat.id === item.id && (
            <Draggable onDrag={handleDrag}>
              <div className="traksatCardContainer">
              <div className='traksatCardHeader'>
                <h3 className='traksatTitle'>TrakSat</h3>
                 <div className='traksatClose'>
                   <IoCloseSharp onClick={() => handleCloseButtonClick()}/>
                 </div>
              </div>

              <div className='traksatCardDetail'>
              <p >Description: <span>{selectedTrakSat.description}</span></p>
              <p>Group: <span>{selectedTrakSat.group}</span></p>
              <p>Last gps: <span>{selectedTrakSat.last_gps_gmt}</span></p>
              <p>Lat: <span>{selectedTrakSat.latitude}</span></p>
              <p>Lon: <span>{selectedTrakSat.longitude}</span></p>
              <p>Speed kph: <span>{selectedTrakSat.speed_kph}</span></p>
              <p>Heading: <span>{selectedTrakSat.heading}</span></p>
              <p>Heading deg: <span>{selectedTrakSat.heading_deg}&#xb0;</span></p>
              </div>
           
             <div className='traksatCardFooter'>
             <button className={` ${showDistance ? 'bg-red-600' : 'bg-green-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Measurement'}
              </button>
              {showDistance && (
                <p className='text-center'>
                  Please <b>Point</b> on the map! <br />
                  double <b>click </b>the point to show the distance
                  {/* Distance: {distance != null ? distance.toFixed(2) + ' nautical miles' : 'N/A'} */}
                </p>
              )}
             </div>
           </div>
            </Draggable>
          )}

        {showDistance && endPosition && (
          <Polyline positions={[startPosition, endPosition]} color="rgb(7, 230, 29)">
            {distance != null && (
              <Popup>
               <div className='flex flex-col gap-5'>
               <h1 className='text-base'>{`Distance: ${distance.toFixed(2)} nautical miles`}</h1>
               {/* <button className={`text-sm  p-2 text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                  {showDistance ? 'Stop Measurement' : 'Start Measurement'}
                </button> */}
               </div>
               </Popup>
              
            )}
            <CircleMarker center={endPosition} radius={6} color="rgb(7, 230, 29)" />
          </Polyline>
        )}
     </>
    );
  }
  return null; // Skip rendering the marker if latitude or longitude is null
};

export default TrakSatMarker;
