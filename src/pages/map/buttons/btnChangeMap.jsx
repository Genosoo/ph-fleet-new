/* eslint-disable react/prop-types */
import { FaLayerGroup } from "react-icons/fa";
import { useState,  } from "react";
import Popover from '@mui/material/Popover';

export default function MapLayerSelector({ mapLayer, setMapLayer }) {
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
 

  return (
    <div className="map-layer-selector">
      <div className="select_wrapper" >
        {show ? (
          <select
            className="select_map_layer"
            value={mapLayer}
            onChange={(e) => setMapLayer(e.target.value)}
          >
            <option value="osm">Satellite Maps</option>
            <option value="google">Google Maps</option>
          </select>
        ) : null}
      </div>
      <button
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      className="btn_filter" onClick={() => setShow(!show)}>
        <FaLayerGroup className="map-layer-icon" />
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
       sx={{marginLeft:"-50px"}}
      >
        <div className='p-1'>Maps</div>
      </Popover>
    </div>
  );
}
