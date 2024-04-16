/* eslint-disable react-hooks/rules-of-hooks */
import { useMap } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { RiSubtractFill } from "react-icons/ri";
import { useState } from "react";
import Popover from '@mui/material/Popover';


export default function buttonZoom() {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const [popoverZoomIn, setPopoverZoomIn] = useState(null);
  const [popoverZoomOut, setPopoverZoomOut] = useState(null);


  const openZoomIn = Boolean(popoverZoomIn);
  const openZoomOut = Boolean(popoverZoomOut);

  const handlePopoverOpenZoomIn = (event) => {
    setPopoverZoomIn(event.currentTarget);
  };

  const handlePopoverCloseZoomIn = () => {
    setPopoverZoomIn(null);
  };

  const handlePopoverOpenZoomOut = (event) => {
    setPopoverZoomOut(event.currentTarget);
  };

  const handlePopoverCloseZoomOut = () => {
    setPopoverZoomOut(null);
  };




  return (
    <>
    <div className="buttonZoomContainer">
      <button className="btnZoomIn" 
       onMouseEnter={handlePopoverOpenZoomIn}
       onMouseLeave={handlePopoverCloseZoomIn}
      onClick={zoomIn}>
        <FiPlus />
      </button>
      <button 
         onMouseEnter={handlePopoverOpenZoomOut}
         onMouseLeave={handlePopoverCloseZoomOut}
      className="btnZoomOut" onClick={zoomOut}>
        <RiSubtractFill />
      </button>
    </div>
     <Popover
     id="mouse-over-popover"
     sx={{
       pointerEvents: 'none',
       marginLeft:1,
     }}
     open={openZoomIn}
     anchorEl={popoverZoomIn}
     anchorOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
 
     onClose={handlePopoverCloseZoomIn}
     disableRestoreFocus
   >
     <p className="font-manrope text-sm font-bold p-3 ">Map Zoom In</p>
   </Popover>

   <Popover
     id="mouse-over-popover"
     sx={{
       pointerEvents: 'none',
       marginLeft:1,
     }}
     open={openZoomOut}
     anchorEl={popoverZoomOut}
     anchorOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
 
     onClose={handlePopoverCloseZoomOut}
     disableRestoreFocus
   >
     <p className="font-manrope text-sm font-bold p-3 ">Map Zoom Out</p>
   </Popover>
    </>
  );
}
