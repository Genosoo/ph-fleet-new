/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import incidentImg from '../../../assets/icon/incidents.svg';
import { useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Draggable from 'react-draggable';
   

export default function IncidentMarker ({ item, index, selectedIncident, handleIncidentMarkerClick }){
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude_incident, item.glongitude_incident];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  
  console.log('item:', item)
 

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    const isSameIncident = selectedIncident && selectedIncident.id === item.id;
    if (!isSameIncident) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 9, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handleIncidentMarkerClick(isSameIncident ? null : item);
  }; 
 

  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleIncidentMarkerClick(null);
    map.setView([item.glatitude_incident, item.glongitude_incident], prevZoomRef.current);
  };

  const handleDrag = (e) => {
    e.stopPropagation();
  };

   return (
    <Marker  key={`incidents-${index}`}  position={[item.glatitude_incident, item.glongitude_incident]}
          icon={
              L.divIcon({
                className: `incident-marker ${selectedIncident && selectedIncident.id === item.id ? 'selected-incident' : ""}`,
                html: `<div class="bgwhite-marker"><img src="${incidentImg}" alt="" /></div>`,
              })
            }

            eventHandlers={{
              click:handleMarkerClick 
            }}
            
          >
            {showSelectedInfo && selectedIncident && selectedIncident.id === item.id && (
            <Draggable onDrag={handleDrag}>
                    <div className="incidentCardContainer">
                      <div className="incidentCardHeader">
                         <img src={incidentImg} alt="" />
                         <h3>Incidents</h3>
                        <IoCloseSharp className='incidentClose' onClick={() => handleCloseButtonClick()} />
                      </div>

                      <div className="incidentCardDetail">
                          <span className='span1'>
                            <p>Name</p>
                            <p>Details</p>
                            <p>Severity</p>
                            <p>Type</p>
                            <p>Status</p>
                            
                          </span>

                          <span>
                          <p>{selectedIncident?.incident_name || "N/A"}</p> 
                          <p>{selectedIncident?.incident_details || "N/A"}</p>
                          <p>{selectedIncident?.severity_details?.severity_name || "N/A"}</p>
                          <p>{selectedIncident?.type_details?.type_name || "N/A"}</p>
                          <p>{selectedIncident?.status_details?.type_status || "N/A"}</p>
                        
                          </span>
                      </div>
                          <div className="incidentLocation">
                          <h3>Incident Address</h3>
                          <p>{selectedIncident?.address_incident || "N/A"}</p>

                            <h3>Incident Reported</h3>
                          <p>{selectedIncident?.address_reported || "N/A"}</p>
                          </div>
                    </div>
                    </Draggable>
                  )}
        

        </Marker>
   )
}




