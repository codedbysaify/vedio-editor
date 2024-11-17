// src/components/SplitLine.jsx
import React from 'react';
import { FaCaretUp } from 'react-icons/fa';

const SplitLine = () => {
  return (
    <div className="fixed h-full w-[2px] bg-red-500 z-50">
      {/* Downward-facing arrow at the top of the line, aligned with its edge */}
      <FaCaretUp className="text-red-500 absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-180" />
    </div>
  );
};

export default SplitLine;

