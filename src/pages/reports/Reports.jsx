import { useEffect, useState } from "react";
import "./ReportStyles.css"

import officeIcon from '../../assets/icon/offices.svg'
import marinetrafficIcon from '../../assets/icon/marinetraffic.svg'
import spidertracksIcon from '../../assets/icon/flightradar.svg'
import vehiclesIcon from '../../assets/icon/vehicles.svg'
import personnelIcon from '../../assets/icon/personnel.svg'
import ondutyIcon from '../../assets/icon/personnel_on_duty.svg'
import onleaveIcon from '../../assets/icon/personnel_on_leave.svg'
import rnrIcon from '../../assets/icon/personnel_rnr.svg'
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

export default function Reports() {
  const [officesCount, setOfficesCount] = useState(0);
  const [personnelCount, setPersonnelCount] = useState(0);
  const [noOnDuty, setNoOnDuty] = useState(0);
  const [noOnLeave, setNoOnLeave] = useState(0);
  const [noRnR, setNoRnR] = useState(0);
  const [vesselsCount, setVesselsCount] = useState(0);
  const [aircraftCount, setaircraftCount] = useState(0);
  const [vehiclesCount, setvehiclesCount] = useState(0);


  const {
    personnelData, 
    officeData, 
    vehiclesData,
    aircraftData,
    vesselsData,
} = useContext(DataContext)


  useEffect(() => {
 
    if (officeData && officeData.length) {
        setOfficesCount(officeData.length);
      }



      if (personnelData && personnelData.length) {
        setPersonnelCount(personnelData.length);
        
        const onDutyCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'On-Duty').length;
        setNoOnDuty(onDutyCount);

        const onLeaveCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'On-Leave').length;
        setNoOnLeave(onLeaveCount);

        const RnRCount = personnelData.filter(item => item.personal_details && item.personal_details.status_name === 'Rest and Recreation').length;
        setNoRnR(RnRCount);
    }


    if (vesselsData && vesselsData.length) {
      setVesselsCount(vesselsData.length);
    }

    if (aircraftData && aircraftData.length) {
      setaircraftCount(aircraftData.length);
    }

    if (vehiclesData && vehiclesData.length) {
      setvehiclesCount(vehiclesData.length);
    }

  }, [officeData, personnelData, vesselsData, aircraftData, vehiclesData]);



  return (
    <div className="reportContainer">
      <div className="reportBox1">
         <h1 className="title">Office</h1>
         <div className="reportCard">
             <div className="reportCardFlex">
              <h2 >{officesCount}</h2>
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
           <h2 >{vesselsCount}</h2>
           <img src={marinetrafficIcon} alt="" />
          </div>
          <p className="text1">Total Vessels Count</p>
        </div>
      </div>


        <div className="reportCardWrapper">
            <h1 className="title">Aircrafts</h1>
          <div className="reportCard">
            <div className="reportCardFlex">
                <h2 >{aircraftCount}</h2>
                <img src={spidertracksIcon} alt="" />
              </div>
              <p className="text1">Total Aircrafts Count</p>
            </div>
        </div>

        <div className="reportCardWrapper">
        <h1 className="title">Vehicles</h1>
          <div className="reportCard">
          <div className="reportCardFlex">
              <h2>{vehiclesCount}</h2>
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
              <h2 >{personnelCount}</h2>
              <img src={personnelIcon} alt="" />
            </div>
            <p className="text1">Total Personnel Count</p>
         </div>

        <div className="reportCard">
          <div className="reportCardFlex">
            <h2 >{noOnDuty}</h2>
            <img src={ondutyIcon} alt="" />
          </div>
          <p className="text1">On-Duty</p>
        </div>

        <div className="reportCard">
          <div className="reportCardFlex">
            <h2 >{noOnLeave}</h2>
            <img src={onleaveIcon} alt="" />
          </div>
          <p className="text1"> On-Leave</p>
        </div>

        <div className="reportCard">
        <div className="reportCardFlex">
          <h2 >{noRnR}</h2>
          <img src={rnrIcon} alt="" />
          </div>
          <p className="text1">On-RnR</p>
        </div>

       </div>
      </div>

    </div>
  );
}
