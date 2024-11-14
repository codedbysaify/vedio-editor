// src/components/MainTimeline.jsx
import React from 'react';
import CurlBackButton from './CurlBackutton';
import CurlForwardButton from './CurlForwardButton';
import SplitButton from './SplitButton';
import DeleteButton from './DeleteButton';
import { FaBackward, FaPause, FaForward } from 'react-icons/fa';
import VideoProgressBar from './VideoProgressBar';
import TextOverlayTrack from './TextOverlayTrack';
import AudioOverlayTrack from './AudioOverlayTrack';
import SplitLine from './SplitLine';

const MainTimeline = () => {
  return (
    <div className="w-[1270px] h-[286px] flex flex-col border-gray-100 border-[1px] border-l-0 bg-[#252528] p-4 shadow-lg">
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
          <button className="hover:text-gray-500">
            <FaBackward />
          </button>
          <button className="text-2xl hover:text-gray-500">
            <FaPause />
          </button>
          <button className="hover:text-gray-500">
            <FaForward />
          </button>
          <span className='flex space-x-1'>
            <span className="text-gray-300 text-sm">00:00:00</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-gray-300 text-sm">00:00:00</span> {/* Time duration */}
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
      <div className="w-full h-[170px] bg-gray-600 rounded-lg rounded-l-none relative">
        
        <TextOverlayTrack/>
        <VideoProgressBar/>
        <AudioOverlayTrack />
        <SplitLine/>
      </div>
    </div>
  );
};

export default MainTimeline;
