import "./UsersProfile.css"
import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-user-image.png'
import { DataContext } from '../../../context/DataProvider';
import { useContext } from 'react';
import { Image } from "antd";

export default function Profile() {
  const { personnelHistory, checkInData } = useContext(DataContext)
  const location = useLocation();
  const item = location.state.user;
  const user = item.personal_details.user;

  const filteredHistory = personnelHistory.filter(historyItem => historyItem.user === user);
  const filteredCheckInData = checkInData.filter(dataItem => dataItem.user === item.id);
  console.log("filteredCheckInData:",  filteredCheckInData);

  
  console.log({location});
  console.log("personnel History:", personnelHistory );
  console.log("personnel filtered History:",  filteredHistory);


const statusColors = {
  null: '#858585',
  "On-Duty": '#EBFAF1',
  "On-Leave": '#F9F5E2',
  "Rest and Recreation": '#E6F0F7', 
  "Non-Uniform": '#FADBD8', 
  "Official Business": '#EBDEF0', 
};


const statusTextColors = {
  null: '#ffffff', 
  "On-Duty": '#2ECC71', 
  "On-Leave": '#F1C40F', 
  "Rest and Recreation": '#3498DB', 
  "Non-Uniform": '#E74C3C', 
  "Official Business": '#9B59B6', 
};



  return (
   <div className="usersProfileMainContainer">
      <div className='usersProfileContainer'>
        <div className='usersProfileBox1'>
              <h1>User Profile</h1>
              <div className='usersProfileDetailBox1'>
                  <Image 
                    src={`${baseUrl}${item?.personal_details?.image}`} alt="" 
                    onError={(e) => {  e.target.src = noImage;
                        }}/>
                  <span>
                    <h2>{item?.personal_details?.first_name || "N/A"} {item?.personal_details?.last_name || ""}</h2>
                    <h4>{item?.username || "N/A"}</h4>
                    <div className="usersProfileStatusBox"  style={{
                                        backgroundColor: statusColors[item?.personal_details?.status_name || item?.personal_details],
                                        color: statusTextColors[item?.personal_details?.status_name || item?.personal_details],
                                    }} >
                                        <div
                                         style={{
                                            backgroundColor: statusTextColors[item?.personal_details?.status_name || item?.personal_details],
                                        }} className="statusDot"></div>
                                    {item?.personal_details?.status_name || "No Status"}
                                </div>
                  </span>
              </div>
          </div>
          <div className='usersProfileBox2'>
              <h1>User Information</h1>
              <div className='usersProfileDetailBox2'>
                    <span>
                         <p>Username</p>
                          <h4>{`${item?.username || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>First Name</p>
                          <h4>{`${item?.personal_details?.first_name || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Middle Name</p>
                          <h4>{`${item?.personal_details?.middle_name || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Last Name</p>
                          <h4>{`${item?.personal_details?.last_name || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Email</p>
                          <h4>{`${item?.personal_details?.email || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Rank</p>
                          <h4>{`${item?.personal_details?.rank_name || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Unit</p>
                          <h4>{`${item?.personal_details?.unit_name || "N/A"}`}</h4>
                    </span>

                    <span>
                         <p>Office</p>
                          <h4>{`${item?.personal_details?.office_name || "N/A"}`}</h4>
                    </span>
              </div>
          </div>
    </div>
   </div>
  )
}
