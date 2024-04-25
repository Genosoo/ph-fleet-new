/* eslint-disable react/prop-types */
// src/components/TrakSatMarker.js
import { Marker, Polyline, useMap, useMapEvent, Tooltip } from 'react-leaflet';

import L from 'leaflet';
import { useState, useRef} from 'react';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";

import traksat1Icon from '../../../assets/icon/traksat_1.svg'
import traksat2Icon from '../../../assets/icon/traksat_2.svg'
import TraksatIconMeasure from './icon/TraksatIcon'

import './MarkerStyle.css'



const TrakSatMarker = ({ item, selectedTrakSat, showDescription, handleTrakSatMarkerClick }) => {
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measurementCoordinates, setMeasurementCoordinates] = useState([]);
  const startPosition = [item.glatitude, item.glongitude];
  const map = useMap();
  const prevZoomRef = useRef(9);


  const handleCloseButtonClick = () => {
    handleTrakSatMarkerClick(null);
    setMeasurementCoordinates([]);
    setShowSelectedInfo(false);
    setMeasurementMode(false);
    map.setView([item.glatitude, item.glongitude], prevZoomRef.current);
  };



  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 9, {
      duration: 2,
      easeLinearity: 0.25
    });
    handleTrakSatMarkerClick(item);

  
  };

  const handleDrag = (e) => {
    e.stopPropagation();
  };
  



  const toggleMeasurementMode = () => {
    setMeasurementMode(!measurementMode);
    if (!measurementMode) {
      // If starting a new measurement, clear previous coordinates
      setMeasurementCoordinates([startPosition]);
    } else {
      // If stopping measurement, reset measurement mode and coordinates
      setMeasurementCoordinates([]);
    }
  };

  

  const EARTH_RADIUS_NM = 3443.92; // Earth's radius in nautical miles
  const calculateMeasurementDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const latlng1 = L.latLng(coordinates[i]);
      const latlng2 = L.latLng(coordinates[i + 1]);
      const distance = latlng1.distanceTo(latlng2) / EARTH_RADIUS_NM; // Convert meters to nautical miles
      totalDistance += distance;
    }
    return totalDistance;
  };

  
  const queryDateTime = selectedTrakSat && selectedTrakSat.query_date_time_id
            ? new Date(selectedTrakSat.query_date_time_id)
            : null;
        const formattedDateTime = queryDateTime
            ? `${queryDateTime.getFullYear()}-${(queryDateTime.getMonth() + 1).toString().padStart(2, '0')}-${queryDateTime.getDate().toString().padStart(2, '0')} ${queryDateTime.getHours().toString().padStart(2, '0')}:${queryDateTime.getMinutes().toString().padStart(2, '0')}:${queryDateTime.getSeconds().toString().padStart(2, '0')}.${queryDateTime.getMilliseconds().toString().padStart(3, '0')}`
            : "N/A";


  useMapEvent('click', (e) => {
    if (measurementMode) {
      setMeasurementCoordinates(prevCoordinates => [...prevCoordinates, e.latlng]);
    }
  });

  const measurementDistance = calculateMeasurementDistance(measurementCoordinates);


  
 
  if (item.glatitude !== null && item.glongitude !== null) {
    let iconHtml;

    if (item.heading_deg !== null) {
      iconHtml = `<div class="bgdark-marker"><img src="${traksat1Icon}" style="transform: rotate(${item.heading_deg}deg);" /></div>`;
    } else {
      iconHtml = `<div class="bgdark-marker"><img src="${traksat2Icon}" style="transform: rotate(${item.heading_deg}deg);" /></div>`;
    }

    return (
     <>
      <Marker
      position={startPosition}
        icon={L.divIcon({
          className: `traksat-marker ${selectedTrakSat && selectedTrakSat.id === item.id  ? 'selected-traksat' : ''}`, 
          html: `${iconHtml}${showDescription ? `<div class="text-[9px] left-7 text-white font-bold px-2 rounded-[10px] bg-green-600  p-1 absolute">
              ${item.description}
            </div>` : `<div></div>` }
          `,
        })}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      >
      </Marker>
      {measurementMode && (
        <p className='traksatDistance'><b className='text-white'>Distance:</b> {(measurementDistance).toFixed(2)} NM</p>
      )}

      {showSelectedInfo && selectedTrakSat &&  selectedTrakSat.id === item.id && (
            <Draggable onDrag={handleDrag}>
              <div className="traksatCardContainer">
              <div className='traksatCardHeader'>
                     <img src={traksat1Icon} alt="icon" />
                     <img src={traksat2Icon} alt="icon" />
                 <h3 className='traksatTitle'>Traksat</h3>
                 <div className='traksatClose'>
                   <IoCloseSharp onClick={() => handleCloseButtonClick()}/>
                 </div>
              </div>

              <div className='traksatCardDetail'>
                <span className='span1'>
                   <p>Description</p>
                   <p>Group</p>
                   <p>GPS State</p>
                   <p>Last GPS</p>
                   <p>Last Report</p>
                   <p>Query Date/Time</p>
                   <p>Coordinates</p>
                   <p>Speed kph</p>
                   <p>Network</p>
                   <p>ODO</p>
                   <p>Heading</p>
                   <p>Heading deg</p>
                   <p>Alert</p>
                   <p>Altitude Metres</p>
                </span>

                <span>
                  <p>{selectedTrakSat?.description || "N/A"}</p>
                  <p>{selectedTrakSat?.group || "N/A"}</p>
                  <p>{selectedTrakSat?.gps_state || "N/A"}</p>
                  <p>{selectedTrakSat?.last_gps_gmt || "N/A"}</p>
                  <p>{selectedTrakSat?.last_report_gmt || "N/A"}</p>
                  <p>{formattedDateTime}</p>
                  <p>{selectedTrakSat?.latitude || "N/A"}, {selectedTrakSat?.longitude || "N/A"}</p>
                  <p>{selectedTrakSat?.speed_kph || "N/A"}</p>
                  <p>{selectedTrakSat?.network || "N/A"}</p>
                  <p>{selectedTrakSat?.odo || "N/A"}</p>
                  <p>{selectedTrakSat?.heading || "N/A"}</p>
                  <p>{selectedTrakSat?.heading_deg || "N/A"}&#xb0;</p>
                  <p>{selectedTrakSat?.alert || "N/A"}</p>
                  <p>{selectedTrakSat?.altitude_metres || "N/A"}</p>
                </span>
             
             
              </div>
           
             <div className='traksatCardFooter'>
              <button className={`${measurementMode ? 'bg-[#EB5454]' : 'bg-[#0DB0E6]'}`} onClick={toggleMeasurementMode}>
                {measurementMode ? 'Stop Measurement' : 'Start Measurement'}
              </button>
             </div>
           </div>
            </Draggable>
          )}

        {measurementCoordinates.length > 1 && selectedTrakSat && selectedTrakSat.id === item.id && (
          <Polyline positions={measurementCoordinates} color="#00FF00" />
        )}

      {/* Show dots for each measurement point */}
      {measurementCoordinates.map((coordinate, idx) => (
        <Marker key={`measurement-dot-${idx}`} position={coordinate} icon={TraksatIconMeasure}>
          <Tooltip>{`Distance: ${(calculateMeasurementDistance(measurementCoordinates.slice(0, idx + 1))).toFixed(2)} NM`}</Tooltip>
        </Marker>
      ))}

     </>
    );
  }
  return null; // Skip rendering the marker if latitude or longitude is null
};

export default TrakSatMarker;
