import { useLocation } from "react-router-dom"
import defaultImage from '../.././../assets/no-image.png';
import "./VesselsInfo.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarineTrafficMarker from "./MarineTrafficMarker";
import { apiMarineTrafficHistory } from "../../../api/api_urls";

export default function VesselsInfo() {
  const location = useLocation()
  const item = location.state?.vessel;
  const [address, setAddress] = useState('');
  const [historyData, setHistoryData] = useState([])

 console.log(historyData)
 console.log(location)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${item.glatitude}&lon=${item.glongitude}&format=json`
        );

        const response2 = await axios.get(`${apiMarineTrafficHistory}?mmsi=${item.mmsi}`);
        const limitedData = response2.data.success;
        setHistoryData(limitedData);
        console.log(limitedData)

        if (response.data) {
          setAddress(response.data.display_name);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      }
    };

    fetchData();

  }, []);



  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = defaultImage;

    
  };

  return (
    <div className="vesselsInfoContainer">
       <div className="vesselsInfoWrapper">
       <div className="vesselsInfoHeader">
           <div className="vesselsInfoHeaderBox">
           <img className="flag" src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/flags/4x3/${item?.flag.toLowerCase()}.svg`} alt=""
            onError={handleImageError}
        />
          <span>
            <h2>{item?.shipname || "N/A"}</h2>
            <h3>{item?.type_name || "N/A"}</h3>
            <p>IMO: {item?.imo || "N/A"}</p>
          </span>
           </div>

          <img className="vesselsImage" 
            src={`https://www.marinetraffic.com/photoCollection/getAssetDefaultPhoto?asset_id=${item.ship_id}&asset_type_id=0&photo_size=800`}
            alt="ship image"
            onError={handleImageError}
          />
       </div>

       <div className="vesselsInfoDetails">
            <h3>Vessel Details</h3>
            <span>
               <h4>Name</h4>
               <p>{item?.shipname || "N/A"}</p>
            </span>

            <span>
               <h4>IMO</h4>
               <p>{item?.imo || "N/A"}</p>
            </span>

            <span>
               <h4>MMSI</h4>
               <p>{item?.mmsi || "N/A"}</p>
            </span>

            <span>
               <h4>Callsign</h4>
               <p>{item?.callsign || "N/A"}</p>
            </span>

            <span>
               <h4>Speed</h4>
               <p>{item?.speed || "N/A"} kn</p>
            </span>

            <span>
               <h4>Course</h4>
               <p>{item?.course || "N/A"} °</p>
            </span>

            <span>
               <h4>True Heading</h4>
               <p>{item?.heading || "N/A"} °</p>
            </span>

            <span>
               <h4>Draught</h4>
               <p>{item?.draught || "N/A"} m</p>
            </span>

            <span>
               <h4>Coordinates</h4>
               <p>{item?.glatitude || "N/A"}, {item?.glongitude || "N/A"}</p>
            </span>
       </div>
       </div>

       <div className="vesselsInfoWrapper2">
        <div className="vesselsInfoBox">
              <h3>Summary</h3>

              <span>
                <h4>Where is the ship?</h4>
                <p>{item?.type_name || "N/A"} {item?.ais_type_summary  || "N/A"} <b>{item?.shipname || "N/A"}</b> is currently located at <b>{address}</b></p>
              </span>

              <span>
                <h4>What kind of ship is this?</h4>
                <p>{item?.shipname || "N/A"} (IMO: {item?.imo || "N/A"}) is a <b>{item?.type_name || "N/A"} {item?.ais_type_summary  || "N/A"} </b>. The length overall (LOA) is {item.length} meters and the width is {item.width} meters.</p>
              </span>
          </div>

        <div className="vesselsInfoBox2">
          <h3>Location</h3>
          <div className="vesselsInfoMap">
            <MapContainer zoomControl={false}  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%'}}>
                <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                <MarineTrafficMarker selectedMarineTraffic={item}/>
           </MapContainer>
          </div>
        </div>
       </div>

    
    </div>
  )
}
