/* eslint-disable react/prop-types */
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import traksat1Icon from '../../../assets/icon/traksat_1.svg';
import traksat2Icon from '../../../assets/icon/traksat_2.svg';

const TrakSatMarker = ({ selectedVessel }) => {
  const map = useMap();

  let startPosition; // Define startPosition here

  if (!selectedVessel || selectedVessel.glatitude === null || selectedVessel.glongitude === null) {
    return null; // Skip rendering the marker if selectedVessel is null or latitude/longitude is null
  }

  startPosition = [selectedVessel.glatitude , selectedVessel.glongitude]; // Define startPosition here

  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });

  let iconHtml;

  if (selectedVessel.heading_deg !== null) {
    iconHtml = `<div class="bgdark-marker"><img src="${traksat1Icon}" style="transform: rotate(${selectedVessel.course}deg);" /></div>`;
  } else {
    iconHtml = `<div class="bgdark-marker"><img src="${traksat2Icon}" style="transform: rotate(${selectedVessel.course}deg);" /></div>`;
  }

  return (
    <Marker
      position={startPosition}
      icon={L.divIcon({
        className: `traksat-marker ${selectedVessel && selectedVessel.id ? 'selected-traksat' : ''}`,
        html: `${iconHtml}`
      })}
    />
  );
};

export default TrakSatMarker;
