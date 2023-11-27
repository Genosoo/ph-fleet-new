/* eslint-disable react/prop-types */
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
  } from '@mui/material';
  
  import cameramanImg from '../../../assets/cameraman.png'
  import personnelImg from '../../../assets/personnel.svg'

  import helicopterImg from '../../../assets/helicopter.svg'
  import airplaneImg from '../../../assets/airplane.svg'
  import weatherImg from '../../../assets/weather.svg'
  import campImg from '../../../assets/camp.svg'
  
export default function FilterDrawer({
    isDrawerOpen,
    toggleDrawer,
    showMarineTraffic,
    handleMarineTraffic,
    showTrakSat,
    handleTrakSat,
    showLabel,
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
    toggleWeather,

    handleOffice,
    showOffice,
  }) {
  return (
    <Drawer
    anchor="right"
    variant="persistent"
    open={isDrawerOpen}
    onClose={toggleDrawer}
    hideBackdrop={true}
  
  >
    <List>
      <ListItem>
        <ListItemIcon>
          <span className="ml-3 text-[30px] text-[yellow]">🢙</span>
        </ListItemIcon>
        <ListItemText primary="Marine Traffic" />
        <Checkbox checked={showMarineTraffic} onChange={handleMarineTraffic} />
      </ListItem>

      <ListItem >
        <ListItemIcon>
          <div className="flex gap-2 ">
            <span className="ml-3 bg-white p-1 rounded-full">
              <img src="https://traksat.net/i/arrow1.png" alt="" />
            </span>
            <span className="bg-white p-1 rounded-full">
              <div className="circle-marker"></div>
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="TrakSat" />
        <Checkbox checked={showTrakSat} onChange={handleTrakSat} />
      </ListItem>

      {showLabel && (
        <ListItem>
          <ListItemText primary="Vessels Name" />
          <Checkbox
            checked={showDescription}
            onChange={() => setShowDescription(!showDescription)}
          />
        </ListItem>
      )}

      <ListItem>
        <ListItemIcon>
        <span className="ml-3 p-1  w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={airplaneImg} alt="" />
              <img src={helicopterImg} alt="" />
            </span>
        </ListItemIcon>
        <ListItemText primary="SpiderTrak" />
        <Checkbox checked={showSpiderTrak} onChange={handleSpiderTrak} />
      </ListItem>

      {showSpiderTrak && (
        <ListItem>
          <ListItemText primary="Aircraft Name" />
          <Checkbox
            checked={showSpiderTrakDesc}
            onChange={() => setShowSpiderTrakDesc(!showSpiderTrakDesc)}
          />
        </ListItem>
      )}

      <ListItem>
        <ListItemIcon>
          <div className="flex gap-2">
            <span className="ml-3 bg-white w-[30px] flex items-center justify-center h-[30px] rounded-full">
              📡
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Flight Radar" />
        {/* Add your Checkbox and onChange here */}
      </ListItem>

      <ListItem>
        <ListItemIcon>
        <span className="ml-3 p-1  w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={weatherImg} alt="" />
            </span>
        </ListItemIcon>
        <ListItemText primary="Weather" />
        <Checkbox  onChange={toggleWeather} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="flex gap-2">
            <span className="ml-3 p-1 bg-white w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={personnelImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Personnel" />
        <Checkbox checked={showPersonnel} onChange={handlePersonnel} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="flex gap-2">
            <span className="ml-3 p-1 bg-white w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={campImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Office" />
        <Checkbox checked={showOffice} onChange={handleOffice} />
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <div className="flex gap-2">
            <span className="ml-3 bg-white w-[30px] flex items-center justify-center h-[30px] rounded-full">
              <img src={cameramanImg} alt="" />
            </span>
          </div>
        </ListItemIcon>
        <ListItemText primary="Video Streams" />
        <Checkbox checked={showVideoStream} onChange={handleVideoStream} />
      </ListItem>
    </List>
  </Drawer>
  )
}
