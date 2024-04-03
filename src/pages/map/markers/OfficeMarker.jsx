/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef , useState} from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import officeIcon from '../../../assets/icon/offices.svg'
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";

export default function OfficeMarker ({ item, index, selectedOffice,  handleOfficeMarkerClick }){
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.latitude, item.longitude];

  const [showSelectedInfo, setShowSelectedInfo] = useState(true);

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    const isSameOffice = selectedOffice && selectedOffice.id === item.id;
    if (!isSameOffice) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 12, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handleOfficeMarkerClick(isSameOffice ? null : item);
  };

  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleOfficeMarkerClick(null);
    map.setView([item.latitude, item.longitude], prevZoomRef.current);
  };

  const handleDrag = (e) => { 
    e.stopPropagation();
  };

 
  return(
    <Marker 
        key={`cargo-${index}`} 
              position={[item.latitude, item.longitude]}
              icon={
                  L.divIcon({
                    className: `office-marker ${ selectedOffice && selectedOffice.id === item.id ? 'selected-office' : ""}`,
                    html: `<img src="${officeIcon}" alt="" />`,
                  })
                }

                eventHandlers={{
                  click: handleMarkerClick
                }}
                
              >
                {showSelectedInfo &&  selectedOffice && selectedOffice.id === item.id && (
                       <Draggable onDrag={handleDrag}>
                       <div className="officeCardContainer">
                           <div className="officeCardHeader">
                              <img src={officeIcon} alt="" />
                              <h3>Offices</h3>
                             <IoCloseSharp className='officeClose' onClick={() => handleCloseButtonClick()} />
                           </div>
                           <div className="officeCardDetail">
                              <span className='span1'>
                                 <p>Office Name</p>
                                 <p>Address</p>
                              </span>

                              <span>
                                 <p>{selectedOffice?.office_name || "N/A"}</p>
                                <p>{selectedOffice.office_address || "N/A"}</p>
                              </span>
                           </div>
             
                        </div>
                        </Draggable>
                      )}
            

            </Marker>
  )
}