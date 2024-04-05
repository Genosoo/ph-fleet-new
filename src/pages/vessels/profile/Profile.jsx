import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-image.svg'
import { MapContainer, TileLayer } from 'react-leaflet';
import TrakSatMarker from './TrakSatMarker';

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.vessel;


  return (
    <div className='vesselsProfileContainer'>
       <div className="vesselsProfileBox1">
         <h4 className='vesselsProfileTitle'>Vessel Profile</h4>
         <div className="vesselsProfileInitial">
          {item && item.image_main ? ( // Check if personal_details and image are not null
              <img className='vesselsProfilePhoto' src={`${baseUrl}${item.image_main}`} alt="" />
            ) : (
              <img className='vesselsProfilePhoto' src={noImage} alt="" />
            )}


            <div className="textBoxWrapper">
              <div className='textBox1 textBox'>
                  <span>
                    <p>Name</p>
                    <h3>{item?.vessel_name || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Class</p>
                    <h3>{item?.vessel_class_details?.class_name || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Unit</p>
                    <h3>{item?.unit_details?.unit_name || "N/A"}</h3>
                  </span>
              </div>
              <div className='textBox3 textBox'>
                  <span>
                    <p>Type</p>
                    <h3>{item?.vessel_type_details?.type_name || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Hull Number</p>
                    <h3>{item?.hull_number || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Origin</p>
                    <h3>{item?.origin || "N/A"}</h3>
                  </span>
              </div>
              <div className='textBox3 textBox'>
                  <span>
                    <p>Capacity</p>
                    <h3>{item?.capacity || "N/A"}</h3>
                  </span>
                  <span>
                    <p>Status</p>
                    <h3>{item?.vessel_status_details?.status_name || "N/A"}</h3>
                  </span>
                
              </div>
            </div>
          </div>
       </div>

       <div className="vesselsProfileBox2">
           <div className="profileCardBox1">
               <h3 className="vesselsProfileTitle">Perspectives</h3>
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
              <h3 className="vesselsProfileTitle -ml-2">Location</h3>

             <div className="profileMapBox">
             <MapContainer  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                      />

                      <TrakSatMarker selectedVessel={item.traksat_details} />
             </MapContainer>
             </div>
           </div>
       </div>
    </div>
  )
}
