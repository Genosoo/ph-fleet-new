/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const MarineTrafficMarker = ({ selectedVessel }) => {
  const map = useMap();

  // Check if selectedVessel is null or undefined
  if (!selectedVessel || !selectedVessel.traksat_details) {
    return null; // Render nothing if selectedVessel or traksat_details is null or undefined
  }

  const { glatitude, glongitude, course} = selectedVessel.traksat_details;

  // Check if glatitude and glongitude are null or undefined
  if (glatitude === null || glongitude === null) {
    return null; // Render nothing if glatitude or glongitude is null or undefined
  }

  const startPosition = [glatitude, glongitude];

  // Fly to the item's start position
  map.flyTo(startPosition);

  return (
    <>
      <Marker
        position={startPosition}
        icon={
          L.divIcon({
            className: `marine-marker selected-marker text-yellow-200`,
            html: `<div class="glow-marker" style="transform: rotate(${course}deg);">🢙</div>`,
          })
        }
      />
    </>
  );
};

export default MarineTrafficMarker;
