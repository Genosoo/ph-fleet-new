/* eslint-disable react/prop-types */
import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
  } from '@mui/material';
  import { IoClose } from "react-icons/io5";
  import cameramanImg from '../../../assets/cameraman.png'
  import personnelImg from '../../../assets/personnel.svg'

  import helicopterImg from '../../../assets/helicopter.svg'
  import airplaneImg from '../../../assets/airplane.svg'
  import weatherImg from '../../../assets/weather.svg'
  import campImg from '../../../assets/camp.svg'
  import vehiclesImg from '../../../assets/vehicle.svg'
  import carImg from '../../../assets/car.svg'
  import incidentImg from '../../../assets/incident.svg'
  import dutyImg from '../../../assets/duty.svg'
  import leaveImg from '../../../assets/leave.svg'
  import rnrImg from '../../../assets/rnr.svg'
  import nonUniformImg from '../../../assets/non-uniform.svg'
  import './FilterStyle.css'

  const iconStyle = {
    color: '#19f6be',
    '&.Mui-checked': {
      color: '#19f6be',
    },
  };
  const iconStyle2 = {
    color: '#19f6be',
    '&.Mui-checked': {
      color: '#a4ffe8',
    },
  };
  

  
export default function FilterDrawer({

    isDrawerOpen,
    toggleDrawer,

    showMarineTraffic,
    handleMarineTraffic,
    
    showTrakSat,
    handleTrakSat,
    showDescription,
    setShowDescription,

    showSpiderTrak,
    handleSpiderTrak,
    showSpiderTrakDesc,
    setShowSpiderTrakDesc,

    showPersonnel,
    handlePersonnel,

    showVideoStream,
    handleVideoStream,

    showWeather,
    toggleWeather,

    handleOffice,
    showOffice,

    showVehicles,
    handleVehicles,

    showIncident,
    handleIncident,

    showOnDuty,
    handleToggleOnDuty,
    showOnLeave,
    handleToggleOnLeave,
    showRnr,
    handleToggleRnr,

    showNonUniform,
    handleToggleNonUniform,

    showAllUsernames,
    handleToggleShowAllUsernames,

    showCarTrack,
    handleCarTrack
    
  }) {


    
  return (
    <div className="drawerWrapper">
      <Drawer
    anchor="right"
    variant="persistent"
    open={isDrawerOpen}
    hideBackdrop={true}
  
  >

    <div className='drawerListWrapper'>
    <button className='btnCloseDrawer' onClick={toggleDrawer}>
        <IoClose />
      </button>
    <div className="drawerListBox">
    
   
 
    <ListItem>
        <ListItemIcon>
          <span className="mtIcon">🢙</span>
        </ListItemIcon>
        <ListItemText primary="MarineTraffic" />
        <Checkbox
           sx={iconStyle}  checked={showMarineTraffic}  onChange={handleMarineTraffic} />
      </ListItem>

      <div className="inputBoxBorder">
      <ListItem >
        <ListItemIcon>
          <div className="inputBox">
            <span className="inputBoxImgTraksat">
              <img src="https://traksat.net/i/arrow1.png" alt="" />
            </span>
            <span className="inputBoxCircle">
              <div className="circle-marker"></div>
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Traksat" />
        <Checkbox
         sx={iconStyle}  checked={showTrakSat} onChange={handleTrakSat} />
      </ListItem>

      {showTrakSat && (
<div className=''>
        <ListItem >
          <ListItemText primary="Vessels Name" />
          <Checkbox
             sx={iconStyle2} 
            checked={showDescription}
            onChange={() => setShowDescription(!showDescription)}
          />
        </ListItem>
        </div>
      )}
      </div>


      <div className="inputBoxBorder">
      <ListItem>
        <ListItemIcon>
        <span className="stImgBox">
              <img src={airplaneImg} alt="" />
              <img src={helicopterImg} alt="" />
            </span>
        </ListItemIcon>
        <ListItemText primary="Spidertracks" />
        <Checkbox
          sx={iconStyle} 
          checked={showSpiderTrak} 
          onChange={handleSpiderTrak} />
      </ListItem>

      {showSpiderTrak && (
         <div className=''>
        <ListItem>
          <ListItemText primary="Aircraft Name" />
          <Checkbox
             sx={iconStyle2} 
            checked={showSpiderTrakDesc}
            onChange={() => setShowSpiderTrakDesc(!showSpiderTrakDesc)}
          />
        </ListItem>
        </div>
      )}

</div>

      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="frImgBox">
              📡
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Flight Radar" />
        {/* Add your Checkbox and onChange here */}
      </ListItem>

      <ListItem>
        <ListItemIcon>
        <span className="weatherImgBox">
              <img src={weatherImg} alt="" />
            </span>
        </ListItemIcon>
        <ListItemText primary="Weather" />
        <Checkbox
      sx={iconStyle}  checked={showWeather}   onChange={toggleWeather} />
      </ListItem>

      <div className="inputBoxBorder">
  <ListItem>
    <ListItemIcon>
      <div className="inputBox">
        <span className="personImgBox">
          <img src={personnelImg} alt="" />
        </span>
      </div>
    </ListItemIcon>
    <ListItemText primary="Personnel" />
    <Checkbox
      sx={iconStyle}
      checked={showPersonnel}
      onChange={handlePersonnel}
    />
  </ListItem>

  {showPersonnel && (
    <div className=''>
    <ListItem >
        {/* <ListItemIcon>
          <div className="inputBox">
            <span className="ml-3  w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={nonUniformImg} alt="" />
            </span>
          </div>
        </ListItemIcon> */}
        <ListItemText primary="Names" />
        <Checkbox
          sx={iconStyle2}
          checked={showAllUsernames}
          onChange={handleToggleShowAllUsernames}
        />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <div className="inputBox">
            <span className="personImgBox">
              <img src={nonUniformImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Non-Uniform" />
        <Checkbox
          sx={iconStyle2}
          checked={showNonUniform}
          onChange={handleToggleNonUniform}
          disabled={showOnLeave || showRnr || showOnDuty } 
        />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <div className="inputBox">
            <span className="personImgBox">
              <img src={dutyImg} alt="" />
            </span>
          </div>
        </ListItemIcon >
        <ListItemText primary="On Duty" />
        <Checkbox
          sx={iconStyle2}
          checked={showOnDuty}
          onChange={handleToggleOnDuty}
          disabled={showOnLeave || showRnr || showNonUniform  } 
        />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <div className="inputBox">
            <span className="personImgBox">
              <img src={leaveImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="On Leave" />
        <Checkbox
          sx={iconStyle2}
          checked={showOnLeave}
          onChange={handleToggleOnLeave}
          disabled={showOnDuty || showRnr || showNonUniform} // Disable if On Duty or RnR is checked
        />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <div className="inputBox">
            <span className="personImgBox">
              <img src={rnrImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="RnR" />
        <Checkbox
          sx={iconStyle2}
          checked={showRnr}
          onChange={handleToggleRnr}
          disabled={showOnDuty || showOnLeave || showNonUniform} // Disable if On Duty or On Leave is checked
        />
      </ListItem>
    </div>
  )}
</div>

   

      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="incidentImgBox">
              <img src={incidentImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Incidents" />
        <Checkbox 
         sx={iconStyle} 
        checked={showIncident} onChange={handleIncident} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="officeImgBox">
              <img src={campImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Office" />
        <Checkbox
       sx={iconStyle} 
        checked={showOffice} onChange={handleOffice} />
      </ListItem>


      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="vehicleImgBox">
              <img src={vehiclesImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Vehicles" />
        <Checkbox
         sx={iconStyle} 
        checked={showVehicles} onChange={handleVehicles} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="cartrackImgBox">
              <img src={carImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Cartrack" />
        <Checkbox
         sx={iconStyle} 
        checked={showCarTrack} onChange={handleCarTrack} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="inputBox">
            <span className="vsImgBox">
              <img src={cameramanImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Video Streams" />
        <Checkbox
         sx={iconStyle}  checked={showVideoStream} onChange={handleVideoStream} />
      </ListItem>
    </div>
    </div>
    </Drawer>
    </div>
  )
}
