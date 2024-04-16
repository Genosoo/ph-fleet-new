import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import IncidentMarker from './IncidentsMarker';
import noImage from '../../../assets/incident/no-incident-image.svg'


export default function ReportInfo() {
    const location = useLocation();
    console.log({location});

  const item = location.state.incident;
    const reporter = item?.user_details?.personal_details || "N/A";
  const username = item?.user_details?.username || "N/A";
  
  return (
    <div className='reportIncidentInfoContainer'>
        <div className='reportIncidentInfoWrapper'>
            <div className="reportIncidentInfoBox1">
                <p className='infoTitle'>Incident Image</p>
                <img  src={`${baseUrl}${item.incident_image}`} alt="image"   onError={(e) => {
                        e.target.src = noImage; // Set the default image source here
                    }} />
            </div>

            <div className="reportIncidentInfoBox2">
                 <p className='infoTitle'>Incident Location</p>
               <div className="reportIncidentInfoMap">
                <MapContainer zoomControl={false}  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%'}}>
                        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                        <IncidentMarker selectedIncident={item} />
                    </MapContainer>
               </div>
            </div>
        </div>

        <div className="reportIncidentInfoWrapper2">
             <div className="reportIncidentInfoDetailBox">
                <div className="reportIncidentDetailCard">
                    <h3 className='infoTitle'>Incident Description</h3>
                    <p>{item?.incident_details || "N/A"}</p>
                </div>

                <div className="reportIncidentDetailCard">
                    <h3 className='infoTitle'>Incident Type</h3>
                    <p>{item?.type_details?.type_name || "N/A"}</p>
                   
                </div>

                <div className="reportIncidentDetailCard">
                    <h3 className='infoTitle'>Incident Address</h3>
                    <p>{item?.address_incident || "N/A"}</p>
                </div>
             </div>
        </div>

        <div className="reportIncidentInfoWrapper3">
              <div className='reportIncidentInfoBoxReporter'>
                  <p className='infoTitle'>Reporter</p>

                 <div className="reportIncidentBox">
                 <img
                    src={`${baseUrl}${reporter?.image}`}
                    alt="Reporter"
                    onError={(e) => {
                        e.target.src = noImage; // Set the default image source here
                    }}
                 />

                 </div>

                 <div className='reportIncidentCardInfo'>
                    <p className=''>Name</p>
                     <h3>{username}</h3>
                 </div>

                 <div className='reportIncidentCardInfo'>
                    <p className=''>Reporter Address</p>
                     <h3>{item?.address_reported || "N/A"}</h3>
                 </div>
              </div>
        </div>
    </div>
  )
}
