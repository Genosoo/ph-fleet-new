/* eslint-disable react/prop-types */
import L from 'leaflet';
import vehiclesImg from '../../../assets/icon/vehicles.svg'
import { useRef, useState } from 'react';
import { Marker,  useMap } from 'react-leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";

export default function VehiclesMarker ({ item, index, selectedVehicles, handleVehiclesMarkerClick }){
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.latitude, item.longitude];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    const isSamePerson = selectedVehicles && selectedVehicles.id === item.id;
    if (!isSamePerson) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 12, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handleVehiclesMarkerClick(isSamePerson ? null : item);
  };

  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleVehiclesMarkerClick(null);
    map.setView([item.latitude, item.longitude], prevZoomRef.current);
  };

  const handleDrag = (e) => {
    e.stopPropagation();
  };


 return(
  <Marker 
  key={`cargo-${index}`} 
        position={[item.latitude, item.longitude]}
        icon={
            L.divIcon({
              className: `vehicles-marker ${selectedVehicles && selectedVehicles.id === item.id ? 'selected-vehicles' : ""}`,
              html: `<div class="bgwhite-marker">
              <img src="${vehiclesImg}" alt="" />
              </div>`,
            })
          }
          eventHandlers={{
            click: handleMarkerClick
          }}
          
        >
          {showSelectedInfo && selectedVehicles && selectedVehicles.id === item.id && (
           <Draggable onDrag={handleDrag}>
               <div className="vehicleCardContainer">
                <div className="vehicleCardHeader">
                    <img src={vehiclesImg} alt="" />
                    <h3>Vehicles</h3>
                     <IoCloseSharp className='vehicleClose' onClick={() => handleCloseButtonClick()} />
                </div>
                  <div className="vehicleCardDetail">
                      <span className='span1'>
                          <p>Name</p>
                          <p>Code</p>
                          <p>Type</p>
                          <p>Office Name</p>
                          <p>Office Address</p>
                      </span>
                      <span>
                        <p>{selectedVehicles?.vehicle_name || "N/A"}</p>
                        <p>{selectedVehicles?.vehicle_code || "N/A"}</p>
                        <p>{selectedVehicles?.vehicle_type || "N/A"}</p>
                        <p>{selectedVehicles?.office_details?.office_name || "N/A"}</p>
                        <p>{selectedVehicles?.office_details?.office_address || "N/A"}</p>
                      </span>
                  </div>
                  </div>
              </Draggable>
                )}
      </Marker>
 )
}
   

