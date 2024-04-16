import { useLocation} from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import OfficeMarker from './OfficeMarker';

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.office;
  return (
    <div className='officesProfileContainer'>
       <div className="officesDetails">
            <h2>Office Details</h2>

            <span>
               <h4>Office Name</h4>
                <p>{item?.office_name || "N/A"}</p>
            </span>

            <span>
               <h4>Office Code</h4>
                <p>{item?.office_code || "N/A"}</p>
            </span>

            <span>
               <h4>Office Address</h4>
                <p>{item?.office_address || "N/A"}</p>
            </span>

            <span>
               <h4>Camp Base</h4>
                <p>{item?.camp_base || "N/A"}</p>
            </span>

            <span>
               <h4>Latitude</h4>
                <p>{item?.latitude || "N/A"}° N</p>
            </span>

            <span>
               <h4>Longitude</h4>
                <p>{item?.longitude|| "N/A"}° E</p>
            </span>
       </div>

       <div className="officesMapContainer">
         <h2>Location</h2>
         <div className="officeMapBox">
         <MapContainer zoomControl={false}  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%'}}>
              <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
              <OfficeMarker selectedOffice={item} />
            </MapContainer>
         </div>
       </div>
    </div>
  )
}
