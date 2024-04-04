/* eslint-disable react/prop-types */
import L from 'leaflet';
import cameramanImg from '../../../assets/cameraman.png';
import { useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

export default function VideoStreamMarker({ item, index, selectedVideoStream, handleVideoStreamMarkerClick, isVideoPlaying, handleToggleVideo, videoStreamUrl }){
    
  const map = useMap();
  const prevZoomRef = useRef(9);
  const startPosition = [item.glatitude, item.glongitude];

  const handleMarkerClick = () => {
    const isSameVideo = selectedVideoStream && selectedVideoStream.id === item.id;
    if (!isSameVideo) {
      prevZoomRef.current = map.getZoom();
      map.flyTo(startPosition, 12, {
        duration: 2, // Adjust duration as needed (in seconds)
        easeLinearity: 0.25 // Adjust ease linearity as needed
      });
    }
    handleVideoStreamMarkerClick(isSameVideo ? null : item);
  };return(
        <Marker
          key={`cargo-${index}`}
          position={[item.glatitude, item.glongitude]}
          icon={
            L.divIcon({
              className: '',
              html: `<div class="bgwhite-marker" ><img src="${cameramanImg}" alt="" /></div>`,
            })
          }
          eventHandlers={{
            click:handleMarkerClick
          }}
        >
    <Popup>
      {selectedVideoStream && selectedVideoStream.user === item.user && (
        <div className="popup_card">
          <h2>Video Stream</h2>
          <p>Username: <span>{selectedVideoStream.username}</span></p>
          <p>Lat: <span>{selectedVideoStream.latitude}</span></p>
          <p>Lon: <span>{selectedVideoStream.longitude}</span></p>
          <button onClick={() => handleToggleVideo()} className='bg-blue-500 flex w-full items-center justify-center text-white p-2 rounded-md mb-2'>Video</button>
          {isVideoPlaying ? 
            <div className="relative">
              <iframe className='absolute -left-20 rounded-md' width={500} height={400} src={`${videoStreamUrl}${item.username}`} ></iframe>
            </div>
            : null}
        </div>
      )}
    </Popup>
       </Marker>
      )
  }
  

