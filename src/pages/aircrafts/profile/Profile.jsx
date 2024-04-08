import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-aircraft.png'
import { MapContainer, TileLayer } from 'react-leaflet';
import SpiderTrakMarker from './SpiderTrakMarker';

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.aircraft;


  return (
    <div className='aircraftsProfileContainer'>
       <div className="aircraftsProfileBox1">
         <h4 className='aircraftsProfileTitle'>Aircraft Profile</h4>
         <div className="aircraftsProfileInitial">
          {item && item.image_main ? ( // Check if personal_details and image are not null
              <img className='aircraftsProfilePhoto' src={`${baseUrl}${item.image_main}`} alt="" />
            ) : (
              <img className='aircraftsProfilePhoto' src={noImage} alt="" />
            )}


            <div className="textBoxWrapper">
              <div className='textBox1 textBox'>
              <span>
                    <p>Unit ID</p>
                    <h3>{item?.unit_id2 || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Name</p>
                    <h3>{item?.aircraft_name || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Unit</p>
                    <h3>{item?.unit_details?.unit_name || "N/A"}</h3>
                  </span>
              </div>
              <div className='textBox3 textBox'>
                  <span>
                    <p>Type</p>
                    <h3>{item?.aircraft_type_details?.type_name || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Fuel Capacity</p>
                    <h3>{item?.fuel_capacity || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Maximum speed</p>
                    <h3>{item?.maximum_speed || "N/A"}</h3>
                  </span>
              </div>
              <div className='textBox3 textBox'>
                  <span>
                    <p>Crew</p>
                    <h3>{item?.crew || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Payload</p>
                    <h3>{item?.payload || "N/A"}</h3>
                  </span>
                
              </div>
            </div>
          </div>
       </div>

       <div className="aircraftsProfileBox2">
           <div className="profileCardBox1">
               <h3 className="aircraftsProfileTitle">Perspectives</h3>
               <div className="profileBoxImg">
                <div className="profileCardImg">
                    {item && item.image_front ? ( // Check if personal_details and image are not null
                      <img src={`${baseUrl}${item.image_front}`} alt="" />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                      <p>Front View</p> 
                  </div>
                  <div className="profileCardImg">
                  {item && item.image_back ? ( // Check if personal_details and image are not null
                      <img src={`${baseUrl}${item.image_back}`} alt="" />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                      <p>Back View</p> 
                  </div>
               </div>
               <div className="profileBoxImg">
                <div className="profileCardImg">
                    {item && item.image_left ? ( // Check if personal_details and image are not null
                      <img src={`${baseUrl}${item.image_left}`} alt="" />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                      <p>Left Side View</p> 
                  </div>
                  <div className="profileCardImg">
                      {item && item.image_right ? ( // Check if personal_details and image are not null
                      <img src={`${baseUrl}${item.image_right}`} alt="" />
                    ) : (
                      <img src={noImage} alt="" />
                    )}
                      <p>Right Side View</p> 
                  </div>
               </div>
           </div>
           <div className="profileCardBox2 px-5">
              <h3 className="aircraftsProfileTitle -ml-2">Location</h3>

             <div className="profileMapBox">
             <MapContainer  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                      />
                      <SpiderTrakMarker selectedAircraft={item.spidertracks_details} />

             </MapContainer>
             </div>
           </div>
       </div>
    </div>
  )
}
