'use client'
import React, { useState, useEffect, useRef } from 'react';
import { IoImage } from "react-icons/io5";

const SubtitlesBar = ({ icon = <IoImage />, text = "subtitles" }) => {
  const [isSelected, setIsSelected] = useState(false);
  const purpleBoxRef = useRef(null);

  // Handle clicks outside of the blue box to remove the border
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (purpleBoxRef.current && !purpleBoxRefBoxRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // top-[70px]
  return (
    <div className="relative  mb-1 left-0 h-6 w-full rounded-md flex">
      {/* Left Blue Box */}
      <div
        ref={purpleBoxRef}
        onClick={() => setIsSelected(true)}
        className={`h-full w-[30%] bg-purple-500 rounded-l-md rounded-r-[4px] flex items-center opacity-70 ${
          isSelected ? 'border-2 border-r-4 border-gray-100 rounded-r-[4px]' : ''
        }`}
      >
        {/* Dynamic Icon and Text */}
        <span className="text-gray-900 text-lg font-semibold ml-2 mr-1">{icon}</span>
        <span className="text-sm text-white">{text}</span>
      </div>

      {/* Right Gray Box */}
      <div
        className={`h-full w-[70%] bg-[#222223] opacity-40 rounded-r-md rounded-l-[4px] ${
          isSelected ? 'bg-[#222223] border-[1px] opacity-10 border-l-0 border-gray-100 rounded-l-[4px]' : ''
        }`}
      ></div>
    </div>
  );
};

export default SubtitlesBar;