/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import personnelImg from '../../../assets/personnel.svg';
import onDutyImg from '../../../assets/duty.svg';
import onLeaveImg from '../../../assets/leave.svg';
import rnrImg from '../../../assets/rnr.svg';
import nonUniformImg from '../../../assets/non-uniform.svg';

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


const PersonnelMarker = ({ item, index, selectedPersonnel, handlePersonnelMarkerClick, showAllUsernames }) => {
  const statusImage = getStatusImage(item.personal_details.status_name);

  return (
    <Marker
      key={`cargo-${index}`}
      position={[item.glatitude, item.glongitude]}
      icon={
        L.divIcon({
          className: `personnel-marker`,
          html: `<div class="personnel-icon" >
          ${showAllUsernames ? `<p class="">${item.username}</p>` : ''}
                    <img src="${statusImage}" alt="" />
                  </div>`,
        })
      }
      eventHandlers={{
        click: () => {
          handlePersonnelMarkerClick(item);
        },
      }}
    >
      <Popup>
        {selectedPersonnel && selectedPersonnel.user === item.user && (
          <div className="popup_card">
            <h2>Personnel</h2>
            <p>Username: <span>{selectedPersonnel.username}</span></p>
            {/* Add more personnel information properties here */}
          </div>
        )}
      </Popup>
    </Marker>
  );
};

export default PersonnelMarker;
