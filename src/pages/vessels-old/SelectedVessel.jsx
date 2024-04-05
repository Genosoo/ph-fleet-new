/* eslint-disable react/prop-types */
import { baseUrl } from "../../api/api_urls" 
import defaultImage from '../../assets/no-image.png'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarineTrafficMarker from "./marker/MarineTrafficMarker";

import { Link } from "react-router-dom";

export default function SelectedVessel({ selectedVessel }) {
  const placeholderImage = defaultImage;
  return (
    <div className="selectedVesselWrapper">
                 <h2 className="selectedVesselTitle">Vessel Profile</h2>
                <div className="selectedVesselBox1">
                 <div className="selectedBox1">
                    <img className="vesselMainImage" 
                    src={selectedVessel.image_main ? `${baseUrl}${selectedVessel.image_main}` : placeholderImage}
                    alt="" />
                 </div>
                
                <div className="selectedBoxDetails">
                <span>
                     <p>Name:</p>
                     <h3>{selectedVessel.vessel_name ?? "--"}</h3>
                  </span>

                  <span>
                     <p>Class:</p>
                     <h3>{selectedVessel.vessel_class_details?.class_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Type:</p>
                    <h3>{selectedVessel.vessel_type_details?.type_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Unit:</p>
                    <h3>{selectedVessel.unit_details?.unit_name ?? "--"}</h3>
                  </span>
                  
                  <span>
                    <p>Hull number: </p>
                    <h3>{selectedVessel.hull_number ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Origin:</p>
                    <h3>{selectedVessel.origin ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Capacity:</p>
                    <h3>{selectedVessel.capacity ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Status:</p>
                    <h3>{selectedVessel.vessel_status_details?.status_name ?? "--"}</h3>
                  </span>
                </div>

                <div>
                 </div>
           
              </div>
              
              <div className="flex gap-10 w-full">
              <div className="selectedVesselBox2">
                   <h2 className="selectedVesselTitle">Perspective</h2>
                   <div className="imagesVesselBox">
                   <span className="imgBox">
                      <h2>Front Image</h2>
                    <img src={selectedVessel.image_front ? `${baseUrl}${selectedVessel.image_front}` : placeholderImage} alt="front image" />
                  </span>

                  <span className="imgBox">
                      <h2>Back Image</h2>
                     <img src={selectedVessel.image_back ? `${baseUrl}${selectedVessel.image_back}` : placeholderImage} alt="back image" />
                  </span>

                  <span className="imgBox">
                      <h2>Left Image</h2>
                     <img src={selectedVessel.image_left ? `${baseUrl}${selectedVessel.image_left}` : placeholderImage} alt="left image" />
                  </span>

                  <span className="imgBox">
                      <h2>Right Image</h2>
                     <img src={selectedVessel.image_right ? `${baseUrl}${selectedVessel.image_right}` : placeholderImage} alt="right image" />
                  </span>
                   </div>
               </div>

               <div className="selectedVesselBox3">
                  <h2 className="selectedVesselTitle">Location</h2>
                  <Link to="/fleet/map">
                  <div className="mapBox">
                  <MapContainer  center={[12.8797, 121.7740]} zoom={6} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                      />
                       <MarineTrafficMarker 
                        selectedVessel={selectedVessel}
                      />
                      </MapContainer>
                  </div>
                  </Link>
               </div>
              </div>
            </div>
  )
}
