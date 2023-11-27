/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';

export default function Cards({
    marineTrafficData, 
    trakSatData, 
    spiderTrakData, 
    personnelData,
    checkInData
}) {
    const [marineTrafficCount, setMarineTrafficCount] = useState(0);
    const [trakSatCount, setTrakSatCount] = useState(0);
    const [spiderTrakCount, setSpiderTrakCount] = useState(0);
    const [personnelCount, setPersonnelCount] = useState(0);
    const [checkInCount, setCheckInCount] = useState(0);
    const [noCheckInsToday, setNoCheckInsToday] = useState(0);

    useEffect(() => {
        if (marineTrafficData && marineTrafficData.length) {
          setMarineTrafficCount(marineTrafficData.length);
        }
    
        if (trakSatData && trakSatData.length) {
          setTrakSatCount(trakSatData.length);
        }

        if (spiderTrakData && spiderTrakData.length) {
            setSpiderTrakCount(spiderTrakData.length);
          }

          
        if (personnelData && personnelData.length) {
            setPersonnelCount(personnelData.length);
          }
        
        if (checkInData && checkInData.length) {
            setCheckInCount(checkInData.length)
        }

        if (checkInData && checkInData.length) {
            setCheckInCount(checkInData.length);
            setNoCheckInsToday(personnelCount - checkInCount);
          }


      }, [marineTrafficData, trakSatData, spiderTrakData, personnelData, checkInData]);
    console.log(marineTrafficData)
    return (
        <div className="cards_container">
            <div className="cards_wrapper">
                <div className="card_box card_box_1">
                <div className="card">
                    <h2>{marineTrafficCount}</h2>
                    <span>No.of Commercial Vessels</span>
                    <span>(Marine Traffic)</span>
                </div>
                <div className="card">
                    <h2>{trakSatCount}</h2>
                    <span>No. of PF Vessels</span>
                    <span>(TrakSat)</span>
                </div>
                <div className="card">
                    <h2>{spiderTrakCount}</h2>
                    <span>No. of PF Aircrafts</span>
                    (SpiderTrak)
                </div>
                <div className="card opacity-[0.3]">
                    <h2>0</h2>
                    <span>No. of Commercial Aircrafts</span>
                    <span>(FlightRadar)</span>
                </div>
                </div>
            

            <div className='card_box card_box_2'>
                <div className="card">
                    <h2>{personnelCount}</h2>
                    <span>No. of Personnel</span>
                </div>
                    <div className="card">
                        <h2>{checkInCount}</h2>
                        <span>Checked-ins Today</span>
                    </div>
                    <div className="card">
                        <h2>{noCheckInsToday}</h2>
                        <span>No Checked-ins Today</span>
                    </div>
                </div>
                </div>
        </div>
    )
}
