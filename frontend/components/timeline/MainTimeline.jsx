'use client';
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
import ImageBar from './ImageBar';
import SubtitlesBar from './SubtitlesBar';
import TimeBar from './timeBar';


const MainTimeline = ({ videoRef, isPlaying, onPlay, onPause, onRewind, onForward,Duration,playheadPosition }) => {
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  const duration=Duration;
  const currentState = useSelector((state) => state.currentVideo);

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

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef]);

  useEffect(() => {
    console.log(currentState);
  }, [currentState]);

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1) * 1000);
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  const getTimeTicks = () => {
    const ticks = [];
    const tickInterval = 3; // in seconds
    const tickCount = Math.floor(duration / tickInterval);

    for (let i = 1; i <= tickCount; i++) {
      ticks.push(i * tickInterval);
    }
    return ticks;
  };

  return (
    <div
      className="fixed bottom-0 left-[96px] h-[300px] bg-[#252528] border-t border-gray-100 shadow-lg p-4 flex flex-col justify-between"
      style={{ width: 'calc(100% - 96px)' }}
    >
      {/* Top Controls Row */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-3">
          <CurlBackButton />
          <CurlForwardButton />
          <SplitButton />
          <DeleteButton />
        </div>

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
            <span className="text-gray-300 text-sm">{formatTime(duration)}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span>-</span>
          <div className="h-1 w-16 bg-gray-500"></div>
          <span>+</span>
          <span className="text-gray-300 text-sm">Fit</span>
        </div>
      </div>

      {/* Time Bar (New row between controls and timeline)
      <div className="w-full h-4 bg-gray-800 relative mb-4">
        {getTimeTicks().map((time, index) => {
          const widthPercentage = (time / duration) * 100;
          return (
            <div
              key={index}
              className="absolute top-0 text-md text-white"
              style={{
                left: `${widthPercentage}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {formatTime(time)}
            </div>
          );
        })}
      </div> */}


        <TimeBar position={playheadPosition} duration={duration}/>
      {/* Second Row (Timeline Content) */}
      <div className="w-full h-[190px] bg-gray-600 rounded-lg relative overflow-y-auto">
        <SplitLine position={playheadPosition}/>
        {currentState.map((item, index) => {
          if (item.type.startsWith('audio/')) {
            return (
              <div key={index} className="my-2">
                <AudioOverlayTrack text={item.name} />
              </div>
            );
          } else if (item.type.startsWith('video/')) {
            return (
              <div key={index} className="my-2">
                <VideoProgressBar text={item.title} />
              </div>
            );
          } else if (item.type.startsWith('image/')) {
            return (
              <div key={index} className="my-2">
                <ImageBar text={item.title} />
              </div>
            );
          } else if (item.type.startsWith('subtitles')) {
            return (
              <div key={index} className="my-2">
                <SubtitlesBar text={item.title} />
              </div>
            ); 
          } else if (item.type.startsWith('text/')) {
            return (
              <div key={index} className="my-2">
                <TextOverlayTrack text={item.title} />
              </div>
            );
          }
          else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
};

export default MainTimeline;
