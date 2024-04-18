import L from 'leaflet';
import vesselMarker from '../../../../assets/marker-2.svg';

const TraksatIcon = new L.Icon({
  iconUrl: vesselMarker,
  iconSize: [20, 20],
  iconAnchor: [12, 10],
});

export default TraksatIcon;
