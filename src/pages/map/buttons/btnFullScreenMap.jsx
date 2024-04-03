/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import './ButtonsStyle.css'
import { CgArrowsExpandRight } from "react-icons/cg";
import { CgArrowsExpandRightAlt } from "react-icons/cg";

export default function BtnFullScreenMap({ isFullscreen, toggleFullscreen }) {
  const [anchorEl, setAnchorEl] = useState(null);



  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="btnFullscreenContainer">
      <div
        onClick={toggleFullscreen}
        className={isFullscreen ? 'btnFullscreenExit' : 'btnFullscreen'}
      >
        {isFullscreen ? <CgArrowsExpandRightAlt/> : <CgArrowsExpandRight />}
      </div>

      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'left',
          horizontal: 'top',
        }}
       sx={{marginLeft:"-80px"}}
      >
        <div className='p-1  '>Fullscreen</div>
      </Popover>
    </div>
  );
}
