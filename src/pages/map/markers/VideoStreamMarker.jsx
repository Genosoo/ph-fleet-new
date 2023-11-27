/* eslint-disable react/prop-types */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import cameramanImg from '../../../assets/cameraman.png';

const VideoStreamMarker = ({ item, index, selectedVideoStream, handleVideoStreamMarkerClick, isVideoPlaying, handleToggleVideo, videoStreamUrl }) => (
  <Marker
    key={`cargo-${index}`}
    position={[item.glatitude, item.glongitude]}
    icon={
      L.divIcon({
        className: 'personnel-marker',
        html: `<div class="personnel-icon" ><img src="${cameramanImg}" alt="" /></div>`,
      })
    }
    eventHandlers={{
      click: () => {
        handleVideoStreamMarkerClick(item);
      },
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
);

export default VideoStreamMarker;
