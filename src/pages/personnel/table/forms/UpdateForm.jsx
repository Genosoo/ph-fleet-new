import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../../context/DataProvider";
import { StyledFormControl, StyledTextField } from "../Styled";
import { Select, MenuItem, InputLabel } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  apiUnit, apiPersonnelStatus, apiPersonnelRank, apiUsers } from "../../../../api/api_urls";
import axios from 'axios';
import GetToken from "../../../../components/token/GetToken";
import './Forms.css'
import { message } from 'antd';
import { useLocation} from 'react-router-dom';


export default function UpdateForm() {
  const csrfToken = GetToken()
  const {usersData, updateUsersData, officesData } = useContext(DataContext);
  const [unitData, setUnitData] = useState([])
  const [personnelStatus, setPersonnelStatus] = useState([])
  const [personnelRank, setPersonnelRank] = useState([])
  const location = useLocation();
  console.log({location });

  const item = location.state.personnel;

  const [formData, setFormData] = useState({
    username: item?.username  || "",
    groups:item?.roles  || "User",
    personal_details: {
        first_name: item?.personal_details?.first_name || "",
        last_name: item?.personal_details?.last_name  || "",
        email: item?.personal_details?.email  || "",
        gender:item?.personal_details?.gender  || "",
        mobile_number:item?.personal_details?.mobile_number  || "",
        rank:item?.personal_details?.rank  || "",
        personnel_status:item?.personal_details?.personnel_status  || "",
        unit:item?.personal_details?.unit  || "",
        office:item?.personal_details?.office  || "",
      }
  });
  

  const handleUpdateUser = async () => {
    // Check if the required fields are not empty
    if (formData.username.trim() === "") {
        message.error('Please enter your username');
        return;
    }

    if (formData.personal_details.first_name.trim() === "") {
        message.error('Please enter your first name');
        return;
    }

    if (formData.personal_details.last_name.trim() === "") {
        message.error('Please enter your last name');
        return;
    }

    if (formData.personal_details.email.trim() === "") {
        message.error('Please enter your email address');
        return;
    }

    if (formData.personal_details.gender.trim() === "") {
        message.error('Please select your gender');
        return;
    }

    // Validate mobile number format
    const mobileNumberPattern = /^(09)\d{9}$/;
    if (!mobileNumberPattern.test(formData.personal_details.mobile_number)) {
        message.error('Please enter a valid mobile number starting with "09" and containing 11 digits.');
        return;
    }

    try {
        const updatedFormData = { ...formData, id: item.id };
        const response = await axios.put(apiUsers, updatedFormData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const updatedUser = response.data.data;
        
        // Find the index of the updated user in the usersData array
        const index = usersData.findIndex(user => user.id === updatedUser.id);
        
        // Update the usersData array with the updated user at the correct index
        const updatedUsersData = [...usersData];
        updatedUsersData[index] = updatedUser;

        // Update the state with the updated users data
        updateUsersData(updatedUsersData);

        message.success("Personnel updated successfully");
    } catch (error) {
        console.error('Error updating user:', error);
        message.error(error.response.data.error.username);
    }
};


   
  useEffect(() => {
    const fetchData = async() => {
      try {
        const unitResponse = await axios.get(apiUnit);
        const personnelStatusResponse = await axios.get(apiPersonnelStatus);
        const rankResponse = await axios.get(apiPersonnelRank);

        setUnitData(unitResponse.data.success)
        setPersonnelStatus(personnelStatusResponse.data.success)
        setPersonnelRank(rankResponse.data.success)

      } catch (error) {
        console.log(error)
    }
  }
  fetchData()
  },[])


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("personal_details")) {
        const [key, subKey] = name.split(".");
        setFormData(prevState => ({
            ...formData,
            [key]: {
                ...prevState[key],
                [subKey]: value
            }
        }));
    } else if (name === "groups") {
        setFormData({ ...formData, groups: [value] }); // Update roles as an array
    } else {
        setFormData({ ...formData, [name]: value });
    }
};





  return (
    <div className="usersFormContainer">
        <div className="usersFormBoxWrapper">
            
            <div className="usersFormBox usersFormBox1">
            <h2>Personal Information</h2>
        
            <div className="usersFormInputBox">
            <StyledTextField
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                value={formData.username}
                onChange={handleFormChange}
            />
          
            <StyledTextField
                autoFocus
                margin="dense"
                name="personal_details.first_name"
                label="First Name"
                type="text"
                fullWidth
                value={formData.personal_details.first_name}
                onChange={handleFormChange}
            />
       
            <StyledTextField
                autoFocus
                margin="dense"
                name="personal_details.last_name"
                label="Last Name"
                type="text"
                fullWidth
                value={formData.personal_details.last_name}
                onChange={handleFormChange}
            />
            <StyledTextField
                autoFocus
                margin="dense"
                name="personal_details.email"
                label="Email"
                type="email"
                fullWidth
                value={formData.personal_details.email}
                onChange={handleFormChange}
            />
            <StyledTextField
                autoFocus
                margin="dense"
                name="personal_details.mobile_number"
                label="Mobile Number"
                type="tel"
                fullWidth
                value={formData.personal_details.mobile_number}
                onChange={handleFormChange}
            />

          <StyledFormControl sx={{marginTop:1}} fullWidth >
          <InputLabel id="gender">Gender</InputLabel>
          <Select 
          variant="outlined"
               labelId="gender"
                  name="personal_details.gender"
                  value={formData.personal_details.gender}
                  onChange={handleFormChange}
                  fullWidth
                  IconComponent={ExpandMoreIcon}
              >
                 <MenuItem  value={"male"}>Male</MenuItem>
                 <MenuItem  value={"female"}>Female</MenuItem>
              </Select>
          </StyledFormControl>
            </div>
            </div>

        <div className="usersFormBox usersFormBox2">
            <h2>Service Details</h2>
              <div className="usersFormInputBox2">
              <StyledFormControl fullWidth>
          <InputLabel id="rank">Rank</InputLabel>
            <Select 
               labelId="rank"
                  name="personal_details.rank"
                  value={formData.personal_details.rank}
                  onChange={handleFormChange}
                  fullWidth
                  IconComponent={ExpandMoreIcon}
               
              >
                  {personnelRank.map(rank => (
                      <MenuItem key={rank.id} value={rank.id}>
                          {rank.rank_name}
                      </MenuItem>
                  ))}
              </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select 
               labelId="status"
                  name="personal_details.personnel_status"
                  value={formData.personal_details.personnel_status}
                  onChange={handleFormChange}
                  fullWidth
                  IconComponent={ExpandMoreIcon}
               
              >
                  {personnelStatus.map(status => (
                      <MenuItem key={status.id} value={status.id}>
                          {status.status_name}
                      </MenuItem>
                  ))}
              </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
          <InputLabel id="unit">Unit</InputLabel>
          <Select 
               labelId="unit"
                  name="personal_details.unit"
                  value={formData.personal_details.unit}
                  onChange={handleFormChange}
                  fullWidth
                  IconComponent={ExpandMoreIcon}
               
              >
                  {unitData.map(unit => (
                      <MenuItem key={unit.id} value={unit.id}>
                          {unit.unit_name}
                      </MenuItem>
                  ))}
              </Select>
          </StyledFormControl>

          <StyledFormControl fullWidth>
          <InputLabel id="office">Office</InputLabel>
          <Select 
               labelId="office"
                  name="personal_details.office"
                  value={formData.personal_details.office}
                  onChange={handleFormChange}
                  fullWidth
                  IconComponent={ExpandMoreIcon}
               
              >
                  {officesData.map(office => (
                      <MenuItem key={office.id} value={office.id}>
                          {office.office_name}
                      </MenuItem>
                  ))}
              </Select>
          </StyledFormControl>
              </div>

          <button className="usersFormBtnAdd" onClick={handleUpdateUser}>Update User</button>
        </div>

       
        </div>

      
   </div>
  )
}
