/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import campImg from '../../../assets/camp.svg'


const OfficeMarker = ({ item, index, selectedOffice,  handleOfficeMarkerClick }) => (
    <Marker 
        key={`cargo-${index}`} 
              position={[item.latitude, item.longitude]}
              icon={
                  L.divIcon({
                    className: `office-marker`,
                    html: `<div class="office-icon" >
                    <img src="${campImg}" alt="" />
                    </div>`,
                  })
                }

                eventHandlers={{
                  click: () => {
                    handleOfficeMarkerClick(item);
                  }
                }}
                
              >
                <Popup>
                {selectedOffice && selectedOffice.user === item.user && (
                        <div className="">
                          <h2>Office Name: <b>{selectedOffice.office_name}</b></h2>
                          <h2>Address: <b>{selectedOffice.office_address}</b></h2>
                        </div>
                      )}
              </Popup>
            

            </Marker>
);

export default OfficeMarker;
