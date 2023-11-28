/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Marker, Popup, Polyline, CircleMarker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

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

  const startPosition = [item.glatitude, item.glongitude];

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

  return (
    <>
      <Marker
        key={`cargo-${index}`}
        position={startPosition}
        icon={
          L.divIcon({
            className: `marine-marker ${
              selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id ? 'selected-marker' : ''
            }`,
            html: `<div class="glow-marker" style="transform: rotate(${item.course}deg);">🢙</div>`,
          })
        }
        eventHandlers={{
          click: () => {
            handleMarineTrafficMarkerClick(item);
          },
        }}
      >
        <Popup>
          {selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id && (
            <div className="">
        <h2>MarineTraffic</h2>
        <p >Ship Name: <span>{selectedMarineTraffic.shipname}</span></p>
        <p>Ship Name: <span>{selectedMarineTraffic.shiptype}</span></p>
        <p>Ship ID: <span>{selectedMarineTraffic.ship_id}</span> </p>
        <p>MMSI: <span>{selectedMarineTraffic.mmsi}</span></p>
        <p>IMO: <span>{selectedMarineTraffic.imo}</span></p>
        <p>Speed: <span>{selectedMarineTraffic.speed}</span></p>
        <p>Heading: <span>{selectedMarineTraffic.heading}</span></p>
        <p>Course: <span>{selectedMarineTraffic.course}</span></p>
        <p>Status: <span>{selectedMarineTraffic.status}</span></p>
        <p>Flag: <span>{selectedMarineTraffic.flag}</span></p>
        <p>Coordinates: <span>{selectedMarineTraffic.latitude}, {selectedMarineTraffic.longitude}</span></p>

        <div className='flex flex-col'>
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
        </Popup>
      </Marker>
      {showDistance && endPosition && (
        <Polyline positions={[startPosition, endPosition]} color="yellow">
          {distance != null && (
            <Popup>
             <div className='flex flex-col gap-5'>
             <h1 className='text-base'>{`Distance: ${distance.toFixed(2)} nautical miles`}</h1>
             <button className={`text-sm  p-2 text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
              </button>
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
