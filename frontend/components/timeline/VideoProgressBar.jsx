'use client'
import React, { useState, useEffect, useRef } from 'react';

const VideoProgressBar = () => {
  const [isSelected, setIsSelected] = useState(false);
  const blueBoxRef = useRef(null);

  // Handle clicks outside of the blue box to remove the border
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (blueBoxRef.current && !blueBoxRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-16 left-0 h-14 w-full rounded-md flex">
      {/* Left Blue Box */}
      <div
        ref={blueBoxRef}
        onClick={() => setIsSelected(true)}
        className={`h-full w-[30%] bg-blue-400 rounded-l-md rounded-r-[4px] ${
          isSelected ? 'border-2 border-r-4 border-gray-100 rounded-r-[4px]' : ''
        }`}
      ></div>

      {/* Right Gray Box */}
      <div
        className={`h-full w-[70%] bg-[#222223] opacity-40 rounded-r-md rounded-l-[4px] ${
          isSelected ? 'bg-[#222223] border-[1px] opacity-10 border-l-0 border-gray-100 rounded-l-[4px]' : ''
        }`}
      ></div>
    </div>
  );
};

export default VideoProgressBar;
