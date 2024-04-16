/* eslint-disable react-hooks/rules-of-hooks */
import { RiFilterFill,RiFilterLine } from "react-icons/ri";
import Popover from '@mui/material/Popover';
import { useState } from "react";


export default function buttonToggleDrawer({ toggleDrawer, handleToggleDrawer }) {
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
    <button className='btnToggleDrawer'
    onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}
       onClick={handleToggleDrawer}>
      {  toggleDrawer ? <RiFilterFill /> : <RiFilterLine/> }
     
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
    <p className="font-manrope text-sm font-bold p-3 ">Filter Drawer</p>
    </Popover>
    </>
  )
}
