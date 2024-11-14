'use client'
import React, { useState, useEffect, useRef } from 'react';

const AudioOverlayTrack = () => {
  const [isSelected, setIsSelected] = useState(false);
  const redBoxRef = useRef(null);

  // Handle clicks outside of the red div to remove the border
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (redBoxRef.current && !redBoxRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-[124px] left-0 h-9 w-full rounded-md  flex items-center">
      {/* Left Red Box */}
      <div
        ref={redBoxRef}
        onClick={() => setIsSelected(true)}
        className={`h-full w-1/2 bg-red-500 rounded-s opacity-80 rounded-r-[4px] ${
          isSelected ? 'border-2 border-r-4 border-white rounded-r-[8px]' : ''
        }`}
      ></div>

      {/* Right Div */}
      <div
        className={`h-full w-1/2 bg-[#25228] opacity-40 rounded-sm bg-[#222223] rounded-l-[4px] ${
          isSelected ? 'bg-[#222223] border-[1px] opacity-10 border-l-0 border-gray-100 rounded-l-[4px]' : ''
        }`}
      ></div>
    </div>
  );
};

export default AudioOverlayTrack;
