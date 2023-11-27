/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import campImg from '../../../assets/camp.svg'


const OfficeMarker = ({ item, index }) => (
    <Marker 
        key={`cargo-${index}`} 
              position={[item.latitude, item.longitude]}
              icon={
                  L.divIcon({
                    className: `office-marker`,
                    html: `<div class="office-icon" >
                    <p>${item.office_name !== null ? item.office_name : ''}</p>
                    <img src="${campImg}" alt="" />
                    </div>`,
                  })
                }
                
              >
                {/* <Popup>
                {selectedPersonnel && selectedPersonnel.user === item.user && (
                        <div className="popup_card">
                          <h2>Personnel</h2>
                          <p>Username: <span>{selectedPersonnel.username}</span></p>
                          <p>Lat: <span>{selectedPersonnel.latitude}</span></p>
                          <p>Lon: <span>{selectedPersonnel.longitude}</span></p>
                        </div>
                      )}
              </Popup>
             */}

            </Marker>
);

export default OfficeMarker;
