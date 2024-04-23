/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';

import marinetrafficIcon from '../../../assets/icon/marinetraffic.svg';
import routeIcon from '../../../assets/icon/routeIcon.svg';

const routeIconMarker = L.icon({
  iconSize: [40, 40],
  iconUrl: routeIcon // Assuming routeIcon is the correct path to your icon
});

const MarineTrafficMarker = ({ selectedMarineTraffic}) => {
  const map = useMap();
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    if (selectedMarineTraffic && selectedMarineTraffic.glatitude !== null && selectedMarineTraffic.glongitude !== null) {
      const startPosition = [selectedMarineTraffic.glatitude, selectedMarineTraffic.glongitude];
      map.flyTo(startPosition, 8, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
  }, [selectedMarineTraffic, map]);

  if (!selectedMarineTraffic || selectedMarineTraffic.glatitude === null || selectedMarineTraffic.glongitude === null) {
    return null; // Skip rendering the marker if selectedMarineTraffic is null or latitude/longitude is null
  }

  const startPosition = [selectedMarineTraffic.glatitude, selectedMarineTraffic.glongitude];

  const routeCoordinates = [
    [selectedMarineTraffic.glatitude, selectedMarineTraffic.glongitude], // Start position
    [13.580196375259849, 120.97969990933063],
    [13.659806136638561, 120.49602222243372],
    [13.931404450747653, 120.36395760469937],
    [14.22527581186985, 119.88231017589119 ],
    [14.443266422398112, 119.82347059543605],

  ];

  // Extract the last point from routeCoordinates
  const lastPoint = routeCoordinates[routeCoordinates.length - 1];

  const handleStartRoute = () => {
    setShowRoute(!showRoute);
  };

  return (
    <>
      <Marker
        position={startPosition} // Set position to startPosition
        icon={
          L.divIcon({
            className: `marinetraffic-marker ${selectedMarineTraffic && selectedMarineTraffic.ship_id ? 'selected-marinetraffic' : ''}`,
            html: `<div class="bgdark-marker">
              <img src="${marinetrafficIcon}"  alt="Marine Traffic Icon" style="transform: rotate(${selectedMarineTraffic.course}deg); " />
            </div>`,
          })
        }
      />
      {showRoute && (
        <>
          <Polyline positions={routeCoordinates} color="#FFC100" />
          {/* Render a marker only for the last point */}
          <Marker
          position={lastPoint}
          icon={routeIconMarker} >
            <Tooltip>
                This is a test for Route Forecast 
            </Tooltip>
          </Marker>
      
        </>
      )}
      <button className={`btnRoute ${showRoute ? 'hideRoute' : 'showRoute'}`} onClick={handleStartRoute}>
        {showRoute ? 'Stop Route Forecast' : 'Route Forecast'}
      </button>
    </>
  );
};

export default MarineTrafficMarker;
