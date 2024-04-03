/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Marker, Popup, Polyline, CircleMarker, useMapEvent, useMap } from 'react-leaflet';
import L from 'leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";
import defaultImage from '../.././../assets/no-image.png'
import marinetrafficIcon from '../../../assets/icon/marinetraffic.svg'

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

const MarineTrafficMarker = ({ item, index, selectedMarineTraffic, handleMarineTrafficMarkerClick }) => {
  const [endPosition, setEndPosition] = useState([0, 0]); // Default values or any valid initial coordinates
  const [showDistance, setShowDistance] = useState(false);
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  const map = useMap();
  const prevZoomRef = useRef(9);

const handleCloseButtonClick = () => {
  handleMarineTrafficMarkerClick(null);
  setShowSelectedInfo(false);
  setShowDistance(false)
  map.setView([item.glatitude, item.glongitude], prevZoomRef.current);
};


// const handleMarkerClick = () => {
//   setShowSelectedInfo(true);
//   prevZoomRef.current = map.getZoom();
//   map.flyTo(startPosition, 10);
//   handleMarineTrafficMarkerClick(item);

// };

const handleMarkerClick = () => {
  setShowSelectedInfo(true);
  prevZoomRef.current = map.getZoom();
  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });
  handleMarineTrafficMarkerClick(item);
};





  const startPosition = [item.glatitude, item.glongitude];


  useMapEvent({
    click: (e) => {
      // Check if the "Measurement" mode is active
      if (showDistance) { 
        setEndPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  

  const distance = calculateDistance(
    startPosition?.[0],
    startPosition?.[1],
    endPosition?.[0],
    endPosition?.[1]
  );
  
  const handleDrag = (e) => {
    // Prevent event propagation to the map
    e.stopPropagation();
  };

  const handleImageError = (event) => {
    event.target.onerror = null; // Prevent infinite loop in case defaultImage fails to load
    event.target.src = defaultImage;
  };
  

  return (
    <>
    <Marker
        key={`cargo-${index}`}
        position={startPosition}
        icon={
          L.divIcon({
            className: `marinetraffic-marker ${selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id ? 'selected-marker' : ''}`,
            html: `<img src="${marinetrafficIcon}"  alt="Marine Traffic Icon" style="transform: rotate(${item.course}deg); width:20px;" />`,
          })
        }
        eventHandlers={{
          click: handleMarkerClick
        }}
      >
      </Marker>

      


      { showSelectedInfo && selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id && (
      <Draggable onDrag={handleDrag}>
          <div className="mtCardContainer" >
           <div className="mtCardHeader">
             <div className="mtCardTop">
                <img src={marinetrafficIcon} alt="" />
                <h3>MarineTraffic</h3>
                <IoCloseSharp className="mtClose" onClick={() => handleCloseButtonClick()}/>
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

             {/* <img src={`https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=${selectedMarineTraffic.ship_id}&size=thumb300`} alt="ship image" /> */}
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
        <button className={`${showDistance ? 'bg-[#EB5454]' : 'bg-[#0DB0E6]'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
              </button>
              {showDistance && (
                <p className='text-center'>
                  Please <b>Point</b> on the map! <br />
                  double <b>click </b>the point to show the distance
                 
                </p>
              )}
        </div>
  </div>
      </Draggable>
)}

      {showDistance && endPosition && (
        <Polyline positions={[startPosition, endPosition]} color="yellow">
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
          <CircleMarker center={endPosition} radius={6} color="yellow" />
        </Polyline>
      )}
    </>
  );
};

export default MarineTrafficMarker;
