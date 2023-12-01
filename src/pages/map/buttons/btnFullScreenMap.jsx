/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
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
    <div className="btn_fullscreen_wrapper">
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={toggleFullscreen}
        className={isFullscreen ? 'btn_fullscreen_exit' : 'btn_fullscreen'}
      >
        {isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
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
