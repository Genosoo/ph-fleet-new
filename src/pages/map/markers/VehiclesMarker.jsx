/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import vehiclesImg from '../../../assets/vehicle.svg'


const PersonnelMarker = ({ item, index, selectedVehicles, handleVehiclesMarkerClick }) => (
    <Marker 
        key={`cargo-${index}`} 
              position={[item.latitude, item.longitude]}
              icon={
                  L.divIcon({
                    className: `personnel-marker`,
                    html: `<div class="vehicle-icon" >
                    <img src="${vehiclesImg}" alt="" />
                    </div>`,
                  })
                }
                eventHandlers={{
                  click: () => {
                    handleVehiclesMarkerClick(item);
                  }
                }}
                
              >
                <Popup>
                {selectedVehicles && selectedVehicles.vehicle_code === item.vehicle_code && (
                        <div className="popup_card">
                          <h2>Vehicles</h2>
                          <p>Name: {selectedVehicles.vehicle_name}</p>
                        </div>
                      )}
              </Popup>
            

            </Marker>
);

export default PersonnelMarker;
