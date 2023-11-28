/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MarineTrafficMarker = ({ item, index, selectedMarineTraffic, handleMarineTrafficMarkerClick }) => (
    <Marker 
    key={`cargo-${index}`} 
    position={[item.glatitude, item.glongitude]}
    icon={
        L.divIcon({
          className: `marine-marker ${selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id ? 'selected-marker' : ''}`,
          html: `<div class="glow-marker" style="transform: rotate(${item.course}deg);">🢙</div>`,
        })
      }
      eventHandlers={{
        click: () => {
          handleMarineTrafficMarkerClick(item);
        }
      }}
      
    >
      <Popup>
    {selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id &&  (
      <div className="popup_card">
        <h2>MarineTraffic</h2>
        <p >Ship Name: <span>{selectedMarineTraffic.shipname}</span></p>
        <p>Ship Name: <span>{selectedMarineTraffic.shiptype}</span></p>
        <p>Ship ID: <span>{selectedMarineTraffic.ship_id}</span> </p>
        <p>MMSI: <span>{selectedMarineTraffic.mmsi}</span></p>
        <p>IMO: <span>{selectedMarineTraffic.imo}</span></p>
        <p>Coordinates: <span>{selectedMarineTraffic.latitude}, {selectedMarineTraffic.longitude}</span></p>
        <p>Speed: <span>{selectedMarineTraffic.speed}</span></p>
        <p>Heading: <span>{selectedMarineTraffic.heading}</span></p>
        <p>Course: <span>{selectedMarineTraffic.course}</span></p>
        <p>Status: <span>{selectedMarineTraffic.status}</span></p>
        <p>Flag: <span>{selectedMarineTraffic.flag}</span></p>

      </div>
    )}
    </Popup>
  </Marker>
);

export default MarineTrafficMarker;
