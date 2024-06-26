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
import { baseUrl } from '../../../api/api_urls';

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


const PersonnelMarker = ({ item, index, selectedPersonnel, handlePersonnelMarkerClick, showAllUsernames}) => {
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
      map.flyTo(startPosition, 9, {
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
          html: `<div class="bgwhite-marker"><img src="${statusImage}" alt="" /></div>
          ${showAllUsernames ?  `<p class="showPersonnelUsername">${item.username}</p> `: `<p></p>`}`,
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
                 <img src={`${baseUrl}${selectedPersonnel.personal_details.image}`} alt="user image" 
                   onError={(e) => {
                    e.target.src = userImg; // Set the default image source here
                }}
                 />
              </div>

             <div className="personnelCardDetailWrapper">
             <div className="personnelCardDetail">
                 <span className='span1'>
                   <p>Serial Number</p>
                   <p>Username</p>
                   <p>Last Name</p>
                   <p>First Name</p>
                   <p>Email</p>
                   <p>Mobile Number</p>
                   <p>gender</p>
                   <p>Height</p>
                   <p>Weight</p>
                   <p>BMI</p>
                   <p>Status</p>
                   <p>Rank</p>
                 </span>
                 <span>
                  <p>{selectedPersonnel?.personal_details?.serial_number|| "N/A"}</p>
                  <p>{selectedPersonnel?.username || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.last_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.first_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.email || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.mobile_number || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.gender || "N/A"}</p>
                  <p>{selectedPersonnel?.height || "N/A"}</p>
                  <p>{selectedPersonnel?.weight || "N/A"}</p>
                  <p>{selectedPersonnel?.bmi || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.status_name || "N/A"}</p>
                  <p>{selectedPersonnel?.personal_details?.rank_name || "N/A"}</p>
                 </span>

              
              </div>

              <div className="personnelCardDetail2">
              <div className='personnelCard2'>
                 <p className=' font-bold'>Unit</p>
                 <p>{selectedPersonnel?.personal_details?.unit_name || "N/A"}</p>
              </div>

              <div className='personnelCard2'>
                 <p className=' font-bold'>Office</p>
                 <p>{selectedPersonnel?.personal_details?.office_name || "N/A"}</p>
              </div>

              <div className='personnelCard2'>
                 <p className=' font-bold'>Address</p>
                 <p>{selectedPersonnel?.address || "N/A"}</p>
              </div>
              </div>
             </div>
              
          </div>
          </Draggable>
        )}
    </Marker>
  );
};

export default PersonnelMarker;
