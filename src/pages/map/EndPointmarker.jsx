/* eslint-disable react/prop-types */
// EndPointMarker.js
import { useMapEvents } from 'react-leaflet';

const EndPointMarker = ({ onEndDrag }) => {
  useMapEvents({
    click: onEndDrag,
  });

  return null;
};

export default EndPointMarker;
