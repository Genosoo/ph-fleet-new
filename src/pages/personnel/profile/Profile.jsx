/* eslint-disable react/prop-types */
import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-image.svg'
// import { MdOutlineEdit } from "react-icons/md";


export default function Profile() {
    const location = useLocation();
    console.log({location });

   const item = location.state.user;
  return (
    <div className='usersProfileContainer'>
          <div className="usersProfileTop">
            <h4 className='usersProfileTitle'>User Profile</h4>
            {/* <button ><MdOutlineEdit /> Edit profile</button> */}
          </div>
        <div className='usersProfileBox1'>
          <div className="usersProfileInitial">
          {item.personal_details && item.personal_details.image ? ( // Check if personal_details and image are not null
              <img className='usersProfilePhoto' src={`${baseUrl}${item.personal_details.image}`} alt="" />
            ) : (
              <img className='usersProfilePhoto' src={noImage} alt="" />
            )}

              <div className='textBox'>
                <p className='text1'>{item?.username || "--"}</p>
                  <p className='text2'>
                  {item?.personal_details?.first_name || "---"}{' '}
                  {item?.personal_details?.last_name || "---"}
                </p>

                <p className='text3'>{item?.personal_details?.rank_name || "--"}</p>
              </div>
          </div>
        </div>
         <div className="usersProfileBox2">
           <h4 className='title'>User Information</h4>
            <div className='usersTableDetail'>
               <span className='span1'>
                <p>Username</p>
                <p>Last Name</p>
                <p>First Name</p>
                {/* <p>Middle Name</p> */}
               </span>
               <span className='span2'>
                     <p>{item?.username || "N/A"}</p>
                     <p>{item?.personal_details?.last_name || "N/A"}</p>
                     <p>{item?.personal_details?.first_name || "N/A"}</p>
                     {/* <p>{item?.personal_details?.middle_name || "N/A"} </p> */}
               </span>
            </div>
            {/* <p><b>First Name:</b> </p>
            <p><b>Gender:</b> {item?.personal_details?.gender || "N/A"}</p>
            <p><b>Email Address: </b> {item?.personal_details?.email || "N/A"}</p>
            <p><b>Mobile Number:</b> {item?.personal_details?.mobile_number || "N/A"}</p>
            <p><b>Status:</b> {item?.personal_details?.status_name || "N/A"}</p>
            <p><b>Unit:</b> {item?.personal_details?.unit_name || "N/A"}</p>
            <p><b>Office:</b> {item?.personal_details?.office_name || "N/A"}</p> */}
            </div>

            
    </div>
  )
}
