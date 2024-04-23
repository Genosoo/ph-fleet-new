import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/incident/no-incident-image.svg'
import IncidentMarker from './IncidentsMarker';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default function ReportInfo() {
  const location = useLocation();
  console.log({location});

  const item = location.state.incident;
  const username = item?.user_details?.username || "N/A";
  const reporter = item?.user_details?.personal_details || "N/A";


  return (
    <div className='reportInfoContainer'>
        <div className="reportInfoWrapper">
            <div className="reportInfoBox reportInfoBox1">
                <span>
                    <h3>Incident Type</h3>
                    <p>{item?.type_details?.type_name || "N/A"}</p>
                </span>

                <span>
                    <h3>Incident Address</h3>
                    <p>{item?.address_incident || "N/A"}</p>
                </span>

                <span>
                    <h3>Incident Description</h3>
                    <p className='desc'>{item?.incident_details || "N/A"}</p>
                </span>
            </div>
            <div className="reportInfoBox reportInfoBox2">
            <span>
                <h3>Reporter</h3>
                <p className='desc'>
                <img
                    src={`${baseUrl}${reporter?.image}`}
                    alt="Reporter"
                    onError={(e) => {
                        e.target.src = noImage; // Set the default image source here
                    }}
                 />{username}</p>
            </span>

            <span>
                <h3>Reporter Address</h3>
                <p>{item?.address_reported || "N/A"}</p>
            </span>
        </div>
        </div>


        <div className="reportInfoWrapper2">
            <div className="reportInfoBox reportInfoBox3">
                <h3>Incident Image</h3>
                <img  src={`${baseUrl}${item.incident_image}`} alt="image"   onError={(e) => {
                    e.target.src = noImage
                }} />
            </div>

            <div className="reportInfoBox reportInfoBox4">
                <h3>Incident Location</h3>
                <div className="reportInfoMap">
                <MapContainer zoomControl={false}  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%'}}>
                        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                        <IncidentMarker selectedIncident={item} />
                    </MapContainer>
               </div>
            </div>
        </div>

       
    </div>
  )
}
