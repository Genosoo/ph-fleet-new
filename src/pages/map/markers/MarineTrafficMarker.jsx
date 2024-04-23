/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Marker, Polyline, useMap, useMapEvent, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";
import defaultImage from '../.././../assets/no-image.png';
import marinetrafficIcon from '../../../assets/icon/marinetraffic.svg';
import MarineTrafficIconMeasure from './icon/MarineTrafficIcon';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const MarineTrafficMarker = ({ item, index, selectedMarineTraffic, handleMarineTrafficMarkerClick }) => {
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measurementCoordinates, setMeasurementCoordinates] = useState([]);
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude, item.glongitude];
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseButtonClick = () => {
    handleMarineTrafficMarkerClick(null);
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
    handleMarineTrafficMarkerClick(item);

  
  };

  const handleDrag = (e) => {
    e.stopPropagation();
  };

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = defaultImage;
  };


  const toggleMeasurementMode = () => {
    setMeasurementMode(!measurementMode);
    if (!measurementMode) {
      // If starting a new measurement, clear previous coordinates
      setMeasurementCoordinates([startPosition]);
      setShowSnackbar(true);
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

  



  useMapEvent('click', (e) => {
    if (measurementMode) {
      setMeasurementCoordinates(prevCoordinates => [...prevCoordinates, e.latlng]);
    }
  });

  const measurementDistance = calculateMeasurementDistance(measurementCoordinates);

  return (
    <>
      <Snackbar
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={() => setShowSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        variant='filled'
        onClose={() => setShowSnackbar(false)}
        severity="info"
        sx={{ width: '100%', }}
      >
        Click on the map to start measuring.
      </MuiAlert>
    </Snackbar>
     <Marker
        key={`cargo-${index}`}
        position={startPosition} // Set position to startPosition
        icon={
          L.divIcon({
            className: `marinetraffic-marker ${selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id ? 'selected-marinetraffic' : ''}`,
            html: `<div class="bgdark-marker">
              <img src="${marinetrafficIcon}"  alt="Marine Traffic Icon" style="transform: rotate(${item.course}deg); " />
            </div>`,
          })
        }
        eventHandlers={{
          click: handleMarkerClick
        }}
      />

      {measurementMode && (
        <p className='mtDistance'><b className='text-white'>Distance:</b> {(measurementDistance).toFixed(2)} NM</p>
      )}
      {showSelectedInfo && selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id && (
        <Draggable onDrag={handleDrag}>
          <div className="mtCardContainer" >
            <div className="mtCardHeader">
              <div className="mtCardTop">
                <img src={marinetrafficIcon} alt="" />
                <h3>MarineTraffic</h3>
                <IoCloseSharp className="mtClose" onClick={() => handleCloseButtonClick()} />
              </div>
              <div className='mtBoxFlag'>
                {selectedMarineTraffic.flag && (
                  <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/flags/4x3/${selectedMarineTraffic.flag.toLowerCase()}.svg`} alt=""
                    onError={handleImageError}
                  />
                )}
                <span>
                  <h4>{selectedMarineTraffic?.shipname || "N/A"}</h4>
                  <p>{selectedMarineTraffic?.type_name || "N/A"}</p>
                </span>
              </div>
            </div>
            <div className='mt_ship_img'>
              <img
                src={`https://www.marinetraffic.com/photoCollection/getAssetDefaultPhoto?asset_id=${selectedMarineTraffic.ship_id}&asset_type_id=0&photo_size=300`}
                alt="ship image"
                onError={handleImageError}
              />
            </div>
            <div className='mtCardTime'>
              <h4><b>ATD:</b> {selectedMarineTraffic?.timestamp || "N/A"}</h4>
              <h4><b>ETA:</b> {selectedMarineTraffic?.eta || "N/A"}</h4>
            </div>
            <div className="mtCardDetails">
              <span className='span1'>
                <p>Ship Name</p>
                <p>Vessels Type</p>
                <p>Destination</p>
                <p>Call Sign</p>
                <p>MMSI</p>
                <p>IMO</p>
                <p>Speed / Course</p>
                <p>Heading</p>
                <p>Status</p>
                <p>Year Built</p>
              </span>
              <span>
                <p className='detail'>{selectedMarineTraffic?.shipname || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.type_name || "N/A"}</p>
                <p className='detail' >{selectedMarineTraffic?.destination || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.callsign || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.mmsi || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.imo || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.speed || "N/A"} / {selectedMarineTraffic.course}</p>
                <p className='detail'>{selectedMarineTraffic?.heading || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.status || "N/A"}</p>
                <p className='detail'>{selectedMarineTraffic?.year_built || "N/A"}</p>
              </span>
            </div>

            <div className='mtBtnBox'>
              <Link className='btnHistory' to={'/fleet/map/marinetraffic-vessel-details'} state={{ vessel: item }}>Vessel Details</Link>
              <button className={`${measurementMode ? 'bg-[#EB5454]' : 'bg-[#0DB0E6]'}`} onClick={toggleMeasurementMode}>
                {measurementMode ? 'Stop Measurement' : 'Start Measurement'}
              </button>
            </div>
          </div>
        </Draggable>
      )}

      {/* Show polyline for measurement */}
      {measurementCoordinates.length > 1 && selectedMarineTraffic && selectedMarineTraffic.id === item.id && (
        <Polyline positions={measurementCoordinates} color="#FFC100" />
      )}

      {/* Show dots for each measurement point */}
      {measurementCoordinates.map((coordinate, idx) => (
        <Marker key={`measurement-dot-${idx}`} position={coordinate} icon={MarineTrafficIconMeasure}>
          <Tooltip>{`Distance: ${(calculateMeasurementDistance(measurementCoordinates.slice(0, idx + 1))).toFixed(2)} NM`}</Tooltip>
        </Marker>
      ))}
    </>
  );
};

export default MarineTrafficMarker;
