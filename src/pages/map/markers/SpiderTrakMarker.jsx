/* eslint-disable react/prop-types */
// src/components/SpiderTrakMarker.js
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const SpiderTrakMarker = ({ item, selectedSpiderTrak, showSpiderTrakDesc, handleSpiderTrack }) => {
  if (item.glatitude !== null && item.glongitude !== null) {
    return (
      <Marker
        position={[item.glatitude, item.glongitude]}
        icon={
          L.divIcon({
            className: `spidertrak-marker`,
            html: `<div class="glow-marker-traksat">🛨</div>
            ${showSpiderTrakDesc ? `<div class="text-[9px] mr-16  text-white bg-blue-500  border  p-1 absolute">
            ${item.unit_id}</div>` : `<div></div>` }`,
          })
        }
        eventHandlers={{
          click: () => handleSpiderTrack(item),
        }}
      >
        <Popup>
          {selectedSpiderTrak && (
            <div className="card">
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
