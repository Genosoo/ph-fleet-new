/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import officeIcon from '../../../assets/icon/offices.svg'


export default function OfficeMarker ({ selectedOffice }){
  const map = useMap();


  let startPosition;

  if (!selectedOffice || selectedOffice.latitude === null || selectedOffice.longitude === null) {
    return null; // Skip rendering the marker if selectedOffice is null or latitude/longitude is null
  }

  startPosition = [selectedOffice.latitude, selectedOffice.longitude];
  
  map.flyTo(startPosition, 12, {
    duration: 2, // Adjust duration as needed (in seconds)
    easeLinearity: 0.25 // Adjust ease linearity as needed
  });

 

  return(
    <Marker 
              position={[selectedOffice.latitude, selectedOffice.longitude]}
              icon={
                  L.divIcon({
                    className: `office-marker ${selectedOffice && selectedOffice.id === selectedOffice.id ? 'selected-office' : ""}`,
                    html: `<div class="bgwhite-marker"><img src="${officeIcon}" alt="" /></div>`,
                  })
                }
              >
            </Marker>
  )
}