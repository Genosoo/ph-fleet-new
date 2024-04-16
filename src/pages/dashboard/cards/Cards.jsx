/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cards({
    marineTrafficData, 
    trakSatData, 
    spiderTrakData, 
    personnelData,
    checkInData,
    officesData,
    vehiclesData,
    summaryData

}) {
    const [marineTrafficCount, setMarineTrafficCount] = useState(0);
    const [trakSatCount, setTrakSatCount] = useState(0);
    const [spiderTrakCount, setSpiderTrakCount] = useState(0);
   

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
          
   
          
        
        // if (checkInData && checkInData.length) {
        //     setCheckInCount(checkInData.length)
        // }

        // if (checkInData && checkInData.length) {
        //     setCheckInCount(checkInData.length);
        //     // setNoCheckInsToday(personnelCount - checkInCount);
        //   }


      }, [marineTrafficData, trakSatData, spiderTrakData, personnelData, checkInData, officesData, vehiclesData]);


  
      let total = 0;
        if (summaryData && summaryData.personnel) {
        for (const key in summaryData.personnel) {
            total += summaryData.personnel[key];
        }
        }

      
    return (
        <div className="cards_container">
            <div className="cards_wrapper">
                <div className="card_box card_box_1">
                 <Link  className="card" to={'/fleet/marinetraffic-list'}>
                        <h2>{marineTrafficCount}</h2>
                        <span>Commercial Vessels (Marine Traffic)</span>
                 </Link>

                 <Link className="card" to={'/fleet/traksat-list'}>
                    <h2>{trakSatCount}</h2>
                    <span>PF Vessels (TrakSat)</span>
                </Link>

                <Link className="card"  to={'/fleet/spidertrak-list'}>
                    <h2>{spiderTrakCount}</h2>
                    <span>PF Aircrafts (SpiderTrak)</span>
                </Link>

                <div className="card opacity-[0.3]">
                    <h2>0</h2>
                    <span>Commercial Aircrafts (FlightRadar)</span>
                </div>
                </div>

                <div className='card_box card_box_2'>
                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{total}</h2>
                        <span>Personnel</span>
                    </Link>
                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{summaryData?.personnel && summaryData.personnel['On-Duty'] ? summaryData?.personnel['On-Duty'] : 0}</h2>
                        <span>On-Duty</span>
                    </Link>
                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{summaryData?.personnel && summaryData.personnel['On-Leave'] ? summaryData?.personnel['On-Leave'] : 0}</h2>
                        <span>On-Leave</span>
                    </Link>

                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{summaryData?.personnel && summaryData.personnel['Rest and Recreation'] ? summaryData?.personnel['Rest and Recreation'] : 0}</h2>
                        <span>RnR</span>
                    </Link>
                </div>            

            <div className='card_box card_box_2'>
              
                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{summaryData?.personnel && summaryData.personnel['Official Business'] ?  summaryData?.personnel['Official Business'] : 0}</h2>
                        <span>Official Business</span>
                    </Link>
                    <Link className="card" to={'/fleet/personnel'}>
                        <h2>{summaryData?.personnel && summaryData.personnel['Non-Uniform'] ? summaryData?.personnel['Non-Uniform'] : 0}</h2>
                        <span>Non-Uniform</span>
                    </Link>
                    <Link className="card" to={'/fleet/offices'}>
                        <h2>{summaryData?.offices && summaryData.offices ? summaryData?.offices?.total : 0}</h2>
                        <span>Offices</span>
                    </Link>
                    <Link className="card" to={'/fleet/vehicles'}>
                        <h2>{summaryData?.vehicle && summaryData.vehicle ? summaryData?.vehicle?.total : 0}</h2>
                        <span>Vehicles</span>
                    </Link>
                </div>
           </div>
        </div>
    )
}
