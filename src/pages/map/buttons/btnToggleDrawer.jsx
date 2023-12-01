/* eslint-disable react-hooks/rules-of-hooks */
import { FaFilter } from "react-icons/fa6";
import Popover from '@mui/material/Popover';
import { useState } from 'react';


export default function buttonToggleDrawer({ toggleDrawer}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
 <div>
   <button  aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} className='button_toggle_drawer'
       onClick={toggleDrawer}>
     <FaFilter />
   </button>
   
   <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'left',
          horizontal: 'top',
        }}
       sx={{marginLeft:"-45px"}}
      >
        <div className='p-1  '>Filter</div>
      </Popover>
 </div>
  )
}
