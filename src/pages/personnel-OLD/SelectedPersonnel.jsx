/* eslint-disable react/prop-types */
// import { baseUrl } from "../../api/api_urls" 
import defaultImage from '../../assets/no-image.png'

export default function SelectedPersonnel({ selectedPersonnel }) {
  return (
    <div className="selectedPersonWrapper">
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

                <div className="border w-[400px]">
                  <span>
                    <p>First Name </p>
                    <h3>{selectedPersonnel?.personal_details?.first_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Last Name</p>
                     <h3>{selectedPersonnel?.personal_details?.last_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Gender</p>
                    <h3>{selectedPersonnel?.personal_details?.gender ?? "--"}</h3>
                  </span>

                  <span>
                  <p>Email</p>
                  <h3>{selectedPersonnel?.personal_details?.email ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Serial Number</p>
                    <h3>{selectedPersonnel?.personal_details?.serial_number ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Rank</p>
                    <h3>{selectedPersonnel?.personal_details?.rank_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Status</p>
                    <h3>{selectedPersonnel?.personal_details?.status_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Mobile Number</p>
                    <h3>{selectedPersonnel?.personal_details?.mobile_number ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Office</p>
                    <h3>{selectedPersonnel?.personal_details?.office_name ?? "--"}</h3>
                  </span>

                  <span>
                    <p>Unit</p>
                    <h3>{selectedPersonnel?.personal_details?.unit_name ?? "--"}</h3>
                  </span>

                </div>
              </div>
              </div>
            
            </div>
  )
}
