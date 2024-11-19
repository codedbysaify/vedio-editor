// src/components/SplitLine.jsx
"use client"
import React, { useState,useEffect } from 'react';
import { FaCaretUp } from 'react-icons/fa';

const SplitLine = ({ position}) => {
  const [isDragging, setIsDragging] = useState(false);
  

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Calculate new position as a percentage based on mouse position
      const newPosition = Math.min(Math.max((e.clientX / window.innerWidth) * 100, 0), 100);
      onPositionChange(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };




  return (
    <div
      className="absolute h-full w-[2px] bg-red-500 z-50 cursor-pointer transition-left duration-200 ease-out"
      style={{  left: `${position}%`, transitionProperty: 'left'  }}
      onMouseDown={handleMouseDown}
    >
      {/* Downward-facing arrow at the top of the line, aligned with its edge */}
      <FaCaretUp className="absolute text-red-500 -top-2 left-1/2 transform -translate-x-1/2 rotate-180" />
    </div>
  );
};

export default SplitLine;
