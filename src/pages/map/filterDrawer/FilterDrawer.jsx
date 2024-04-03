/* eslint-disable react/prop-types */
import './FilterStyle.css'
import { Drawer, Checkbox, Button } from '@mui/material';


import videostreamsIcon from '../../../assets/icon/video_streams.svg'
import cartrackIcon from '../../../assets/icon/cartrack.svg'
import vehiclesIcon from '../../../assets/icon/vehicles.svg'
import officeIcon from '../../../assets/icon/offices.svg'
import incidentsIcon from '../../../assets/icon/incidents.svg'
import rnrPersonnelIcon from '../../../assets/icon/personnel_rnr.svg'
import onLeavePersonnelIcon from '../../../assets/icon/personnel_on_leave.svg'
import onDutyPersonnelIcon from '../../../assets/icon/personnel_on_duty.svg'
import nonUniformPersonnelIcon from '../../../assets/icon/personnel_non_uniform.svg'
import personnelIcon from '../../../assets/icon/personnel.svg'
import weatherIcon from '../../../assets/icon/weather.svg'
import spidertracksIcon1 from '../../../assets/icon/airplane.svg'
import spidertracksIcon2 from '../../../assets/icon/helicopter.svg'
import flightradarIcon from '../../../assets/icon/flightradar.svg'
import marineTrafficIcon from '../../../assets/icon/marinetraffic.svg'
import traksatIcon1 from '../../../assets/icon/traksat_1.svg'
import traksatIcon2 from '../../../assets/icon/traksat_2.svg'
import nameIcon from '../../../assets/icon/show_name.svg'

// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const iconStyle = {
  color: '#0DB0E6',
  '&.Mui-checked': {
    color: '#0DB0E6',
  },
};
const iconStyle2 = {
  color: '#0DB0E6',
  '&.Mui-checked': {
    color: '#0DB0E6',
  },
};



export default function FilterDrawer({

  handleShowAllAircrafts,
  showAllAircrafts,

  handleShowAllVessels,
  showAllVessels,

  handleUnShowAll,

  handleShowAll,
  showAll,

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
    <Drawer anchor="right" variant="persistent" open={true}>
      <div className='drawerListWrapper'>
        <div className="drawerListBox">

            <div className=" mb-3 flex">
            {!showAll ? (
              <Button  size='large' sx={{width:'100%', textTransform:"capitalize", backgroundColor:"#0DB0E6",  '&:hover': { backgroundColor: "#1096c3", },}} variant='contained' onClick={handleShowAll} >Select All</Button>
            ): (
              <Button  size='large' sx={{width:'100%', textTransform:"capitalize",  backgroundColor:"#363839",  '&:hover': { backgroundColor: "#1096c3", },}} variant='contained'  onClick={handleUnShowAll} >Unselect All</Button>
            )}

                
            </div>

            <hr className='horizonLine'/>

            <div className="inputBoxBorder">
              <div className="inputFlexBox">
                <p>Vessels</p>
                <Checkbox sx={iconStyle}  checked={showAllVessels}  onChange={handleShowAllVessels}   />
              </div>
            </div>

            <div className="inputBoxBorder ">
              <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={marineTrafficIcon} alt="show name icon" />
                  <span>MarineTraffic</span>
                </div>
                  <Checkbox sx={iconStyle}  checked={showMarineTraffic}  onChange={handleMarineTraffic}   />
              </div>
            </div>

            <div className="inputBoxBorder mb-3">
              <div className="inputFlexBox">
                <div className="inputIconAndName">
                  <img src={traksatIcon1} alt="show name icon" />
                  <img src={traksatIcon2} alt="show name icon" />
                  <span>Traksat</span>
                </div>
                <Checkbox sx={iconStyle}  checked={showTrakSat} onChange={handleTrakSat}  />
              </div>
            {showTrakSat && (
               <div className='inputShowName'>
               <div className='box'>
                 <img src={nameIcon} alt="show name icon" />
                 <span >Show Vessel Name</span>
               </div>
               <Checkbox sx={iconStyle2}  checked={showDescription} onChange={() => setShowDescription(!showDescription)} />
             </div>

            )}
            </div>

            <hr className='horizonLine'/>
        
          <div className="inputBoxBorder mt-5">
            <div className="inputFlexBox">
                  <p>Aircrafts</p>
                 <Checkbox sx={iconStyle}  checked={showAllAircrafts}  onChange={handleShowAllAircrafts}   />
                </div>
            </div>
        
          
        <div className="inputBoxBorder ">
        <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={flightradarIcon} alt="show name icon" />
                  <span>FlightRadar</span>
                </div>
                  <Checkbox sx={iconStyle}   disabled={true}  />
              </div>
          </div>

          
          <div className="inputBoxBorder mb-5">
          <div className="inputFlexBox">
              <div className="inputIconAndName">
                <img src={spidertracksIcon1} className='spidertracksIcon'  alt="show name icon" />
                <img src={spidertracksIcon2}  className='spidertracksIcon' alt="show name icon" />
                <span>Spidertracks</span>
              </div>
              <Checkbox sx={iconStyle}  checked={showSpiderTrak}  onChange={handleSpiderTrak}  />
            </div>
          {showSpiderTrak && (
            <div className='inputShowName'>
              <div className='box'>
                <img src={nameIcon} alt="show name icon" />
                <span className='text-sm font-semibold'>Show Aircraft Name</span>
              </div>
              <Checkbox sx={iconStyle2}  checked={showSpiderTrakDesc} onChange={() => setShowSpiderTrakDesc(!showSpiderTrakDesc)}/>
            </div>
          )}

          </div>
        

          <hr className='horizonLine'/>
          <div className="inputBoxBorder mt-5">
            <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={weatherIcon} alt="show name icon" />
                <span>Weather</span>
              </div>
               <Checkbox sx={iconStyle}  checked={showWeather}   onChange={toggleWeather}    />
            </div>
          </div>

          <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={personnelIcon} alt="show name icon" />
                <span>Personnel</span>
              </div>
              <Checkbox sx={iconStyle}  checked={showPersonnel} onChange={handlePersonnel}    />
            </div>
            {showPersonnel && (
               <div>
                 <div className='inputShowName'>
                <div className='box'>
                  <img src={nameIcon} alt="show name icon" />
                  <span >Show Personnel Name</span>
                </div>
                <Checkbox sx={iconStyle2} checked={showAllUsernames} onChange={handleToggleShowAllUsernames} />
              </div>

              <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={nonUniformPersonnelIcon} alt="show name icon" />
                  <span>Non-Uniform</span>
                </div>
                <Checkbox sx={iconStyle2} checked={showNonUniform}  onChange={handleToggleNonUniform} disabled={showOnLeave || showRnr || showOnDuty }  />
              </div>

              
              <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={onDutyPersonnelIcon} alt="show name icon" />
                  <span>On Duty</span>
                </div>
                <Checkbox sx={iconStyle2}  checked={showOnDuty} onChange={handleToggleOnDuty} disabled={showOnLeave || showRnr || showNonUniform  } />
              </div>
       

          
              <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={onLeavePersonnelIcon} alt="show name icon" />
                  <span>On Leave</span>
                </div>
                <Checkbox  sx={iconStyle2} checked={showOnLeave}  onChange={handleToggleOnLeave}  disabled={showOnDuty || showRnr || showNonUniform}  />
              </div>

              
              <div className="inputFlexBox">
                <div className='inputIconAndName'>
                  <img src={rnrPersonnelIcon} alt="show name icon" />
                  <span>RnR</span>
                </div>
                <Checkbox  sx={iconStyle2} checked={showRnr}  onChange={handleToggleRnr} disabled={showOnDuty || showOnLeave || showNonUniform}  />
              </div>
              </div>
            )}
          </div>


      
       <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={incidentsIcon} alt="show name icon" />
                <span>Incidents</span>
              </div>
              <Checkbox  sx={iconStyle}  checked={showIncident} onChange={handleIncident}    />
            </div>
        </div>


        <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={officeIcon} alt="show name icon" />
                <span>Office</span>
              </div>
               <Checkbox sx={iconStyle}   checked={showOffice} onChange={handleOffice}    />
            </div>
        </div>

        <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={vehiclesIcon} alt="show name icon" />
                <span>Vehicles</span>
              </div>
              <Checkbox sx={iconStyle}  checked={showVehicles} onChange={handleVehicles}    />
            </div>
        </div>

        <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={cartrackIcon} alt="show name icon" />
                <span>Cartrack</span>
              </div>
             <Checkbox sx={iconStyle}   checked={showCarTrack} onChange={handleCarTrack}    />
            </div>
        </div>


        <div className="inputBoxBorder">
          <div className="inputFlexBox">
              <div className='inputIconAndName'>
                <img src={videostreamsIcon} alt="show name icon" />
                <span>Video Streams</span>
              </div>
            <Checkbox sx={iconStyle}  checked={showVideoStream} onChange={handleVideoStream}    />
            </div>
        </div>


        </div>
      </div>
    </Drawer>
  </div>
)
}
