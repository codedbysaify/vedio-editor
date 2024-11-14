'use client'
import React, { useState, useEffect, useRef } from 'react';

const TextOverlayTrack = () => {
  const [isSelected, setIsSelected] = useState(false);
  const greenBoxRef = useRef(null);

  // Handle clicks outside of the green box to remove the border
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (greenBoxRef.current && !greenBoxRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-10 left-0 h-5 w-full rounded-md flex">
      {/* Left Green Box */}
      <div
        ref={greenBoxRef}
        onClick={() => setIsSelected(true)}
        className={`h-full w-[30%] bg-green-400 rounded-l-md rounded-r-[4px] opacity-70 ${
          isSelected ? 'border-2 border-r-4 border-gray-100 rounded-r-[4px]' : ''
        }`}
      ></div>

      {/* Right Box */}
      <div
        className={`h-full w-[70%] bg-[#222223] opacity-40 rounded-r-md rounded-l-[4px]${
          isSelected ? 'border-[1px] opacity-10 border-l-0 border-gray-100 ' : ''
        }`}
      ></div>
    </div>
  );
};

export default TextOverlayTrack;
