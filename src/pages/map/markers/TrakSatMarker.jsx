/* eslint-disable react/prop-types */
// src/components/TrakSatMarker.js
import { Marker, Popup, Polyline, CircleMarker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import { CgCloseO } from "react-icons/cg";


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

  const handleCloseButtonClick = () => {
    handleTrakSatMarkerClick(null);
    setShowSelectedInfo(false);
    setShowDistance(false)
  };

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
          className: `traksat-marker ${selectedTrakSat && selectedTrakSat.asset_id === item.asset_id ? 'selected-marker-traksat' : ''}`,
          html: `
            ${iconHtml}
            ${showDescription ? `<div class="text-[9px] left-7 text-white font-bold px-2 rounded-[10px] bg-green-600  p-1 absolute">
              ${item.description}
            </div>` : `<div></div>` }
          `,
        })}
        eventHandlers={{
          click: () => handleTrakSatMarkerClick(item),
        }}
      >
        {/* <Popup>
          {selectedTrakSat && selectedTrakSat.description === item.description && (
            <div className="popup_card">
              <h2>TrakSat</h2>
              <p>Description: <span>{selectedTrakSat.description}</span></p>
              <p>Group: <span>{selectedTrakSat.group}</span></p>
              <p>Last gps: <span>{selectedTrakSat.last_gps_gmt}</span></p>
              <p>Lat: <span>{selectedTrakSat.latitude}</span></p>
              <p>Lon: <span>{selectedTrakSat.longitude}</span></p>
              <p>Speed kph: <span>{selectedTrakSat.speed_kph}</span></p>
              <p>Heading: <span>{selectedTrakSat.heading}</span></p>
              <p>Heading deg: <span>{selectedTrakSat.heading_deg}&#xb0;</span></p>
           
             <div className='flex flex-col'>
             <button className={`text-sm p-3 rounded-[10px] text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
              </button>
              {showDistance && (
                <p className='text-center'>
                  Please <b>Point</b> on the map! <br />
                  double <b>click </b>the point to show the distance
                  Distance: {distance != null ? distance.toFixed(2) + ' nautical miles' : 'N/A'}
                </p>
              )}
             </div>
           </div>
          )}
        </Popup> */}
      </Marker>


      { showSelectedInfo && selectedTrakSat && selectedTrakSat.description === item.description && (
            <div className="z-[2000] absolute top-40 left-[50%] bg-[#ffffffe7] overflow-hidden rounded-md">
              <div className='flex justify-between bg-gray-600 text-white items-center p-2'>
                <h3 className='text-md'>TrakSat</h3>
                 <div className='bg-white p-1 rounded-full text-black'>
                   <CgCloseO onClick={() => handleCloseButtonClick()}/>
                 </div>
              </div>

              <div className='p-5'>
              <p>Description: <span>{selectedTrakSat.description}</span></p>
              <p>Group: <span>{selectedTrakSat.group}</span></p>
              <p>Last gps: <span>{selectedTrakSat.last_gps_gmt}</span></p>
              <p>Lat: <span>{selectedTrakSat.latitude}</span></p>
              <p>Lon: <span>{selectedTrakSat.longitude}</span></p>
              <p>Speed kph: <span>{selectedTrakSat.speed_kph}</span></p>
              <p>Heading: <span>{selectedTrakSat.heading}</span></p>
              <p>Heading deg: <span>{selectedTrakSat.heading_deg}&#xb0;</span></p>
              </div>
           
             <div className='flex flex-col  p-5'>
             <button className={`text-sm p-3 rounded-[10px] text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
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
