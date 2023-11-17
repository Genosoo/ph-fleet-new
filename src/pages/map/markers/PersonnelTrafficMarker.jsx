/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import personnelImg from '../../../assets/personnel.svg'


const PersonnelMarker = ({ item, index, selectedPersonnel, handlePersonnelMarkerClick }) => (
    <Marker 
              key={`cargo-${index}`} 
              position={[item.glatitude, item.glongitude]}
              icon={
                  L.divIcon({
                    className: `personnel-marker`,
                    html: `<div class="personnel-icon" ><img src="${personnelImg}" alt="" /></div>`,
                  })
                }
                eventHandlers={{
                  click: () => {
                    handlePersonnelMarkerClick(item);
                  }
                }}
                
              >
                <Popup>
                {selectedPersonnel && selectedPersonnel.user === item.user && (
                        <div className="card">
                          <h2>Personnel</h2>
                          <p>Username: <span>{selectedPersonnel.username}</span></p>
                          <p>Lat: <span>{selectedPersonnel.latitude}</span></p>
                          <p>Lon: <span>{selectedPersonnel.longitude}</span></p>
                          {/* Add more vessel information properties here */}
                        </div>
                      )}
              </Popup>
            

            </Marker>
);

export default PersonnelMarker;
