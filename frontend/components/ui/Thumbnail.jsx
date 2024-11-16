"use client"
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCurrentVideo } from "@/components/statemanagement/slices/currentObjects";
import { FaPlay } from "react-icons/fa";

export default function ThumbnailGenerator({ url, name, type }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const thumbnailRef = useRef(null);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(addToCurrentVideo({
      url,
      title: name,
      type: type
    }));
  };

  useEffect(() => {
    const mediaElement = type.startsWith('video') ? videoRef.current : audioRef.current;

    if (mediaElement) {
      mediaElement.onloadedmetadata = () => {
        setDuration(mediaElement.duration);
      };
    }
  }, [url, type]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderMedia = () => {
    if (type.startsWith('video')) {
      return (
        <video 
          ref={videoRef} 
          src={url} 
          muted 
          className="w-full h-full object-cover cursor-pointer"
          onClick={clickHandler}
        />
      );
    }

    if (type.startsWith('audio')) {
      return (
        <div 
          className="w-full h-full bg-gray-900 flex items-center justify-center relative cursor-pointer"
          onClick={clickHandler}
        >
          <audio ref={audioRef} src={url} className="hidden" />
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <FaPlay className="text-white text-xl ml-1" />
          </div>
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-white text-xs truncate">{name}</p>
          </div>
        </div>
      );
    }

    if (type.startsWith('image')) {
      return (
        <img 
          src={url} 
          alt={name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={clickHandler}
        />
      );
    }

    return (
      <div 
        className="w-full h-full bg-gray-100 flex items-center justify-center cursor-pointer"
        onClick={clickHandler}
      >
        <span className="text-gray-500 text-sm">Unsupported format</span>
      </div>
    );
  };

  return (
    <div 
      className="relative bg-black" 
      ref={thumbnailRef}
    >
      {renderMedia()}
      
      {/* Duration overlay for video and audio */}
      {(type.startsWith('video') || type.startsWith('audio')) && (
        <div className="absolute bottom-2 left-2 bg-black/75 text-white py-1 px-3 rounded-md text-sm">
          {duration ? formatDuration(duration) : 'loading...'}
        </div>
      )}
    </div>
  );
}