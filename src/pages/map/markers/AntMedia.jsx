/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { WebPlayer } from "@antmedia/web_player";

export default function AntMedia({ streamKey }) {
  const videoRef = useRef(null);
  const placeHolderRef = useRef(null);
  const embeddedPlayerRef = useRef(null);
  const playOrderLocal = ["webrtc", "hls", "dash"];
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!streamKey) {
      console.warn("Stream id is not set");
      setMessage("No Stream ID")
      return;
    }
    
    embeddedPlayerRef.current = new WebPlayer({
      streamId: streamKey,
      httpBaseURL: "https://media1.tambuli-demo-02.xyz:5443/WebRTCApp/",
      videoHTMLContent: '<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered" controls playsinline style="width:100%;height:100%"></video>',
      playOrder: playOrderLocal
    }, videoRef.current, placeHolderRef.current);
    
    embeddedPlayerRef.current.initialize().then(() => {
      embeddedPlayerRef.current.play();
    }).catch((error) => {
      console.error("Error while initializing embedded player: " + error);
    });
  }, []);

  return (
    <div className='font-manrope bg-slate-200'>
        {streamKey ? (
          <div className='flex h-[360px] w-[400px]' ref={videoRef} id="video_container"></div>
        ):(
        <p className='font-manrope font-bold text-center p-2'>{message}</p>
        )}
    </div>
  );
}
