/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Marker, Popup, Polyline, CircleMarker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { CgCloseO } from "react-icons/cg";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  const R = 3440.065; // Radius of the Earth in nautical miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in nautical miles
  return distance;
};

const MarineTrafficMarker = ({ item, index, selectedMarineTraffic, handleMarineTrafficMarkerClick }) => {
  const [endPosition, setEndPosition] = useState([0, 0]); // Default values or any valid initial coordinates
  const [showDistance, setShowDistance] = useState(false);
// Add a state variable to manage the visibility of the selected information
const [showSelectedInfo, setShowSelectedInfo] = useState(true);

const handleCloseButtonClick = () => {
  handleMarineTrafficMarkerClick(null);
  setShowSelectedInfo(false);
  setShowDistance(false)
};


  const startPosition = [item.glatitude, item.glongitude];

  useMapEvent({
    click: (e) => {
      // Set the endPosition to the clicked coordinates
      setEndPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const distance = calculateDistance(
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1]
  );

  return (
    <>
      <Marker
        key={`cargo-${index}`}
        position={startPosition}
        icon={
          L.divIcon({
            className: `marine-marker ${
              selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id ? 'selected-marker' : ''
            }`,
            html: `<div class="glow-marker" style="transform: rotate(${item.course}deg);">🢙</div>`,
          })
        }
        eventHandlers={{
          click: () => {
            handleMarineTrafficMarkerClick(item);
          },
        }}
      >
        {/* <Popup>
          {selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id && (
            <div className="">
        <h2>MarineTraffic</h2>
        <p >Ship Name: <span>{selectedMarineTraffic.shipname}</span></p>
        <p>Ship Name: <span>{selectedMarineTraffic.shiptype}</span></p>
        <p>Ship ID: <span>{selectedMarineTraffic.ship_id}</span> </p>
        <p>MMSI: <span>{selectedMarineTraffic.mmsi}</span></p>
        <p>IMO: <span>{selectedMarineTraffic.imo}</span></p>
        <p>Speed: <span>{selectedMarineTraffic.speed}</span></p>
        <p>Heading: <span>{selectedMarineTraffic.heading}</span></p>
        <p>Course: <span>{selectedMarineTraffic.course}</span></p>
        <p>Status: <span>{selectedMarineTraffic.status}</span></p>
        <p>Flag: <span>{selectedMarineTraffic.flag}</span></p>
        <p>Coordinates: <span>{selectedMarineTraffic.latitude}, {selectedMarineTraffic.longitude}</span></p>

        <div className='flex flex-col'>
        <button className={`text-sm p-3 rounded-[10px] text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
              </button>
              {showDistance && (
                <p className='text-center'>
                  Please <b>Point</b> on the map! <br />
                  double <b>click </b>the point to show the distance
                  Distance: {distance != null ? distance.toFixed(2) + ' nautical miles' : 'N/A'}
                </p>
              )}
        </div>
            </div>
          )}
        </Popup> */}
      </Marker>


      { showSelectedInfo && selectedMarineTraffic && selectedMarineTraffic.ship_id === item.ship_id && (
        <div className="mt_card_container">
           <div className="mt_card_header">
           <div className='mt_box_flag'>
            {selectedMarineTraffic.flag && (
              <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/flags/4x3/${selectedMarineTraffic.flag.toLowerCase()}.svg`} alt="" />
            )}
                <p className="">
                  <span>{selectedMarineTraffic.ais_type_summary} Vessel</span>
                <small>{selectedMarineTraffic.type_name}</small>
                </p>
            </div>

            <div className="icon">
              <CgCloseO onClick={() => handleCloseButtonClick()}/>
            </div>
           </div>
           <div className='mt_ship_img'>
           <img src={`https://www.marinetraffic.com/photoCollection/getAssetDefaultPhoto?asset_id=${selectedMarineTraffic.ship_id}&asset_type_id=0&photo_size=300`} alt="ship image" />

             {/* <img src={`https://photos.marinetraffic.com/ais/showphoto.aspx?shipid=${selectedMarineTraffic.ship_id}&size=thumb300`} alt="ship image" /> */}
           </div>
            <div className='flex justify-between p-2 bg-white'>
              <h4><b>ATD:</b> {selectedMarineTraffic.timestamp}</h4>
              <h4><b>ETA:</b> {selectedMarineTraffic.eta}</h4>
            </div>
            <div className="mt_card_details">
                  <div className="card_p">
                      <p>
                        <span className="title">Ship Name</span> 
                        <span className='detail'>{selectedMarineTraffic.shipname}</span>
                      </p>
                      <p>
                        <span className="title">Vessels Type</span> 
                        <span className='detail'>{selectedMarineTraffic.type_name}</span>
                      </p>
                      <p>
                        <span className="title">Destination</span>
                        <span className='detail' >{selectedMarineTraffic.destination}</span>
                      </p>
                      <p>
                        <span className="title">Call Sign </span>
                        <span className='detail'>{selectedMarineTraffic.callsign}</span>
                      </p>
                      <p>
                        <span className="title">MMSI</span>
                        <span className='detail'>{selectedMarineTraffic.mmsi}</span>
                      </p>
                      <p>
                        <span className="title">IMO</span>
                        <span className='detail'>{selectedMarineTraffic.imo}</span>
                      </p>
                      <p>
                         <span className="title">Speed / Course </span>
                         <span className='detail'>{selectedMarineTraffic.speed} / {selectedMarineTraffic.course}</span>
                      </p>
                      <p>
                        <span className="title">Heading</span> 
                        <span className='detail'>{selectedMarineTraffic.heading}</span>
                      </p>
                      <p>
                        <span className="title">Status </span>
                        <span className='detail'>{selectedMarineTraffic.status}</span>
                      </p>
                      <p>
                        <span className="title">Year Built</span>
                        <span className='detail'>{selectedMarineTraffic.year_built}</span>
                      </p>
                     
                  </div>
            </div> 
    <div className='mt_btn_box'>
        <button className={`text-sm p-1 rounded-[5px] text-white ${showDistance ? 'bg-red-600' : 'bg-green-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Measurement'}
              </button>
              {showDistance && (
                <p className='text-center'>
                  Please <b>Point</b> on the map! <br />
                  double <b>click </b>the point to show the distance
                 
                </p>
              )}
        </div>
  </div>
)}

      {showDistance && endPosition && (
        <Polyline positions={[startPosition, endPosition]} color="yellow">
          {distance != null && (
            <Popup>
             <div className='flex flex-col gap-5'>
             <h1 className='text-base'>{`Distance: ${distance.toFixed(2)} nautical miles`}</h1>
             {/* <button className={`text-sm  p-2 text-white ${showDistance ? 'bg-red-600' : 'bg-yellow-600'}`} onClick={() => setShowDistance(!showDistance)}>
                {showDistance ? 'Stop Measurement' : 'Start Measurement'}
              </button> */}
             </div>
             </Popup>
            
          )}
          <CircleMarker center={endPosition} radius={6} color="yellow" />
        </Polyline>
      )}
    </>
  );
};

export default MarineTrafficMarker;
