/* eslint-disable react/prop-types */
import L from 'leaflet';
import userImg from '../../../assets/user.png'
import personnelImg from '../../../assets/icon/personnel.svg';
import onDutyImg from '../../../assets/icon/personnel_on_duty.svg';
import onLeaveImg from '../../../assets/icon/personnel_on_leave.svg';
import rnrImg from '../../../assets/icon/personnel_rnr.svg';
import nonUniformImg from '../../../assets/icon/personnel_non_uniform.svg';
import { useRef, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { IoCloseSharp } from "react-icons/io5";
import Draggable from 'react-draggable';

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
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude, item.glongitude];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);



  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    const isSamePerson = selectedPersonnel && selectedPersonnel.id === item.id;
    if (!isSamePerson) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 12, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handlePersonnelMarkerClick(isSamePerson ? null : item);
  };

  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handlePersonnelMarkerClick(null);
    map.setView([item.glatitude, item.glongitude], prevZoomRef.current);
  };

  const handleDrag = (e) => {
    e.stopPropagation();
  };

  return (
    <Marker
      key={`cargo-${index}`}
      position={[item.glatitude, item.glongitude]}
      icon={
        L.divIcon({
          className: `personnel-marker ${selectedPersonnel && selectedPersonnel.id === item.id ? 'selected-personnel' : ""}`,
          html: `<div class="personnel-icon" >
          ${showAllUsernames ? `<p class="">${item.username}</p>` : ''}
                    <img src="${statusImage}" alt="" />
                  </div>`,
        })
      }
      eventHandlers={{ click: handleMarkerClick} }
    >
        {showSelectedInfo && selectedPersonnel && selectedPersonnel.id === item.id && (
           <Draggable onDrag={handleDrag}>
          <div className="personnelCardContainer">
             <div className="personnelCardHeader">
                  <img src={personnelImg} alt="" />
                  <h3>Personnel</h3>
                <IoCloseSharp className='personnelClose' onClick={() => handleCloseButtonClick()} />
              </div>

              <div className="personnelImgBox">
                 <img src={userImg} alt="user image" />
              </div>

              <div className="personnelCardDetail">
                 <span className='span1'>
                   <p>Username</p>
                   <p>Last Name</p>
                   <p>First Name</p>
                   <p>Status</p>
                   <p>Rank</p>
                   <p>Unit</p>
                   {/* <p>Address</p> */}
                 </span>
                 <span>
                  <p>{selectedPersonnel?.username || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.last_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.first_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.status_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.rank_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.unit_name || "N/A"}</p>
                   {/* <p>{selectedPersonnel?.address || "N/A"}</p> */}
                 </span>
              </div>
           
          </div>
          </Draggable>
        )}
    </Marker>
  );
};

export default PersonnelMarker;
