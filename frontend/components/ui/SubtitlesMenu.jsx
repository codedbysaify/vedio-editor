import { FaRobot } from "react-icons/fa";
import { FiType } from "react-icons/fi";
import { useState } from "react"; // Import useState for managing state
import ManualSubtitles from "./ManualSubtitles"; // Import the ManualSubtitles component

function SubtitlesMenu() {
  const [manualSubtitlesClicked, setManualSubtitlesClicked] = useState(false); // State to track click
  const handleManualSubtitlesClick = () => {
    setManualSubtitlesClicked(true); // Set to true when "Manual Subtitles" is clicked
  };

  if (manualSubtitlesClicked) {
    return <ManualSubtitles />; // If clicked, render the ManualSubtitles component
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Select Subtitles</h2>
      {[ 
        { icon: <FaRobot className="text-4xl" />, label: 'AI Subtitles', description: 'Automatically recognize speech and generate subtitles' },
        { icon: <FiType className="text-[24px]" />, label: 'Manual Subtitles', description: 'Add Subtitles Manually' }
      ].map((item, index) => (
        <button 
          key={index} 
          onClick={item.label === 'Manual Subtitles' ? handleManualSubtitlesClick : null} // Handle the click for Manual Subtitles
          className="flex flex-col items-center bg-gray-400 text-white py-2 rounded-md w-full space-y-1"
        >
          <div className="flex flex-col items-center space-y-2">
            {item.icon}
            <span className="font-semibold text-lg text-gray-800">{item.label}</span>
          </div>
          <p className="text-sm text-center">{item.description}</p>
        </button>
      ))}
    </div>
  );
}

export default SubtitlesMenu;
