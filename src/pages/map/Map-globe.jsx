import { useState } from "react";
import MapContent from "./MapContent";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import Globe from 'react-globe.gl';
import mapimage from '../../assets/map.jpg'

export default function Map() {
  const { marineTrafficData,
    traksatData,
    spidertracksData,
    personnelData,
    videoStreamData,
    officesData,
    vehiclesData,
    incidentData,
    carData,
    checkInData,
  } = useContext(DataContext);

  const myData = [
    {
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.4,
      color: '#00ff33',
    },
    {
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.4,
      color: '#ff0000',
    },
    {
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.4,
      color: '#ffff00',
    },
  ];

  // State to track the visibility of the Globe component
  const [showGlobe, setShowGlobe] = useState(false);

  return (
    <div className="mapMainContainer">
       {showGlobe ? (
        <Globe
          globeImageUrl={mapimage}
          pointsData={myData}
          pointAltitude="altitude"
          pointColor="color"
        />
      ): (
 <MapContent
        marineTrafficData={marineTrafficData}
        tracksatData={traksatData}
        spiderTrakData={spidertracksData}
        personnelData={personnelData}
        videoStreamData={videoStreamData}
        officesData={officesData}
        vehiclesData={vehiclesData}
        incidentData={incidentData}
        carData={carData}
        checkInData={checkInData}
      />
      )}

      {/* Button to toggle the visibility of the Globe */}
      <button onClick={() => setShowGlobe(!showGlobe)}>
        {showGlobe ? "Hide Globe" : "Show Globe"}
      </button>
     

     
    </div>
  );
}
