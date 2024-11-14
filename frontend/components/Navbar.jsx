// Navbar.js - This component renders a navigation bar with 
// icons and a drawer that displays context-specific content based on user selection.

'use client'
import React, { useState } from 'react';
import { FaArrowLeft, FaImage, FaClosedCaptioning, FaFont, FaMusic, FaVideo, FaCut, FaRobot } from 'react-icons/fa';
import { FiType } from "react-icons/fi";
import { FaDownload } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import MediaMenu from './ui/MediaMenu';
import MenuItem from './ui/MenuItem'; // Import MenuItem from ui folder
import Drawer from './ui/Drawer'; // Import Drawer from ui folder

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // Track the active menu item

  const toggleDrawer = (item) => {
    if (activeItem === item) {
      setOpenDrawer(prevState => !prevState); // If the same item, just toggle the drawer
    } else {
      setActiveItem(item); // Set the new active item
      setOpenDrawer(true); // Open the drawer immediately for the new item
    }
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setActiveItem(null);
  };

  const navItems = [
    { name: 'Back', icon: <FaArrowLeft /> },
    { name: 'Media', icon: <FaImage /> },
    { name: 'Subtitles', icon: <FaClosedCaptioning /> },
    { name: 'Text', icon: <FaFont /> },
    { name: 'Audio', icon: <FaMusic /> },
    { name: 'Video', icon: <FaVideo /> },
    { name: 'Split', icon: <FaCut /> },
  ];

  const contentMap = {
    'Audio': (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add Audio</h2>
        <button className="flex flex-col items-center p-2 bg-gray-400 text-white rounded-md w-full">
          <FaDownload className="text-2xl" />
          <span className="font-semibold text-lg text-gray-800">Upload a file</span>
          <p className="text-sm">Click to browse or drag and<br />drop a file here</p>
        </button>

        <h2 className="text-xl font-semibold mb-4">Stock Music</h2>

        {['Classic Song', 'Jazz Music', 'Rock Music'].map((song, index) => (
          <button key={index} className="flex items-center space-x-4 bg-gray-300 text-black rounded-md w-full mb-2">
            <FaArrowRight className="text-xl" />
            <div className="flex flex-col">
              <span className="font-semibold">{song}</span>
              <span className="text-sm">{index === 0 ? '1m 4s' : index === 1 ? '2m 20s' : '3m 15s'}</span>
            </div>
          </button>
        ))}
      </div>
    ),
    'Video': (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Add a Video</h2>
        <button className="flex flex-col items-center p-4 bg-gray-400 text-white rounded-md w-full mb-4">
          <FaDownload className="text-2xl mb-2" />
          <span className="font-semibold text-lg text-gray-800">Upload a file</span>
          <p className="text-sm text-center">Click to browse or drag and<br />drop a file here</p>
        </button>

        <h2 className="text-xl font-semibold mb-4">Background Videos</h2>

        <div className="grid grid-cols-2 gap-4">
          {['video_pic_1.jpeg', 'video_pic_2.jpeg', 'video_pic_3.jpeg', 'video_pic_4.jpeg'].map((pic, index) => (
            <div key={index} className="relative group cursor-pointer hover:scale-105 transform transition duration-300">
              <img src={`/images/${pic}`} alt={`Video ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
              <button className="absolute bottom-2 left-2 bg-black text-white py-1 px-3 rounded-md text-sm">
                {index === 0 ? '02:15' : index === 1 ? '03:00' : index === 2 ? '01:45' : '02:30'}
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
    'Text': (
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Text</h2>
        <div className="flex flex-col space-y-2 font-semibold text-[16px]">
          {['Add Heading', 'Add Paragraph', 'Add Quote'].map((text, index) => (
            <button key={index} className="bg-gray-400 p-3 rounded-md flex">{text}</button>
          ))}
        </div>
      </div>
    ),
    'Subtitles': (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4">Select Subtitles</h2>
        {[
          { icon: <FaRobot className="text-4xl" />, label: 'AI Subtitles', description: 'Automatically recognize speech and generate subtitles' },
          { icon: <FiType className="text-[24px]" />, label: 'Manual Subtitles', description: 'Add Subtitles Manually' }
        ].map((item, index) => (
          <button key={index} className="flex flex-col items-center bg-gray-400 text-white py-2 rounded-md w-full space-y-1">
            <div className="flex flex-col items-center space-y-2">
              {item.icon}
              <span className="font-semibold text-lg text-gray-800">{item.label}</span>
            </div>
            <p className="text-sm text-center">{item.description}</p>
          </button>
        ))}
      </div>
    ),
    'Media': <MediaMenu />,
    'Split': 'This is the Split content.',
    'Back': (
      <div className="space-y-4">
        <button className="flex items-center space-x-2 bg-gray-600 text-white p-2 rounded-md w-full cursor-pointer" onClick={closeDrawer}>
          <FaArrowLeft className="text-xl" />
          <span>Back</span>
        </button>
      </div>
    ),
  };

  return (
    <div className="bg-[#252528] border-[1px] border-gray-600 text-white w-24 h-screen p-4 flex flex-col items-center justify-between">
      {navItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 w-full" onClick={() => {
          if (item.name === 'Back') {
            closeDrawer();
          } else {
            toggleDrawer(item.name);
          }
        }}>
          {item.name === 'Back' ? (
            <span className="flex items-center space-x-2 cursor-pointer">
              {item.icon}
              <span>{item.name}</span>
            </span>
          ) : (
            <MenuItem name={item.name} icon={item.icon} />
          )}
        </div>
      ))}
      <Drawer open={openDrawer} onClose={closeDrawer} content={contentMap[activeItem]} />
    </div>
  );
};

export default Navbar;
