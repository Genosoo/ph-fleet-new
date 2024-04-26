import "./VesselsProfile.css"
import { useLocation} from 'react-router-dom';
import { Image } from 'antd';
import { baseUrl } from "../../../api/api_urls";
import noImage from '../../../assets/no-image.png'
import { MapContainer, TileLayer } from 'react-leaflet';
import TrakSatMarker from './TrakSatMarker';

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.vessel;
  return (
    <div className="vesselProfileContainer">
      <div className="vesselProfileWrapper">
          <div className="vesselProfileBoxWrapper">
            <h2>Vessel Profile</h2>
            <div className="vesselProfileBox1">
              <div className="vesselProfilePhotoBox">
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
                  <h3>{item?.vessel_name || "N/A"}</h3>
                  <p>{item?.vessel_type_details?.type_name || "N/A"}</p>
                  <h4>{item?.vessel_status_details?.status_name || "N/A"}</h4>
                </span>

            </div>
          </div>
      
         


            <div className="vesselProfileBoxWrapper3">
                <h2>Vessel Details</h2>
                <div className="vesselProfileBox3">
                  <span>
                        <h3>Hull Number</h3>
                        <p>{item?.hull_number || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Name</h3>
                        <p>{item?.vessel_name || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Type</h3>
                        <p>{item?.vessel_type_details?.type_name || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Class Name</h3>
                        <p>{item?.vessel_class_details?.class_name || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Unit</h3>
                        <p>{item?.unit_details?.unit_name || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Origin</h3>
                        <p>{item?.origin || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Capacity</h3>
                        <p>{item?.capacity || "N/A"}</p>
                  </span>
                  <span>
                        <h3>Status</h3>
                        <p>{item?.vessel_status_details?.status_name || "N/A"}</p>
                  </span>
                </div>
            </div>

      </div>


      <div className="vesselProfileWrapper">

      <div className="vesselProfileBoxWrapper2">
                <h2>Perspectives</h2>
                <div className="vesselProfileBox2">
                    <div className="vesselProfileImageCardFlex">
                    <div className="vesselProfileImageCard">
                        <p>Front View</p>
                        {item && item.image_front ? (
                          <Image   src={`${baseUrl}${item.image_front}`} alt="" />
                        ) : (
                          <Image  src={noImage} alt="" />
                        )}
                    </div>

                    <div className="vesselProfileImageCard">
                        <p>Back View</p>
                        {item && item.image_back ? (
                          <Image src={`${baseUrl}${item.image_back}`} alt="" />
                        ) : (
                          <Image src={noImage} alt="" />
                        )}
                    </div>
                    </div>
                    
                    <div className="vesselProfileImageCardFlex">
                    <div className="vesselProfileImageCard">
                        <p>Right Side View</p>
                        {item && item.image_right ? (
                          <Image   src={`${baseUrl}${item.image_right}`} alt="" />
                        ) : (
                          <Image  src={noImage} alt="" />
                        )}
                    </div>

                    <div className="vesselProfileImageCard">
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
        <div className="vesselProfileBoxWrapper4">
          <h2>Location</h2>
             <div className="vesselProfileBox4">
             <MapContainer  zoomControl={false} center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
               <TrakSatMarker selectedVessel={item.traksat_details} />
             </MapContainer>
             </div>
        </div>
      </div>
    </div>
  )
}
