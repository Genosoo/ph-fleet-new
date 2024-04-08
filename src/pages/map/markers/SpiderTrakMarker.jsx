/* eslint-disable react/prop-types */
// src/components/SpiderTrakMarker.js
import { Marker,  useMap } from 'react-leaflet';
import { useRef, useState } from 'react';
import L from 'leaflet';
import { IoCloseSharp } from "react-icons/io5";
import './MarkerStyle.css'
import Draggable from 'react-draggable';

import spidertrack1Icon from '../../../assets/icon/airplane.svg'
import spidertrack2Icon from '../../../assets/icon/helicopter.svg'


const SpiderTrakMarker = ({ item, selectedSpiderTrak, showSpiderTrakDesc, handleSpiderTrack }) => {
  const map = useMap();
  const prevZoomRef = useRef(9);
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);

  const startPosition = [item.glatitude, item.glongitude];

  const handleMarkerClick = () => {
  setShowSelectedInfo(true);
    prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 12, {
      duration: 2, // Adjust duration as needed (in seconds)
      easeLinearity: 0.25 // Adjust ease linearity as needed
    });
    handleSpiderTrack(item);
  };


  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleSpiderTrack(null);
    map.setView([item.glatitude, item.glongitude], prevZoomRef.current);
  };

  const handleDrag = (e) => {
    // Prevent event propagation to the map
    e.stopPropagation();
  };
  
  if (item.glatitude !== null && item.glongitude !== null) {
    // Check if the unit_id is "NH434" to set the helicopter icon
    const iconUrl = item.unit_id === 'NH434' ? spidertrack2Icon : spidertrack1Icon;

    return (
     <>
      <Marker
        position={[item.glatitude, item.glongitude]}
        icon={
          L.divIcon({
            className: `spidertrak-marker ${ selectedSpiderTrak && selectedSpiderTrak.unit_id === item.unit_id ? 'selected-spidertrak' : ""  } `,
            html: ` <div class="relative">
            <div class="bgdark-marker"><img src="${iconUrl}" style="transform: rotate(${item.cog}deg); width:50px; " /></div>
            ${showSpiderTrakDesc ? `<span class="spidertracks_name">${item.unit_id}</span>` : `<div></div>` }
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
               <img src={spidertrack1Icon} alt="" />
               <img src={spidertrack2Icon} alt="" />
              <h3 className="stCardTitle">Spidertracks</h3>
              <div className='stClose'>
                 <IoCloseSharp onClick={() => handleCloseButtonClick()} />
              </div>
            </div>
            <div className="stCardDetail">
              <span className='span1'>
                 <p>Aircraft</p>
                 <p>Track ID</p>
                 <p>Altitude</p>
                 <p>Fix</p>
                 <p>Source</p>
                 <p>Latitude</p>
                 <p>Longitude</p>
              </span>
              <span>
                 <p>{selectedSpiderTrak?.unit_id || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.track_id || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.altitude || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.fix || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.src || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.glatitude || 'N/A'}</p>
                 <p>{selectedSpiderTrak?.glongitude || 'N/A'}</p>
              </span>
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
