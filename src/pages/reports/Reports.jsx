import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getOfficesData = `${baseUrl}/api/office/`;
const getPersonnelData = `${baseUrl}/api/personnel_latest`;
const getVesselsData = `${baseUrl}/api/internal_vessel/`;
const getAircraftData = `${baseUrl}/api/internal_aircraft/`;
const getvehiclesData = `${baseUrl}/api/vehicle/`;

export default function Reports() {
  const [officesCount, setOfficesCount] = useState(0);
  const [officesData, setOfficesData] = useState(0);
  const [personnelCount, setPersonnelCount] = useState(0);
  const [personnelData, setPersonnelData] = useState(0);
  const [noOnDuty, setNoOnDuty] = useState(0);
  const [noOnLeave, setNoOnLeave] = useState(0);
  const [noRnR, setNoRnR] = useState(0);
  const [vesselsCount, setVesselsCount] = useState(0);
  const [vesselsData, setVesselsData] = useState(0);
  const [aircraftCount, setaircraftCount] = useState(0);
  const [aircraftData, setaircraftData] = useState(0);
  const [vehiclesCount, setvehiclesCount] = useState(0);
  const [vehiclesData, setvehiclesData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officesResponse = await axios.get(getOfficesData);
        const personnelResponse = await axios.get(getPersonnelData);
        const vesselsResponse = await axios.get(getVesselsData);
        const aircraftResponse = await axios.get(getAircraftData);
        const vehiclesResponse = await axios.get(getvehiclesData);

        setOfficesData(officesResponse.data.success)
        setPersonnelData(personnelResponse.data.success)
        setVesselsData(vesselsResponse.data.success)
        setaircraftData(aircraftResponse.data.success)
        setvehiclesData(vehiclesResponse.data.success)
        
        console.log("offices", officesResponse.data.success);
        console.log("Personnel", personnelResponse.data.success);
        console.log("vessels", vesselsResponse.data.success);
        console.log("aircraft", aircraftResponse.data.success);
        console.log("vehicles", vehiclesResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
 



    if (officesData && officesData.length) {
        setOfficesCount(officesData.length);
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

  }, [officesData, personnelData, vesselsData, aircraftData, vehiclesData]);



  return (
    <div className="flex flex-col justify-start items-starts gap-5">
      <div className="flex flex-col gap-2 border-b-2 p-3">
         <h1 className="font-bold text-[1.3rem]">Office</h1>
         <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{officesCount}</h2>
          <p className="font-semibold">No. Of Offices</p>
         </div>
      </div>

      
      
     <div className="flex flex-wrap">
     <div className="flex flex-col  gap-2 border-b-2 p-3">
      <h1 className="font-bold text-[1.3rem]">Vessels</h1>
      <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{vesselsCount}</h2>
          <p className="font-semibold">Total Vessels Count</p>
        </div>
      </div>



      <div className="flex flex-col gap-2 border-b-2 p-3">
      <h1 className="font-bold text-[1.3rem]">Aircrafts</h1>
      <div className="bg-gray-200 p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{aircraftCount}</h2>
          <p className="font-semibold">Total Aircrafts Count</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b-2 p-3">
      <h1 className="font-bold text-[1.3rem]">Vehicles</h1>
      <div className="bg-gray-200 p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{vehiclesCount}</h2>
          <p className="font-semibold">Total Vehicles Count</p>
        </div>
      </div>
     </div>

     <div className="flex flex-col gap-2 border-b-2 p-3">
        <h1 className="font-bold text-[1.3rem]">Personnel</h1>

       <div className="flex gap-5 flex-wrap ">
       <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{personnelCount}</h2>
          <p className="font-semibold">Total Personnel Count</p>
        </div>

        <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{noOnDuty}</h2>
          <p className="font-semibold">Total Personnel On-Duty</p>
        </div>

        <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{noOnLeave}</h2>
          <p className="font-semibold"> Total Personnel On-Leave</p>
        </div>

        <div className="bg-gray-200 border shadow-md p-4 rounded-[10px] h-[100px] w-[250px]">
          <h2 className="text-[2rem]">{noRnR}</h2>
          <p className="font-semibold">Total Personnel On-RnR</p>
        </div>

       </div>
      </div>

    </div>
  );
}
