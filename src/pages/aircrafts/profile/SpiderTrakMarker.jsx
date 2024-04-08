/* eslint-disable react/prop-types */
// src/components/SpiderTrakMarker.js
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

import spidertrack1Icon from '../../../assets/icon/airplane.svg';
import spidertrack2Icon from '../../../assets/icon/helicopter.svg';

const SpiderTrakMarker = ({ selectedAircraft }) => {
  const map = useMap();

  if (!selectedAircraft || selectedAircraft.glatitude === null || selectedAircraft.glongitude === null) {
    return null; // Skip rendering the marker if selectedAircraft is null or latitude/longitude is null
  }

  const startPosition = [selectedAircraft.glatitude, selectedAircraft.glongitude];

  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });

  // Check if the unit_id is "NH434" to set the helicopter icon
  const iconUrl = selectedAircraft.unit_id === 'NH434' ? spidertrack2Icon : spidertrack1Icon;

  return (
    <>
      <Marker
        position={[selectedAircraft.glatitude, selectedAircraft.glongitude]}
        icon={
          L.divIcon({
            className: `spidertrak-marker ${selectedAircraft && selectedAircraft.unit_id === selectedAircraft.unit_id ? 'selected-spidertrak' : ""}`,
            html: `<div class="bgdark-marker"><img src="${iconUrl}" style="transform: rotate(${selectedAircraft.cog}deg) " /></div>`
          })
        }
      >
      </Marker>
    </>
  );
};

export default SpiderTrakMarker;
