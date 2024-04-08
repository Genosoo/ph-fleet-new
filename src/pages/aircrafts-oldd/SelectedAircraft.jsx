/* eslint-disable react/prop-types */
import { baseUrl } from "../../api/api_urls" 

export default function SelectedAircraft({ selectedAircraft }) {
  return (
    <div className="selectedVesselWrapper">
              <div className="selectedDetailWrapper">
                <p>Name: <b>{selectedAircraft.aircraft_name ?? "--"}</b></p>
                <p>Type: <b>{selectedAircraft.aircraft_type_details?.type_name ?? "--"}</b></p> 
                <p>Unit: <b>{selectedAircraft.unit_details?.unit_name ?? "--"}</b></p> 
           
              </div>
               <div className="selectedImageWrapper">
                  <span className="selectedImageBox">
                      <h2>Main Image</h2>
                    <img src={`${baseUrl}${selectedAircraft.image_main}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Front Image</h2>
                    <img src={`${baseUrl}${selectedAircraft.image_front}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Back Image</h2>
                    <img src={`${baseUrl}${selectedAircraft.image_back}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Left Image</h2>
                    <img src={`${baseUrl}${selectedAircraft.image_left}`} alt="" />
                  </span>

                  <span className="selectedImageBox">
                      <h2>Right Image</h2>
                    <img src={`${baseUrl}${selectedAircraft.image_right}`} alt="" />
                  </span>
               </div>
            </div>
  )
}
