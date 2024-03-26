/* eslint-disable react/prop-types */
// import { baseUrl } from "../../api/api_urls" 
import defaultImage from '../../assets/no-image.png'

export default function SelectedPersonnel({ selectedPersonnel }) {
  return (
    <div className="selectedVesselWrapper">
              <div className="personBoxContainer">
              <div className="personBoxWrapper">
              <div className="personbox1">
                    <div className="personImageBox">
                    <img src={defaultImage} alt="image" />
                    </div>
                    <span>
                    <p>Username</p>
                    <h4>{selectedPersonnel.username ?? "--"}</h4>
                    </span>
                </div>
                <div className="personbox2">
                  <span>
                  <p>First Name </p>
                  <h3>{selectedPersonnel?.personal_details?.first_name ?? "--"}</h3>
                  </span>
                <p>Last Name: <b>{selectedPersonnel?.personal_details?.last_name ?? "--"}</b></p>
                <p>Gender: <b>{selectedPersonnel?.personal_details?.gender ?? "--"}</b></p>
                <p>Email: <b>{selectedPersonnel?.personal_details?.email ?? "--"}</b></p>
                <p>Serial Number: <b>{selectedPersonnel?.personal_details?.serial_number ?? "--"}</b></p>
                <p>Rank: <b>{selectedPersonnel?.personal_details?.rank ?? "--"}</b></p>
                <p>Rank Name: <b>{selectedPersonnel?.personal_details?.rank_name ?? "--"}</b></p>
                <p>Status: <b>{selectedPersonnel?.personal_details?.status_name ?? "--"}</b></p>
                <p>Mobile Number: <b>{selectedPersonnel?.personal_details?.mobile_number ?? "--"}</b></p>
                <p>Office: <b>{selectedPersonnel?.personal_details?.office_name ?? "--"}</b></p>
                <p>Unit: <b>{selectedPersonnel?.personal_details?.unit_name ?? "--"}</b></p>
                </div>
              </div>
              </div>
               {/* <div className="selectedImageWrapper">
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
               </div> */}
            </div>
  )
}
