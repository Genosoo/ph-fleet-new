/* eslint-disable react/prop-types */
import L from 'leaflet';
import videostreamIcon from '../../../assets/icon/video_streams.svg';
import { useRef, useState } from 'react';
import { Marker,  useMap } from 'react-leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";
// import Iframe from 'react-iframe'
// import { videoStreamUrl } from '../../../api/api_urls';
import AntMedia from './AntMedia';

export default function VideoStreamMarker({ item, index, selectedVideoStream, handleVideoStreamMarkerClick}) {
    
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude, item.glongitude];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 9, {
      duration: 2, // Adjust duration as needed (in seconds)
      easeLinearity: 0.25 // Adjust ease linearity as needed
    });
    handleVideoStreamMarkerClick(item);
  }

  const handleCloseButtonClick = () => {
    setShowSelectedInfo(false);
    handleVideoStreamMarkerClick(null);
    map.setView([item.glatitude, item.glongitude], prevZoomRef.current);
  };



  const handleDrag = (e) => {
    e.stopPropagation();
  };

  return (
    <Marker
      key={`cargo-${index}`}
      position={[item.glatitude, item.glongitude]}
      icon={
        L.divIcon({
          className: `video-marker ${selectedVideoStream && selectedVideoStream.id === item.id ? 'selected-video' : ""}`,
          html: `<div class="bgwhite-marker">
          <img src="${videostreamIcon}" alt="" />
          </div>`,
        })
      }
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      {showSelectedInfo && selectedVideoStream && selectedVideoStream.id === item.id && (
        <Draggable onDrag={handleDrag}>
          <div className="videoCardContainer">
            <div className="videoCardHeader">
              <div className="flex items-center gap-3">
                <img src={videostreamIcon} alt="" />
              <h3>Video Stream</h3></div>
              <IoCloseSharp className='videoClose' onClick={() => handleCloseButtonClick()} />
            </div>
            <AntMedia  streamKey={item.stream_key} />
            {/* {<Iframe url={`${videoStreamUrl}WebRTCApp/play.html?id=${item.stream_key}`} id="myId" className="w-[550px] h-[400px]"/>} */}
           <div className="videoCardDetail">
            <span>
             <p>Username: </p>
             <h3>{selectedVideoStream?.username || "N/A"}</h3>
            </span>

            <span>
              <p>Accuracy: </p>
              <h3>{selectedVideoStream?.accuracy || "N/A"}</h3>
            </span>

            <span>
              <p>Altitude: </p>
              <h3>{selectedVideoStream?.altitude || "N/A"}</h3>
            </span>

            <span>
              <p>Heading: </p>
              <h3>{selectedVideoStream?.heading || "N/A"}</h3>
            </span>

            <span>
              <p>Provider: </p>
              <h3>{selectedVideoStream?.provider || "N/A"}</h3>
            </span>

            <span>
              <p>Coordinates: </p>
              <h3>{selectedVideoStream?.glatitude}, {selectedVideoStream?.glongitude}</h3>
            </span>

           </div>
          </div>
        </Draggable>
      )}
    </Marker>
  );
}