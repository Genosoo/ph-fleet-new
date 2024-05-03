import "./AircraftsProfile.css"
import { useLocation} from 'react-router-dom';
import { Image } from 'antd';
import { baseUrl } from "../../../api/api_urls";
import { MapContainer, TileLayer } from 'react-leaflet';
import SpiderTrakMarker from './SpiderTrakMarker';
import noImage from '../../../assets/no-aircraft.png'

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.aircraft;
  return (
    <div className="aircraftProfileContainer">
      <div className="aircraftProfileWrapper">
          <div className="aircraftProfileBoxWrapper">
            <h2>Aircraft Profile</h2>
            <div className="aircraftProfileBox1">
              <div className="aircraftProfilePhotoBox">
              {item && item.image_main ? (
                          <Image src={`${baseUrl}${item.image_main}`} alt=""
                          onError={(e) => {
                            e.target.src = noImage; 
                        }}  />
                        ) : (
                          <Image src={noImage} alt="" />
                        )}
                </div>

                <span>
                  <h3>{item?.aircraft_name || "N/A"}</h3>
                  <p>{item?.aircraft_type_details?.type_name || "N/A"}</p>
                  <h4>{item?.aircraft_status_details?.status_name || "N/A"}</h4>
                </span>

            </div>
          </div>
      
         


            <div className="aircraftProfileBoxWrapper3">
                <h2>Aircraft Details</h2>
                <div className="aircraftProfileBox3">
                  <span>
                        <h3>Unit ID</h3>
                        <p>{item?.unit_id2 || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Name</h3>
                        <p>{item?.aircraft_name || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Type</h3>
                        <p>{item?.aircraft_type_details?.type_name || "N/A"}</p>
                  </span>
              
                  <span>
                        <h3>Crew</h3>
                        <p>{item?.crew || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Fuel Capacity</h3>
                        <p>{item?.fuel_capacity || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Length</h3>
                        <p>{item?.length || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Height</h3>
                        <p>{item?.height || "N/A"}</p>
                  </span>

                  <span>
                        <h3>Wing Area</h3>
                        <p>{item?.wing_area || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Wing Empty Weight</h3>
                        <p>{item?.wingempty_weight || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Wing Span</h3>
                        <p>{item?.wingspan || "N/A"}</p>
                  </span>
              
                  <span>
                        <h3>Maximum speed</h3>
                        <p>{item?.maximum_speed || "N/A"}</p>
                  </span>

                  <span>
                        <h3>Maximum Take Off Weight</h3>
                        <p>{item?.max_take_off_weight || "N/A"}</p>
                  </span>
                 
                </div>
            </div>

      </div>


      <div className="aircraftProfileWrapper">

      <div className="aircraftProfileBoxWrapper2">
                <h2>Perspectives</h2>
                <div className="aircraftProfileBox2">
                    <div className="aircraftProfileImageCardFlex">
                    <div className="aircraftProfileImageCard">
                        <p>Front View</p>
                        {item && item.image_front ? (
                          <Image   src={`${baseUrl}${item.image_front}`} alt="" />
                        ) : (
                          <Image  src={noImage} alt="" />
                        )}
                    </div>

                    <div className="aircraftProfileImageCard">
                        <p>Back View</p>
                        {item && item.image_back ? (
                          <Image src={`${baseUrl}${item.image_back}`} alt="" />
                        ) : (
                          <Image src={noImage} alt="" />
                        )}
                    </div>
                    </div>
                    
                    <div className="aircraftProfileImageCardFlex">
                    <div className="aircraftProfileImageCard">
                        <p>Right Side View</p>
                        {item && item.image_right ? (
                          <Image   src={`${baseUrl}${item.image_right}`} alt="" />
                        ) : (
                          <Image  src={noImage} alt="" />
                        )}
                    </div>

                    <div className="aircraftProfileImageCard">
                        <p>Left Side View</p>
                        {item && item.image_left ? (
                          <Image src={`${baseUrl}${item.image_left}`} alt="" />
                        ) : (
                          <Image src={noImage} alt="" />
                        )}
                    </div>
                    </div>
                </div>
            </div>
        <div className="aircraftProfileBoxWrapper4">
          <h2>Location</h2>
             <div className="aircraftProfileBox4">
             <MapContainer  zoomControl={false} center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
               <SpiderTrakMarker selectedAircraft={item.spidertracks_details} />
             </MapContainer>
             </div>
        </div>
      </div>
    </div>
  )
}
