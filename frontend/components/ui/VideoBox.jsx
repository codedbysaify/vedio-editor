'use client'
import React, { useRef, useEffect, useState } from 'react';

function VideoBox({ mediaSrc, isVideo }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isVideo && mediaSrc && videoRef.current) {
      videoRef.current.pause(); // Ensure the video doesn't play automatically until it's clicked
    }
  }, [mediaSrc, isVideo]);

  const handlePlayPauseClick = () => {
    if (isVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="w-[950px] h-[320px] bg-transparent fixed right-0 top-0 border border-b-0 border-gray-300 p-4 shadow-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Untitled Media</h2>
        <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
          Export
        </button>
      </div>

      <div className="flex justify-center items-center w-full h-[230px] bg-transparent">
        <div className="relative w-[150px] h-full border overflow-hidden shadow-sm flex justify-center items-center">
          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaSrc}
              className="w-full h-auto object-contain"
              controls
              style={{ pointerEvents: 'auto' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={mediaSrc} alt="Uploaded Media" className="w-full h-auto object-contain" />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoBox;
