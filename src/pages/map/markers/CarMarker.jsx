/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import carIcon from '../../../assets/icon/cartrack.svg'
import { useRef, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";

export default function CarMarker ({ item, index, selectedCarTrack, handleCarTrackMarker }){
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.location.latitude, item.location.longitude];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);


  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    const isSamePerson = selectedCarTrack && selectedCarTrack.id === item.id;
    if (!isSamePerson) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 12, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handleCarTrackMarker(isSamePerson ? null : item);
  };

  
  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleCarTrackMarker(null);
    map.setView([item.location.latitude, item.location.longitude], prevZoomRef.current);
  };

  const handleDrag = (e) => { 
    e.stopPropagation();
  };


  return (
    <Marker 
    key={`cargo-${index}`} 
          position={[item.location.latitude, item.location.longitude]}
          icon={
              L.divIcon({
                className: ``,
                html: `<div class="bgwhite-marker"><img src="${carIcon}" alt="" />
                </div>`,
              })
            }
            eventHandlers={{
              click: handleMarkerClick
            }}
            
          >
            {showSelectedInfo && selectedCarTrack && selectedCarTrack.id === item.id && (
              <Draggable onDrag={handleDrag}>
                    <div className="carCardContainer">
                      <div className="carCardHeader">
                      <img src={carIcon} alt="" />
                          <h3>Cartrack</h3>
                          <IoCloseSharp className='carClose' onClick={() => handleCloseButtonClick()} />
                      </div>

                      <div className="carCardDetail">
                          <span className='span1'>
                              <p>Vehicle ID</p>
                              <p>Chassis number</p>
                              <p>Altitude</p>
                              <p>Address</p>
                              <p>Bearing</p>
                              <p>Odometer</p>
                              <p>Speed</p>
                              <p>Road Speed</p>
                              <p>Registration</p>
                          </span>
                          <span>
                            <p>{selectedCarTrack?.vehicle_id ||  "N/A" }</p>
                            <p>{selectedCarTrack?.chassis_number ||  "N/A"}</p>
                            <p>{selectedCarTrack?.altitude ||  "N/A"}</p>
                            <p>{selectedCarTrack?.location?.position_description ||  "N/A"}</p>
                            <p>{selectedCarTrack?.bearing ||  "N/A"}</p>
                            <p>{selectedCarTrack?.odometer ||  "N/A"}</p>
                            <p>{selectedCarTrack?.speed ||  "N/A"}</p>
                            <p>{selectedCarTrack?.road_speed ||  "N/A"}</p>
                            <p>{selectedCarTrack?.registration ||  "N/A"}</p>
                          </span>
                      </div>
                    </div>
                 </Draggable>
                  )}
        </Marker>
  )
}
   

