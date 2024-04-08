/* eslint-disable react/prop-types */
import L from 'leaflet';
import videostreamIcon from '../../../assets/icon/video_streams.svg';
import { useRef, useState } from 'react';
import { Marker,  useMap } from 'react-leaflet';
import Draggable from 'react-draggable';
import { IoCloseSharp } from "react-icons/io5";
import Iframe from 'react-iframe'
import { videoStreamUrl } from '../../../api/api_urls';

export default function VideoStreamMarker({ item, index, selectedVideoStream, handleVideoStreamMarkerClick}) {
    
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude, item.glongitude];
  const [showSelectedInfo, setShowSelectedInfo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // State to track video playing

  const handleMarkerClick = () => {
    setShowSelectedInfo(true);
    prevZoomRef.current = map.getZoom();
    map.flyTo(startPosition, 12, {
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

  const handleToggleVideo = () => {
    setIsPlaying(!isPlaying); // Toggle video playing state
  }

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

            {isPlaying ?  <Iframe url={`${videoStreamUrl}${item.username}`} id="myId" className="w-[400px] h-[200px]"/> : null}
           <div className="videoCardDetail">
            <span>
             <p>Username: </p>
             <h3>{selectedVideoStream.username}</h3>
            </span>
            <button onClick={handleToggleVideo} className={`videoCardBtn ${isPlaying ? 'bg-[#EB5454]' : 'bg-[#0DB0E6]'}`}>
              {isPlaying ? 'Pause Video' : 'Play Video'}
            </button>
           </div>
          </div>
        </Draggable>
      )}
    </Marker>
  );
}