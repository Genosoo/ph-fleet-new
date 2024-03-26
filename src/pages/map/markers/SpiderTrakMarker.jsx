/* eslint-disable react/prop-types */
// src/components/SpiderTrakMarker.js
import { Marker,  useMap } from 'react-leaflet';
import { useRef, useState } from 'react';
import L from 'leaflet';
import { IoCloseSharp } from "react-icons/io5";
import './MarkerStyle.css'
import Draggable from 'react-draggable';

// Import the image files
import helicopterIcon from '../../../assets/helicopter.svg';
import airplaneIcon from '../../../assets/airplane.svg';

const SpiderTrakMarker = ({ item, selectedSpiderTrak, showSpiderTrakDesc, handleSpiderTrack }) => {
  const map = useMap();
  const prevZoomRef = useRef(9);
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);

  const startPosition = [item.glatitude, item.glongitude];

  const handleMarkerClick = () => {
  setShowSelectedInfo(true);
    prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 10);
    handleSpiderTrack(item);
  };


  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleSpiderTrack(null);
  map.flyTo([item.glatitude, item.glongitude], prevZoomRef.current);

  };

  const handleDrag = (e) => {
    // Prevent event propagation to the map
    e.stopPropagation();
  };
  
  if (item.glatitude !== null && item.glongitude !== null) {
    // Check if the unit_id is "NH434" to set the helicopter icon
    const iconUrl = item.unit_id === 'NH434' ? helicopterIcon : airplaneIcon;

    return (
     <>
      <Marker
        position={[item.glatitude, item.glongitude]}
        icon={
          L.divIcon({
            className: `spidertrak-marker ${ selectedSpiderTrak && selectedSpiderTrak.unit_id === item.unit_id ? 'selected-spidertrak' : ""  } `,
            html: `<div class="relative">
            ${showSpiderTrakDesc ? `<span class="text-[9px] top-2 w-[60px]  text-center left-8 text-black font-bold rounded-[10px] bg-lime-400   absolute">${item.unit_id}</span>` : `<div></div>` }
            <div style="transform: rotate(${item.cog}deg);" class="spiderTrak-icon"><img src="${iconUrl}" alt="Icon" /></div>
            </div>
            `,
          })
        }
        eventHandlers={{
          click:handleMarkerClick
        }}
      >
      </Marker>
      {showSelectedInfo && selectedSpiderTrak && selectedSpiderTrak.unit_id === item.unit_id && (
       <Draggable onDrag={handleDrag}>
      <div className="stCardContainer">
            <div className="stCardHeader">
              <h3 className="stCardTitle">SpiderTrak</h3>
              <div className='stClose'>
                 <IoCloseSharp onClick={() => handleCloseButtonClick()} />
              </div>
            </div>
            <div className="stCardDetail">
              <p >Aircraft: <span>{selectedSpiderTrak.unit_id}</span></p>
              <p >Track ID: <span>{selectedSpiderTrak.track_id}</span></p>
              <p >Altitude: <span>{selectedSpiderTrak.altitude}</span></p>
              <p >Fix: <span>{selectedSpiderTrak.fix}</span></p>
              <p >Source: <span>{selectedSpiderTrak.src}</span></p>
              <p >Latitude: <span>{selectedSpiderTrak.glatitude}</span></p>
              <p >Longitude: <span>{selectedSpiderTrak.glongitude}</span></p>
            </div>
        </div>
        </Draggable>
      ) }
     </>
    );
  }
  return null; // Skip rendering the marker if latitude or longitude is null
};

export default SpiderTrakMarker;
