/* eslint-disable react/prop-types */

export default function ListCards({
  marineTrafficData,
  trakSatData,
  spiderTrakData,
  personnelData,
  // checkInData
}) {
  const displayMarineTraffic = marineTrafficData.slice(0,10);
  const displayTrakSat = trakSatData.slice(0,10);
  const displaySpiderTrak = spiderTrakData.slice(0,10);
  const displayPersonnel = personnelData.slice(0,10);

  return (
    <div className="list_container">
      <h2>List</h2>

      <div className="list_card_wrapper">
          <div className="list_card">
            <span className="title">MarineTraffic</span>
            <p>List of Current 10 Active Vessels</p>
              {displayMarineTraffic.map((item, index) => (
                <div key={index} className="list_box">
                   <span>{item.shipname}</span>
                </div>
              ))}
          </div>

          <div className="list_card">
            <span className="title">TrakSat</span>
            <p>List of Current 10 Active Vessels</p>
              {displayTrakSat.map((item, index) => (
                <div key={index} className="list_box">
                   <span>{item.description}</span>
                </div>
              ))}
          </div>

          <div className="list_card">
            <span className="title">SpiderTrak</span>
            <p>List of Current Active Aircrafts</p>
              {displaySpiderTrak.map((item, index) => (
                <div key={index} className="list_box">
                   <span>{item.unit_id}</span>
                </div>
              ))}
          </div>

          <div className="list_card">
            <span className="title">Flight Radar</span>
            <p>List of Current 10 Active Aircrafts</p>
              {/* {displayMarineTraffic.map((item, index) => (
                <div key={index} className="list_box">
                   <span>{item.shipname}</span>
                </div>
              ))} */}

                   <span>No data for Flight Radar</span>
                
          </div>

          <div className="list_card">
            <p>List of Last  Personnel Checked-in</p>
              {displayPersonnel.map((item, index) => (
                <div key={index} className="list_box">
                   <span>{item.username}</span>
                </div>
              ))}
          </div>

      </div>
    </div>
  )
}
