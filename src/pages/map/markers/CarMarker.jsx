/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import vehiclesImg from '../../../assets/car.svg'


const CarMarker = ({ item, index, selectedCarTrack, handleCarTrackMarker }) => (
    <Marker 
        key={`cargo-${index}`} 
              position={[item.location.latitude, item.location.longitude]}
              icon={
                  L.divIcon({
                    className: `car-marker`,
                    html: `<div class="vehicle-icon" >
                    <img src="${vehiclesImg}" alt="" />
                    </div>`,
                  })
                }
                eventHandlers={{
                  click: () => {
                    handleCarTrackMarker(item);
                  }
                }}
                
              >
                <Popup>
                {selectedCarTrack && selectedCarTrack.chassis_number === item.chassis_number && (
                        <div className="popup_card">
                          <h2>Car Track</h2>
                          <p>Vehicle ID: {selectedCarTrack.vehicle_id ?? "--" }</p>
                          <p>Chassis number: {selectedCarTrack.chassis_number ?? "--"}</p>
                          <p>Altitude: {selectedCarTrack.altitude ?? "--"}</p>
                          <p>Address: {selectedCarTrack.location.position_description ?? "--"}</p>
                          <p>Bearing: {selectedCarTrack.bearing ?? "--"}</p>
                          <p>Odometer: {selectedCarTrack.odometer ?? "--"}</p>
                          <p>Speed: {selectedCarTrack.speed ?? "--"}</p>
                          <p>Roed Speed: {selectedCarTrack.road_speed ?? "--"}</p>
                          <p>Registration: {selectedCarTrack.registration ?? "--"}</p>
                        </div>
                      )}
              </Popup>
            

            </Marker>
);

export default CarMarker;
