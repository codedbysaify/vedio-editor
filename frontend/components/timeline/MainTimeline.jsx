'use client'
import React, { useEffect, useState } from 'react';
import { FaBackward, FaPause, FaPlay, FaForward } from 'react-icons/fa';
import CurlBackButton from './CurlBackutton';
import CurlForwardButton from './CurlForwardButton';
import SplitButton from './SplitButton';
import DeleteButton from './DeleteButton';
import VideoProgressBar from './VideoProgressBar';
import TextOverlayTrack from './TextOverlayTrack';
import AudioOverlayTrack from './AudioOverlayTrack';
import SplitLine from './SplitLine';
import { useSelector } from 'react-redux';

const MainTimeline = ({ videoRef, isPlaying, onPlay, onPause, onRewind, onForward }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentState=useSelector((state)=>state.currentState)
  //! [{url:"",name:"",type:""},{url:"",name:"",type:""},{url:"",name:"",type:""}]
  useEffect(() => {
    const videoElement = videoRef?.current;
    let animationFrameId;

    const updateCurrentTime = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
        animationFrameId = requestAnimationFrame(updateCurrentTime);
      }
    };

    if (isPlaying && videoElement) {
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, videoRef]);

  useEffect(() => {
    const videoElement = videoRef?.current;

    if (videoElement) {
      const handleLoadedMetadata = () => setDuration(videoElement.duration);

      // Attach event listener for duration
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef]);

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1) * 1000);
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div
      className="fixed bottom-0 left-[96px] h-[300px] bg-[#252528] border-t border-gray-100 shadow-lg p-4 flex flex-col justify-between"
      style={{ width: 'calc(100% - 96px)' }}
    >
      {/* Top Controls Row */}
      <div className="flex justify-between mb-4">
        {/* First Div: Editing Controls */}
        <div className="flex space-x-3">
          <CurlBackButton />
          <CurlForwardButton />
          <SplitButton />
          <DeleteButton />
        </div>

        {/* Second Div: Video Playback Controls */}
        <div className="flex space-x-3 items-center">
          <button onClick={onRewind} className="hover:text-gray-500">
            <FaBackward />
          </button>
          <button onClick={isPlaying ? onPause : onPlay} className="text-2xl hover:text-gray-500">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={onForward} className="hover:text-gray-500">
            <FaForward />
          </button>
          <span className="flex space-x-1">
            <span className="text-gray-300 text-sm">{formatTime(currentTime)}</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-gray-300 text-sm">{formatTime(duration)}</span> {/* Time duration */}
          </span>
        </div>

        {/* Third Div: Zoom Control */}
        <div className="flex items-center space-x-2">
          <span>-</span>
          <div className="h-1 w-16 bg-gray-500"></div>
          <span>+</span>
          <span className="text-gray-300 text-sm">Fit</span>
        </div>
      </div>

      {/* Second Row (Timeline Content) */}
      <div className="w-full h-[170px] bg-gray-600 rounded-lg relative">
        <TextOverlayTrack />
        <VideoProgressBar />
        <AudioOverlayTrack />
        <SplitLine />
      </div>
    </div>
  );
};

export default MainTimeline;
