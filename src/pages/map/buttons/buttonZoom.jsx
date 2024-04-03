/* eslint-disable react-hooks/rules-of-hooks */
import { useMap } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { RiSubtractFill } from "react-icons/ri";

export default function buttonZoom() {
  const map = useMap();

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="buttonZoomContainer">
      <button className="btnZoomIn" onClick={zoomIn}>
        <FiPlus />
      </button>
      <button className="btnZoomOut" onClick={zoomOut}>
        <RiSubtractFill />
      </button>
    </div>
  );
}
