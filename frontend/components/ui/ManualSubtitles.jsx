"use client"
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa"; // Import play and pause icons
import { useDispatch } from "react-redux";
import { addToCurrentVideo } from "../statemanagement/slices/currentObjects";
function ManualSubtitles() {
  const [subtitles, setSubtitles] = useState(""); // To manage subtitle input
  const [isPlaying, setIsPlaying] = useState(false); // To toggle play/pause state
  const [subtitlesList, setSubtitlesList] = useState([]); // To store the added subtitles
  const dispatch=useDispatch();
  const handleAddSubtitles = () => {
    if (subtitles.trim()) {
      setSubtitlesList((prevSubtitles) => [
        { text: subtitles, id: Date.now() }, // Add new subtitle with a unique id
        ...prevSubtitles, // Make the new subtitle appear at the top
      ]);
      dispatch(addToCurrentVideo({
        url:subtitles,
        type:"subtitles",
        title:subtitles.slice(0, 3) + `...`
      }))
      setSubtitles(""); // Clear the input after adding the subtitle
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState); // Toggle between play and pause
  };

  // Clear all subtitles
  const handleDeleteAllSubtitles = () => {
    setSubtitlesList([]); // Reset the subtitlesList to an empty array
  };

  // Clear text inside textarea
  const handleClearText = () => {
    setSubtitles(""); // Clear the text in the textarea
  };

  return (
    <div className="space-y-4">
      {/* First Row */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Subtitles</h2>
        {/* Delete All Subtitles Button */}
        <button
          onClick={handleDeleteAllSubtitles}
          className="px-4 py-2 border border-white bg-gray-400 text-white rounded-[8px] hover:bg-white hover:text-black"
        >
          <MdDelete />
        </button>
      </div>

      {/* Second Row */}
      <div className="relative">
        <div className="absolute top-2 left-2 text-sm font-medium text-gray-700">
          00:00.0 - 00:00.5 {/* Static Time */}
        </div>

        <textarea
          value={subtitles}
          onChange={(e) => setSubtitles(e.target.value)}
          placeholder="Type your subtitles here..."
          className="w-full p-2 border text-black border-gray-300 rounded-md mt-2 h-28 pt-9"
          rows="4"
        />

        {/* Play/Pause Button inside Textarea */}
        <button
          onClick={togglePlayPause}
          className="absolute top-2 left-[calc(100%-78px)] text-black rounded-[8px] p-2 pr-0 hover:text-gray-400"
        >
          {isPlaying ? <FaPause /> : <FaPlay />} {/* Display Play or Pause based on state */}
        </button>

        {/* Delete Button inside Textarea */}
        <button
          onClick={handleClearText} // This will clear the text inside the textarea
          className="absolute top-2 right-2 text-black rounded-[8px] p-2 text-[20px] pt-[6px] pl-0 hover:text-gray-400"
        >
          <MdDelete />
        </button>
      </div>

      {/* Display Added Subtitles Above the Add Subtitles Button */}
      {subtitlesList.length > 0 && ( // Only render if there are subtitles
        <div
          className="mt-4 overflow-y-auto max-h-60 rounded-md"
          style={{ maxHeight: "300px" }} // Added maxHeight to restrict overflow and show scrollbar
        >
          {subtitlesList.map((subtitle) => (
            <div
              key={subtitle.id}
              className="mb-2 p-2 text-black bg-gray-100 rounded-md flex justify-between items-center"
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }} // Prevent long words from overflowing
            >
              <span className="flex-grow">{subtitle.text}</span> {/* Allow text to grow and wrap */}
              <button
                onClick={() => setSubtitlesList(subtitlesList.filter((s) => s.id !== subtitle.id))}
                className="text-red-500 ml-2" // Add some spacing between the text and delete button
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Subtitles Button */}
      <button
        onClick={handleAddSubtitles}
        className="w-full px-4 py-2 bg-gray-400 text-white font-bold rounded-md mt-4 hover:border-white hover:border-[1px] hover:text-black hover:bg-slate-300"
      >
        Add Subtitles
      </button>
    </div>
  );
}

export default ManualSubtitles;
