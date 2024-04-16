/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import './ButtonsStyle.css'
import { CgArrowsExpandRight } from "react-icons/cg";
import { CgArrowsExpandRightAlt } from "react-icons/cg";
import Popover from '@mui/material/Popover';

export default function BtnFullScreenMap({ isFullscreen, toggleFullscreen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <div className="btnFullscreenContainer">
      <div
       onMouseEnter={handlePopoverOpen}
       onMouseLeave={handlePopoverClose}
        onClick={toggleFullscreen}
        className={isFullscreen ? 'btnFullscreenExit' : 'btnFullscreen'}
      >
        {isFullscreen ? <CgArrowsExpandRightAlt/> : <CgArrowsExpandRight />}
      </div>
  <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          marginLeft:1,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
    
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <p className="font-manrope text-sm font-bold p-3 ">Map Fullscreen</p>
      </Popover>
      
    </div>
  );
}
