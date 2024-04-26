/* eslint-disable react/prop-types */
import L from 'leaflet';
import personnelImg from '../../../assets/icon/personnel.svg';
import onDutyImg from '../../../assets/icon/personnel_on_duty.svg';
import onLeaveImg from '../../../assets/icon/personnel_on_leave.svg';
import rnrImg from '../../../assets/icon/personnel_rnr.svg';
import nonUniformImg from '../../../assets/icon/personnel_non_uniform.svg';
import { Marker, useMap } from 'react-leaflet';

const getStatusImage = (status_name) => {
  switch (status_name) {
    case 'On-Duty':
      return onDutyImg;
    case 'On-Leave':
      return onLeaveImg;
    case 'Rest and Recreation':
        return rnrImg;
    case 'non-uniform':
        return nonUniformImg;
    default:
      return personnelImg;
  }
};


const PersonnelMarker = ({ selectedPersonnel }) => {
  const map = useMap();

  // Skip rendering the marker if selectedPersonnel is null or personal_details is null, or glatitude/glongitude is null
  if (!selectedPersonnel || !selectedPersonnel.personal_details || selectedPersonnel.glatitude === null || selectedPersonnel.glongitude === null) {
    return null;
  }
  
  const statusImage = getStatusImage(selectedPersonnel.personal_details.status_name);
  let startPosition = [selectedPersonnel.glatitude, selectedPersonnel.glongitude];

  // Check if the latitude and longitude are valid
  if (!isNaN(startPosition[0]) && !isNaN(startPosition[1])) {
    // Fly to the marker position if it's defined
    map.flyTo(startPosition, 12, {
      duration: 2, // Adjust duration as needed (in seconds)
      easeLinearity: 0.25 // Adjust ease linearity as needed
    });
  } else {
    // If latitude or longitude is invalid, return null to skip rendering the marker
    return null;
  }

  return (
    <Marker
      position={startPosition}
      icon={
        L.divIcon({
          className: `personnel-marker ${selectedPersonnel && selectedPersonnel.id === selectedPersonnel.id ? 'selected-personnel' : ""}`,
          html: `<div class="bgwhite-marker"><img src="${statusImage}" alt="" /></div>`,
        })
      }
    />
  );
};

export default PersonnelMarker;

