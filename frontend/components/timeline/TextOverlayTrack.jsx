'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MdTextFields } from "react-icons/md";

const TextOverlayTrack = ({ icon = <MdTextFields />, text = "Text" }) => {
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
    <div className="relative top-[18px] left-0 h-6 w-full rounded-md flex">
      {/* Left Green Box */}
      <div
        ref={greenBoxRef}
        onClick={() => setIsSelected(true)}
        className={`h-full w-[30%] bg-green-400 rounded-l-md rounded-r-[4px] opacity-70 flex items-center ${
          isSelected ? 'border-2 border-r-4 border-gray-100 rounded-r-[4px]' : ''
        }`}
      >
        {/* Dynamic Icon and Text */}
        <span className="text-gray-900 text-lg font-semibold ml-2 mr-1">{icon}</span>
        <span className="text-sm text-white">{text}</span>
      </div>

      {/* Right Box */}
      <div
        className={`h-full w-[70%] bg-[#222223] opacity-40 rounded-r-md rounded-l-[4px] ${
          isSelected ? 'border-[1px] opacity-10 border-l-0 border-gray-100 ' : ''
        }`}
      ></div>
    </div>
  );
};

export default TextOverlayTrack;