 /* eslint-disable react/prop-types */
 /* eslint-disable react/prop-types */
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styled from 'styled-components';
import './ButtonsStyle.css'

// Styled ToggleButtonGroup
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  && {
    background-color: rgba(255, 255, 255, 0.846); /* #fff with 50% opacity */
    border-radius: 10px; /* Border radius */
    overflow:hidden;
   
  }
`;

// Styled ToggleButton
const StyledToggleButton = styled(ToggleButton)`
  border: 0;
  font-family:"Manrope", "sans-serif";
  width:100px;
  font-size: 11px;
  font-weight:800;
  text-transform: capitalize;
  && {
    color: #000; /* Text color */
    &.MuiToggleButton-root.Mui-selected {
      background-color: #fff;
      border-radius: 7px;
      margin: 7px;
      box-shadow:0 0 5px #00000048;
    }
    &:hover {
      background-color: transparent; /* Remove hover effect */
    }
  }
`;

export default function MapLayerSelector({ mapLayer, setMapLayer }) {


  const handleMapLayerChange = (event, newMapLayer) => {
    if (newMapLayer !== null) {
      setMapLayer(newMapLayer);
    }
  };

  return (
      <div className="btnMapContainer">
      <StyledToggleButtonGroup
            value={mapLayer}
            onChange={handleMapLayerChange}
            aria-label="map layers"
            exclusive
          >
            <StyledToggleButton value="osm">Satellite</StyledToggleButton>
            <StyledToggleButton value="google">Google Map</StyledToggleButton>
            <StyledToggleButton value="windy">Windy</StyledToggleButton>
          </StyledToggleButtonGroup>
    </div>
  );
}

// import { FaLayerGroup } from "react-icons/fa";
// import { useState,  } from "react";
// import Popover from '@mui/material/Popover';

// export default function MapLayerSelector({ mapLayer, setMapLayer }) {
//   const [show, setShow] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
 

//   return (
//     <div className="map-layer-selector">
//       <div className="select_wrapper" >
//         {show ? (
//           <select
//             className="select_map_layer"
//             value={mapLayer}
//             onChange={(e) => setMapLayer(e.target.value)}
//           >
//             <option value="osm">Satellite Maps</option>
//             <option value="google">Google Maps</option>
//             {/* Add Windy Maps option */}
//             <option value="windy">Windy Maps</option>
//           </select>
//         ) : null}
//       </div>
//       <button
//         aria-owns={open ? 'mouse-over-popover' : undefined}
//         aria-haspopup="true"
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       className="btn_filter" onClick={() => setShow(!show)}>
//         <FaLayerGroup className="map-layer-icon" />
//       </button>
//       <Popover
//         id="mouse-over-popover"
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handlePopoverClose}
//         anchorOrigin={{
//           vertical: 'left',
//           horizontal: 'top',
//         }}
//        sx={{marginLeft:"-50px"}}
//       >
//         <div className='p-1'>Maps</div>
//       </Popover>
//     </div>
//   );
// }
