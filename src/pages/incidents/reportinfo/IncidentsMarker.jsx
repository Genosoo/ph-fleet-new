/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import incidentImg from '../../../assets/icon/incidents.svg'
import { useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

   

export default function IncidentMarker ({ selectedIncident }){
  const map = useMap();

  let startPosition;

  if (!selectedIncident || selectedIncident.glatitude_incident === null || selectedIncident.glongitude_incident === null) {
    return null; // Skip rendering the marker if selectedIncident is null or latitude/longitude is null
  }

  startPosition = [selectedIncident.glatitude_incident, selectedIncident.glongitude_incident];
  
  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });

 
 


   return (
    <Marker position={[selectedIncident.glatitude_incident, selectedIncident.glongitude_incident]}
          icon={
              L.divIcon({
                className: `incident-marker ${selectedIncident && selectedIncident.id === selectedIncident.id ? 'selected-incident' : ""}`,
                html: `<div class="bgwhite-marker"><img src="${incidentImg}" alt="" /></div>`,
              })
            }
            
          >
        </Marker>
   )
}




