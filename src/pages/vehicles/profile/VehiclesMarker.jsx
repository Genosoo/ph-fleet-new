/* eslint-disable react/prop-types */
import L from 'leaflet';
import vehiclesImg from '../../../assets/icon/vehicles.svg'
import { Marker, useMap } from 'react-leaflet';

export default function VehiclesMarker ({  selectedVehicle }){
  const map = useMap();


  let startPosition;

  if (!selectedVehicle || selectedVehicle.latitude === null || selectedVehicle.longitude === null) {
    return null; // Skip rendering the marker if selectedVehicle is null or latitude/longitude is null
  }

  startPosition = [selectedVehicle.latitude, selectedVehicle.longitude];
  
  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });


 return(
  <Marker 
        position={[selectedVehicle.latitude, selectedVehicle.longitude]}
        icon={
            L.divIcon({
              className: `vehicles-marker ${selectedVehicle && selectedVehicle.id === selectedVehicle.id ? 'selected-vehicles' : ""}`,
              html: `<div class="bgwhite-marker">
              <img src="${vehiclesImg}" alt="" />
              </div>`,
            })
          }
        >
      </Marker>
 )
}
   

