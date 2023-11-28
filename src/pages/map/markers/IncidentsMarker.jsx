/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import incidentImg from '../../../assets/incident.svg'


const OfficeMarker = ({ item, index, selectedIncident, handleIncidentMarkerClick }) => (
    <Marker 
        key={`cargo-${index}`} 
              position={[item.glatitude_incident, item.glongitude_incident]}
              icon={
                  L.divIcon({
                    className: `office-marker`,
                    html: `<div class="incident-icon" >
                    <img src="${incidentImg}" alt="" />
                    </div>`,
                  })
                }

                eventHandlers={{
                  click: () => {
                    handleIncidentMarkerClick(item);
                  }
                }}
                
              >
                <Popup>
                {selectedIncident && selectedIncident.incident_code === item.incident_code && (
                        <div className="popup_card">
                          <h2>Incidents</h2>
                          <p>Address: {selectedIncident.address_incident}</p>
                        </div>
                      )}
              </Popup>
            

            </Marker>
);

export default OfficeMarker;
