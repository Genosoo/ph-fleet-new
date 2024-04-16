import { useLocation} from 'react-router-dom';
import { baseUrl } from '../../../api/api_urls';
import noImage from '../../../assets/no-user-image.png'
import { MapContainer, TileLayer } from 'react-leaflet';
// import { MdOutlineEdit } from "react-icons/md";
import { DataContext } from '../../../context/DataProvider';
import { useContext } from 'react';
import PersonnelMarker from './PersonnelMarker';

export default function Profile() {
  const { personnelHistory, checkInData } = useContext(DataContext)
  const location = useLocation();
  const item = location.state.personnel;
  const user = item.personal_details.user;

  const filteredHistory = personnelHistory.filter(historyItem => historyItem.user === user);
  const filteredCheckInData = checkInData.filter(dataItem => dataItem.user === item.id);
  console.log("filteredCheckInData:",  filteredCheckInData);

  
  console.log({location});
  console.log("personnel History:", personnelHistory );
  console.log("personnel filtered History:",  filteredHistory);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return null;

    const date = new Date(dateTimeString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};



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
   <div className="personnelProfileMainContainer">
    <div className="personnelProfileHeader">
       {/* <button disabled><MdOutlineEdit/> Update Profile</button> */}
    </div>
      <div className='personnelProfileContainer'>
       <div className="personnelProfileWrapper">
          <div className='personnelProfileBox1'>
              <h1>Personnel Profile</h1>
              <div className='personnelProfileDetailBox1'>
                  <img 
                    src={`${baseUrl}${item?.personal_details?.image}`} alt="" 
                    onError={(e) => {  e.target.src = noImage;
                        }}/>
                  <span>
                    <h2>{item?.personal_details?.first_name || "N/A"} {item?.personal_details?.last_name || ""}</h2>
                    <h4>{item?.username || "N/A"}</h4>
                    <div className="personnelProfileStatusBox"  style={{
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

          <div className='personnelProfileBox2'>
              <h1>Personnel Information</h1>
              <div className='personnelProfileDetailBox2'>
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


       <div className="personnelProfileWrapper2">
          <div className="personnelProfileBox3">
              <h1>Check-in Location</h1>

              <div className='personnelProfileMapBox'>
                <MapContainer zoomControl={false} center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                   <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                  <PersonnelMarker selectedPersonnel={filteredCheckInData[0]} />
               </MapContainer>
              </div>
          </div>

          <div className="personnelProfileBox4">
               <h1>Check-in Logs</h1>

               <span className="spanheader">
                   <p>Date/Time</p>
                   <p>Duty Status</p>
                   <p>Check-in Location</p>
               </span>

               <div className="boxLogDetails">
                   {filteredHistory.map((item, index) => (
                     <span className='spanDetails' key={index}>
                        <p>{formatDateTime(item.updated_at) || "N/A"}</p>
                        <div className="logStatusBox"  style={{
                                        backgroundColor: statusColors[item?.personal_details?.status_name || item?.personal_details],
                                        color: statusTextColors[item?.personal_details?.status_name || item?.personal_details] ,
                                    }} >
                                        <div
                                         style={{
                                            backgroundColor: statusTextColors[item?.personal_details?.status_name || item?.personal_details],
                                        }} className="userStatusDot"></div>
                                    {item?.personal_details?.status_name || "N/A"}
                                </div>
                        <p >{item.address || "N/A"}</p>
                     </span>
                   ))}
               </div>
          </div>
       </div>
    </div>
   </div>
  )
}
