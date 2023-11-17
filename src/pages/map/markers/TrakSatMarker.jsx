/* eslint-disable react/prop-types */
// src/components/TrakSatMarker.js
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const TrakSatMarker = ({ item, selectedTrakSat, showDescription, handleTrakSatMarkerClick }) => {
  if (item.glatitude !== null && item.glongitude !== null) {
    let iconHtml;

    if (item.heading_deg !== null) {
      iconHtml = `<div style="transform: rotate(${item.heading_deg}deg);"><img src='https://traksat.net/i/arrow1.png' alt="" /></div>`;
    } else {
      iconHtml = '<div class="circle-marker"></div>';
    }

    return (
      <Marker
        position={[item.glatitude, item.glongitude]}
        icon={L.divIcon({
          className: `traksat-marker ${selectedTrakSat && selectedTrakSat.asset_id === item.asset_id ? 'selected-marker-traksat' : ''}`,
          html: `
            ${iconHtml}
            ${showDescription ? `<div class="text-[9px] mr-16  text-white bg-blue-500  border  p-1 absolute">
              ${item.description}
            </div>` : `<div></div>` }
          `,
        })}
        eventHandlers={{
          click: () => handleTrakSatMarkerClick(item),
        }}
      >
        <Popup>
          {selectedTrakSat && selectedTrakSat.description === item.description && (
            <div className="card">
              <h2>Traksat</h2>
              <p>Description: <span>{selectedTrakSat.description}</span></p>
              <p>Group: <span>{selectedTrakSat.group}</span></p>
              <p>Last gps: <span>{selectedTrakSat.last_gps_gmt}</span></p>
              <p>Lat: <span>{selectedTrakSat.latitude}</span></p>
              <p>Lon: <span>{selectedTrakSat.longitude}</span></p>
              <p>Speed kph: <span>{selectedTrakSat.speed_kph}</span></p>
              <p>Heading: <span>{selectedTrakSat.heading}</span></p>
              <p>Heading deg: <span>{selectedTrakSat.heading_deg}&#xb0;</span></p>
            </div>
          )}
        </Popup>
      </Marker>
    );
  }
  return null; // Skip rendering the marker if latitude or longitude is null
};

export default TrakSatMarker;
