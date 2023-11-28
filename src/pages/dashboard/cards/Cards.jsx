/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';

export default function Cards({
    marineTrafficData, 
    trakSatData, 
    spiderTrakData, 
    personnelData,
    checkInData,
    officesData,
    vehiclesData
}) {
    const [marineTrafficCount, setMarineTrafficCount] = useState(0);
    const [trakSatCount, setTrakSatCount] = useState(0);
    const [spiderTrakCount, setSpiderTrakCount] = useState(0);
    const [personnelCount, setPersonnelCount] = useState(0);
    const [officesCount, setOfficesCount] = useState(0);

    const [vehiclesCount, setVehiclesCount] = useState(0);


    const [checkInCount, setCheckInCount] = useState(0);
    const [noCheckInsToday, setNoCheckInsToday] = useState(0);
    const [noOnDuty, setNoOnDuty] = useState(0);
    const [noOnLeave, setNoOnLeave] = useState(0);
    const [noRnR, setNoRnR] = useState(0);

    useEffect(() => {
        if (marineTrafficData && marineTrafficData.length) {
          setMarineTrafficCount(marineTrafficData.length);
        }
    
        if (trakSatData && trakSatData.length) {
          setTrakSatCount(trakSatData.length);
        }

        if (vehiclesData && vehiclesData.length) {
            setVehiclesCount(vehiclesData.length);
        }

        if (officesData && officesData.length) {
            setOfficesCount(officesData.length);
          }


        if (spiderTrakData && spiderTrakData.length) {
            setSpiderTrakCount(spiderTrakData.length);
          }
          
          if (personnelData && personnelData.length) {
            setPersonnelCount(personnelData.length);
            
            // Count the number of personnel with status_name "On-Duty"
            const onDutyCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'On-Duty').length;
            setNoOnDuty(onDutyCount);

            const onLeaveCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'On-Leave').length;
            setNoOnLeave(onLeaveCount);

            const RnRCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'Rest and Recreation').length;
            setNoRnR(RnRCount);
        }
          
        
        if (checkInData && checkInData.length) {
            setCheckInCount(checkInData.length)
        }

        if (checkInData && checkInData.length) {
            setCheckInCount(checkInData.length);
            setNoCheckInsToday(personnelCount - checkInCount);
          }


      }, [marineTrafficData, trakSatData, spiderTrakData, personnelData, checkInData, officesData, vehiclesData]);
    return (
        <div className="cards_container">
            <div className="cards_wrapper">
                <div className="card_box card_box_1">
                <div className="card">
                    <h2>{marineTrafficCount}</h2>
                    <span>No.of Commercial Vessels (Marine Traffic)</span>
                </div>
                <div className="card">
                    <h2>{trakSatCount}</h2>
                    <span>No. of PF Vessels (TrakSat)</span>
                </div>
                <div className="card">
                    <h2>{spiderTrakCount}</h2>
                    <span>No. of PF Aircrafts (SpiderTrak)</span>
                    
                </div>
                <div className="card opacity-[0.3]">
                    <h2>0</h2>
                    <span>No. of Commercial Aircrafts (FlightRadar)</span>
                </div>
                </div>

                <div className='card_box card_box_2'>
                <div className="card">
                    <h2>{personnelCount}</h2>
                    <span>No. of Personnel</span>
                </div>
                    <div className="card">
                        <h2>{noOnDuty}</h2>
                        <span>No. On-Duty</span>
                    </div>
                    <div className="card">
                        <h2>{noOnLeave}</h2>
                        <span>No. On-Leave</span>
                    </div>
                    <div className="card">
                        <h2>{noRnR}</h2>
                        <span>No. RnR</span>
                    </div>
                </div>            

            <div className='card_box card_box_2'>
              
                    <div className="card">
                        <h2>{checkInCount}</h2>
                        <span>Report-ins Today</span>
                    </div>
                    <div className="card">
                        <h2>{noCheckInsToday}</h2>
                        <span>No. Report-ins Today</span>
                    </div>
                    <div className="card">
                        <h2>{officesCount}</h2>
                        <span>No. of Offices</span>
                    </div>
                    <div className="card">
                        <h2>{vehiclesCount}</h2>
                        <span> No. of Vehicles</span>
                    </div>
                </div>
           </div>
        </div>
    )
}
