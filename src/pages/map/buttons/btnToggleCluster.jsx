/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Popover from '@mui/material/Popover';
import { BsStopCircleFill, BsStopCircle } from "react-icons/bs";

export default function btnToggleCluster({handleToggleCluster, withCluster }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <>
     <button 
     onMouseEnter={handlePopoverOpen}
     onMouseLeave={handlePopoverClose}
     onClick={handleToggleCluster} 
     className="btnCluster" >
     { withCluster ? <BsStopCircle />  : <BsStopCircleFill /> }
    </button>
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
        <p className="font-manrope text-sm font-bold p-3 ">Cluster</p>
      </Popover>
    </>
  )
}
