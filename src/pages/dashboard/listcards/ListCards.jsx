/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './ListCardsStyle.css'
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function ListCards({ marineTrafficData, trakSatData, spiderTrakData, personnelData,}) {

  const displayMarineTraffic = marineTrafficData ? marineTrafficData.slice(0, 10) : [];
  const displayTrakSat = trakSatData ? trakSatData.slice(0, 10) : [];
  const displaySpiderTrak = spiderTrakData ? spiderTrakData.slice(0, 10) : [];
  const displayPersonnel = personnelData ? personnelData.slice(0, 10) : [];
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
                    <td className="listCardTable">
                      {item.asset_id}
                    </td>
                     <td className="listCardTable">
                     {item.description}
                   </td>
                    <td className="listCardTable">
                    {item.group}
                  </td>
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

        <h2 className='listCardTitle'>List of Last  Personnel Checked-in</h2>
        <div className="listCardContent1">
            <div className="listCardBoxPersonnel">
                <div className="listCardHeader">
                <h3>Personnel</h3>
                <Link to={'/fleet/personnel'}>
                 <span>View All <RiArrowRightSLine/></span>
                </Link>
              </div>

              <table className='listCardTable'>
                  <thead>
                  <tr>
                      <th>Last Name</th>
                      <th>First Name</th>
                      <th>Rank</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {displayPersonnel.map((item, index) => (
                    <tr key={index}>
                    <td className="listCardTable">
                      {item.personal_details?.last_name || '---'}
                    </td>
                     <td className="listCardTable">
                     {item.personal_details?.first_name || '---'}
                   </td>
                    <td className="listCardTable">
                    {item.personal_details?.rank_name || '---'}
                  </td>
                  <td className="listCardTable">
                    {item.personal_details?.unit_name || '---'}
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
