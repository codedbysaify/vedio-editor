// Drawer.jsx
// This component is responsible for rendering a drawer that slides in from the left side of the screen.
// It displays dynamic content based on the selected menu item in the Navbar component.

import React from 'react';
import { FaArrowLeft} from 'react-icons/fa';


const Drawer = ({ open, onClose, content }) => {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-[96px] w-[320px] h-[320px] bg-[#1B1B1C] shadow-lg p-4 overflow-y-auto">
      {/* <button onClick={onClose} className="text-gray-500"><FaArrowLeft/></button> */}
      <div className="mt-1">
        {/* Display the dynamic content */}
        {content}
      </div>
    </div>
  );
};

export default Drawer;
