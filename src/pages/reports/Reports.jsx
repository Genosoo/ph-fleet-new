import "./ReportStyles.css"

import officeIcon from '../../assets/icon/offices.svg'
import marinetrafficIcon from '../../assets/icon/marinetraffic.svg'
import spidertracksIcon from '../../assets/icon/flightradar.svg'
import vehiclesIcon from '../../assets/icon/vehicles.svg'
import personnelIcon from '../../assets/icon/personnel.svg'
import ondutyIcon from '../../assets/icon/personnel_on_duty.svg'
import onleaveIcon from '../../assets/icon/personnel_on_leave.svg'
import rnrIcon from '../../assets/icon/personnel_rnr.svg'
import nonUniformIcon from '../../assets/icon/personnel_non_uniform.svg'
import { apiSummary  } from "../../api/api_urls";
import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reports() {

  const [summaryData, setSummaryData] = useState([])




  useEffect(() => {
    const fetchSummary = async() => {
        try {
            const res = await axios.get(apiSummary)
            setSummaryData(res.data.success)
     console.log("Summary:", res.data.success)
        } catch (error) {
            console.error(error)
        }
    }
    fetchSummary();
},[])

let totalPersonnel = 0;
if (summaryData && summaryData.personnel) {
for (const key in summaryData.personnel) {
    totalPersonnel += summaryData.personnel[key];
}
}



  return (
    <div className="reportContainer">
      <div className="reportBox1">
         <h1 className="title">Office</h1>
         <div className="reportCard">
             <div className="reportCardFlex">
              <h2 >{summaryData?.offices && summaryData?.offices ? summaryData?.offices?.total : 0}</h2>
               <img src={officeIcon} alt="" />
             </div>
          <p className="text1">Total No. of Offices</p>
         </div>
      </div>

      
      
     <div className="reportBox2">
     <div className="reportCardWrapper">
      <h1 className="title">Vessels</h1>
      <div className="reportCard">
          <div className="reportCardFlex">
           <h2 >{summaryData?.vessel && summaryData?.vessel ? summaryData?.vessel?.total : 0}</h2>
           <img src={marinetrafficIcon} alt="" />
          </div>
          <p className="text1">Total Vessels Count</p>
        </div>
      </div>


        <div className="reportCardWrapper">
            <h1 className="title">Aircrafts</h1>
          <div className="reportCard">
            <div className="reportCardFlex">
                <h2 >{summaryData?.aircraft && summaryData?.aircraft ? summaryData?.aircraft?.total : 0}</h2>
                <img src={spidertracksIcon} alt="" />
              </div>
              <p className="text1">Total Aircrafts Count</p>
            </div>
        </div>

        <div className="reportCardWrapper">
        <h1 className="title">Vehicles</h1>
          <div className="reportCard">
          <div className="reportCardFlex">
              <h2>{summaryData?.vehicle && summaryData.vehicle ? summaryData?.vehicle?.total : 0}</h2>
              <img src={vehiclesIcon} alt="" />
          </div>
              <p className="text1">Total Vehicles Count</p>
            </div>
        </div>
     </div>

     <div className="reportBox3">
         <h1 className="title">Personnel</h1>
         <div className="reportCardWrapper">
          <div className="reportCard">
          <div className="reportCardFlex">
              <h2 >{totalPersonnel}</h2>
              <img src={personnelIcon} alt="" />
            </div>
            <p className="text1">Total Personnel Count</p>
         </div>

        <div className="reportCard">
          <div className="reportCardFlex">
            <h2 >{summaryData?.personnel && summaryData.personnel['On-Duty'] ? summaryData?.personnel['On-Duty'] : 0}</h2>
            <img src={ondutyIcon} alt="" />
          </div>
          <p className="text1">On-Duty</p>
        </div>

        <div className="reportCard">
          <div className="reportCardFlex">
            <h2 >{summaryData?.personnel && summaryData.personnel['On-Leave'] ? summaryData?.personnel['On-Leave'] : 0}</h2>
            <img src={onleaveIcon} alt="" />
          </div>
          <p className="text1"> On-Leave</p>
        </div>

        <div className="reportCard">
        <div className="reportCardFlex">
          <h2 >{summaryData?.personnel && summaryData.personnel['Rest and Recreation'] ? summaryData?.personnel['Rest and Recreation'] : 0}</h2>
          <img src={rnrIcon} alt="" />
          </div>
          <p className="text1">On-RnR</p>
        </div>

        <div className="reportCard">
        <div className="reportCardFlex">
          <h2 >{summaryData?.personnel && summaryData.personnel['Non-Uniform'] ? summaryData?.personnel['Non-Uniform'] : 0}</h2>
          <img src={nonUniformIcon} alt="" />
          </div>
          <p className="text1">Non-Uniform</p>
        </div>

        <div className="reportCard">
        <div className="reportCardFlex">
          <h2 >{summaryData?.personnel && summaryData.personnel['Official Business'] ? summaryData?.personnel['Official Business'] : 0}</h2>
          <img src={rnrIcon} alt="" />
          </div>
          <p className="text1">Official Business</p>
        </div>

       </div>
      </div>

    </div>
  );
}
