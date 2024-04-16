/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './ListCardsStyle.css'
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ListCards({ marineTrafficData, trakSatData, spiderTrakData,  incidentData}) {

  const displayMarineTraffic = marineTrafficData ? marineTrafficData.slice(0, 10) : [];
  const displayTrakSat = trakSatData ? trakSatData.slice(0, 10) : [];
  const displaySpiderTrak = spiderTrakData ? spiderTrakData.slice(0, 10) : [];
  const displayIncident = incidentData ? incidentData.slice(0, 10) : [];
// const displayIncident = incidentData
//   ? incidentData
//       .filter(item => item.status_details.type_status === "New")
//       .slice(0, 10)
//   : [];


  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };


    // Define a color palette for status values 1 to 7
const statusColors = {
  null: '#D6EAF8',
  1: '#D6EAF8', // Status 1 color
  2: '#FAE5D3', // Status 2 color
  3: '#FCF3CF', // Status 3 color
  4: '#D5F5E3', // Status 4 color
  5: '#FADBD8', // Status 5 color
  6: '#EBDEF0', // Status 6 color
  7: '#EAEDED', // Status 7 color
};


const statusTextColors = {
  null: '#3498DB',
  1: '#3498DB', // Status 1 color
  2: '#E67E22', // Status 2 color
  3: '#F1C40F', // Status 3 color
  4: '#2ECC71', // Status 4 color
  5: '#E74C3C', // Status 5 color
  6: '#9B59B6', // Status 6 color
  7: '#95A5A6', // Status 7 color
};

  return (
    <div className='listCardContainer'>
          <h2 className='listCardTitle'>List of Current 10 Active Vessels</h2>
        <div className="listCardContent1">
            <div className="listCardBox">
                <div className="listCardHeader">
                <h3>MarineTraffic</h3>
                <Link to={'/fleet/marinetraffic-list'}>
                  <span>View All <RiArrowRightSLine/></span>
                </Link>
              </div>

              <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>MMSI</th>
                      <th>Vessel Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {displayMarineTraffic.map((item, index) => (
                    <tr key={index}>
                      <td className="listCardTable">
                        {item.mmsi}
                      </td>
                      <td className="listCardTable">
                      {item.shipname}
                    </td>
                      <td className="listCardTable">
                      {item.type_name}
                    </td>
                  </tr>
                  ))}
                  </tbody>

                </table>

          
            </div>

            <div className="listCardBox">
                <div className="listCardHeader">
                  <h3>Traksat</h3>
                  <Link to={'/fleet/traksat-list'}>
                    <span>View All <RiArrowRightSLine/></span>
                  </Link>
                </div>
               <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>Asset ID</th>
                      <th>Vessel Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayTrakSat.map((item, index) => (
                      <tr key={index}>
                        <td className="listCardTable">{item.asset_id}</td>
                        <td className="listCardTable">{item.description}</td>
                        <td className="listCardTable">{item.group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>


        <h2 className='listCardTitle'>List of Current 10 Active Aircraft</h2>
        <div className="listCardContent1">
            <div className="listCardBox">
                <div className="listCardHeader">
                <h3>Spidertracks</h3>
                <Link to={'/fleet/spidertrak-list'}>
                  <span>View All <RiArrowRightSLine/></span>
                </Link>
              </div>

              <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>Track ID</th>
                      <th>Unit</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {displaySpiderTrak.map((item, index) => (
                    <tr key={index}>
                    <td className="listCardTable">
                      {item.track_id}
                    </td>
                     <td className="listCardTable">
                     {item.unit_id}
                   </td>
                    <td className="listCardTable">
                    {item.type_name}
                  </td>
                  </tr>
                  
                  ))}
                  </tbody>

                </table>

          
            </div>

            <div className="listCardBox">
                <div className="listCardHeader">
                <h3>Flightradar</h3>
                <span className='opacity-5'>View All <RiArrowRightSLine/></span>
              </div>
              <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>Asset ID</th>
                      <th>Vessel Name</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <td colSpan="3">No data available</td>
                  </tbody>
                </table>
            </div>
        </div>

        <h2 className='listCardTitle'>List of Latest Top 10 Reported Incidents</h2>
        <div className="listCardContent1">
            <div className="listCardBoxPersonnel">
                <div className="listCardHeader">
                <h3>Incident</h3>
                <Link to={'/fleet/incidents'}>
                 <span>View All <RiArrowRightSLine/></span>
                </Link>
              </div>

              <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>Date/Time</th>
                      <th>Incident Description</th>
                      <th>Severity</th>
                      <th>Type</th>
                      <th>Reporter</th>
                      <th>Incident Address</th>
                      <th>Response Status</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {displayIncident.map((item, index) => (
                    <tr key={index}>
                    <td className="listCardTable">
                      {item.created_at ? formatDate(item.created_at) : "N/A"}
                    </td>
                     <td className="listCardTable">
                     {item?.incident_details || "N/A"}
                   </td>
                    <td className="listCardTable">
                    {item?.severity_details?.severity_name || "N/A"}
                  </td>
                  <td className="listCardTable">
                    {item?.type_details?.type_name || "N/A"}
                  </td>
                  <td>
                     {item?.user_details?.username || "N/A"}
                  </td>
                  <td>
                  {item?.address_incident || "N/A"}
                  </td>

                  <td className='pr-10'>
                  <p  className="statusOfReport" 
                   style={{
                      backgroundColor: statusColors[item.status],
                      color: statusTextColors[item.status] || '#000'  // Set text color based on background color
                     }}>{item?.status_details?.type_status || "N/A"}</p>
                  </td>
                  </tr>
                  
                  ))}
                  </tbody>

                </table>

          
            </div>
        </div>
    </div>
  )
}
