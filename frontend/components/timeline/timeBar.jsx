// src/components/TimeBar.jsx
import React from 'react';

const TimeBar = ({ position, duration }) => {
  // Generate time markers based on the video duration
  const timeMarkers = Array.from(
    { length: 11 }, // Divides into 10 sections, adjust as needed
    (_, i) => ((duration / 10) * i).toFixed(1)
  );

  return (
    <div className="relative w-full h-8 bg-gray-300 mt-2">
      {/* Playhead Indicator */}
      <div
        className="absolute h-full w-[2px] bg-red-500 z-50 cursor-pointer transition-left duration-200 ease-out"
        style={{ left: `${position}%` }}
      />

      {/* Time Markers */}
      <div className="flex justify-between text-xs text-gray-600">
        {timeMarkers.map((time, index) => (
          <span key={index}>
            {formatTime(time)}
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper function to format time in seconds to mm:ss format
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default TimeBar;
