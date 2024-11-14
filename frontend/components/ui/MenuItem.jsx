// Import React library for creating the component
import React from 'react';

// Define the MenuItem component, which represents a clickable menu item with an icon and a name
// Props:
// - name: the label for the menu item
// - icon: the icon displayed above the label
// - onClick: function to handle click events on the menu item
const MenuItem = ({ name, icon, onClick }) => {
  return (
    // Container for the entire menu item
    // Adds click event, styling, and hover effects
    <div
      onClick={onClick}
      className="flex flex-col items-center w-full space-y-2 text-lg hover:text-gray-500 hover:cursor-pointer transition-all duration-200 ease-in-out"
    >
      {/* Icon container */}
      {/* Creates a circle background for the icon and centers it */}
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white">
        {icon}
      </span>
      
      {/* Name label */}
      {/* Displays the name of the menu item below the icon */}
      <span className="text-sm mt-1">{name}</span>
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default MenuItem;
