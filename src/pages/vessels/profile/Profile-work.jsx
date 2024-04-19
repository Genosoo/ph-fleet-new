import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-image.png'

export default function Profile() {
  const location = useLocation();
  console.log({location});

  const item = location.state.vessel;

  return (
    <div className='vesselsInfoContainer'>
      <div className="vesselsInfoWrapper">
        <div className="vesselsInfoBox1">
          <h3>Vessel Profile</h3>
          <div className='vesselsInfoFlex'>
            {item && item.image_main ? ( // Check if personal_details and image are not null
              <img  src={`${baseUrl}${item.image_main}`} alt="" />
              ) : (
              <img  src={noImage} alt="" />
            )}

              <span>
                  <h2>{item?.vessel_name || "N/A"}</h2>
                  <p>{item?.vessel_class_details?.class_name || "N/A"}</p>
                  <h4>{item?.vessel_status_details?.status_name || "N/A"}</h4>
              </span>
          </div>
        </div>

        <div className="vesselsInfoBox2">
           <h3>Vessel Details</h3>
           <span>
              <h3>ID</h3>
              <p></p>
           </span>
        </div>
      </div>
    </div>
  )
}
