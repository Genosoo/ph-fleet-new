import L from 'leaflet';
import vesselMarker from '../../../../assets/marker.svg';

const CustomIcon = new L.Icon({
  iconUrl: vesselMarker,
  iconSize: [20, 20],
  iconAnchor: [12, 10],
});

export default CustomIcon;
