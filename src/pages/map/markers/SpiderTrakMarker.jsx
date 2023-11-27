/* eslint-disable react/prop-types */
// src/components/SpiderTrakMarker.js
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import the image files
import helicopterIcon from '../../../assets/helicopter.svg';
import airplaneIcon from '../../../assets/airplane.svg';

const SpiderTrakMarker = ({ item, selectedSpiderTrak, showSpiderTrakDesc, handleSpiderTrack }) => {
  if (item.glatitude !== null && item.glongitude !== null) {
    // Check if the unit_id is "NH434" to set the helicopter icon
    const iconUrl = item.unit_id === 'NH434' ? helicopterIcon : airplaneIcon;

    return (
      <Marker
        position={[item.glatitude, item.glongitude]}
        icon={
          L.divIcon({
            className: 'spidertrak-marker',
            html: `<div class="spiderTrak-container">
            ${showSpiderTrakDesc ? `<span class="spiderTrak-text">${item.unit_id}</span>` : `<div></div>` }
            <div style="transform: rotate(${item.cog}deg);" class="spiderTrak-icon"><img src="${iconUrl}" alt="Icon" /></div>
            </div>
            `,
          })
        }
        eventHandlers={{
          click: () => handleSpiderTrack(item),
        }}
      >
        <Popup>
          {selectedSpiderTrak && (
            <div className="">
              <p >Aircraft: <span>{selectedSpiderTrak.unit_id}</span></p>
              <p >Track ID: <span>{selectedSpiderTrak.track_id}</span></p>
              <p >Altitude: <span>{selectedSpiderTrak.altitude}</span></p>
              <p >Fix: <span>{selectedSpiderTrak.fix}</span></p>
              <p >Source: <span>{selectedSpiderTrak.src}</span></p>
              <p >Latitude: <span>{selectedSpiderTrak.glatitude}</span></p>
              <p >Longitude: <span>{selectedSpiderTrak.glongitude}</span></p>
            </div>
          )}
        </Popup>
      </Marker>
    );
  }
  return null; // Skip rendering the marker if latitude or longitude is null
};

export default SpiderTrakMarker;
