/* eslint-disable react/prop-types */
import { baseUrl } from "../../api/api_urls" 

export default function SelectedVessel({ selectedVessel }) {
  return (
    <div className="selectedVesselWrapper">
              <div className="selectedDetailWrapper">
                <p>Name: <b>{selectedVessel.vessel_name ?? "--"}</b></p>
                <p>Class: <b>{selectedVessel.vessel_class_details?.class_name ?? "--"}</b></p> 
                <p>Type: <b>{selectedVessel.vessel_type_details?.type_name ?? "--"}</b></p> 
                <p>Unit: <b>{selectedVessel.unit_details?.unit_name ?? "--"}</b></p> 
                <p>Hull number: <b>{selectedVessel.hull_number ?? "--"}</b></p> 
                <p>Origin: <b>{selectedVessel.origin ?? "--"}</b></p> 
                <p>Capacity: <b>{selectedVessel.capacity ?? "--"}</b></p> 
                <p>Status: <b>{selectedVessel.vessel_status_details?.status_name ?? "--"}</b></p> 
           
              </div>
               <div className="selectedImageWrapper">
                  <span className="selectedImageBox">
                      <h2>Main Image</h2>
                    <img src={`${baseUrl}${selectedVessel.image_main}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Front Image</h2>
                    <img src={`${baseUrl}${selectedVessel.image_front}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Back Image</h2>
                    <img src={`${baseUrl}${selectedVessel.image_back}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Left Image</h2>
                    <img src={`${baseUrl}${selectedVessel.image_left}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Right Image</h2>
                    <img src={`${baseUrl}${selectedVessel.image_right}`} alt="" />
                  </span>
               </div>
            </div>
  )
}
