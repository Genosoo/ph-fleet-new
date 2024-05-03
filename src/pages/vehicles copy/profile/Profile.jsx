import { useLocation} from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import VehiclesMarker from './VehiclesMarker';

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.vehicle;
  return (
    <div className='officesProfileContainer'>
       <div className="officesDetails">
            <h2>Vehicle Details</h2>

            <span>
               <h4>Vehicle Name</h4>
                <p>{item?.vehicle_name || "N/A"}</p>
            </span>

            <span>
               <h4>Vehicle Code</h4>
                <p>{item?.vehicle_code || "N/A"}</p>
            </span>

            
            <span>
               <h4>Office Name</h4>
                <p>{item?.office_details.office_name || "N/A"}</p>
            </span>

            <span>
               <h4>Office Address</h4>
                <p>{item?.office_details.office_address || "N/A"}</p>
            </span>

            <span>
               <h4>Unit</h4>
                <p>{item?.unit_details?.unit_name || "N/A"}</p>
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
              <VehiclesMarker selectedVehicle={item} />
            </MapContainer>
         </div>
       </div>
    </div>
  )
}
