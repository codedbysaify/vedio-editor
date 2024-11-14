// src/components/CurlBackButton.jsx
import React from 'react';
import { RiArrowGoBackLine } from "react-icons/ri";

const CurlBackButton = () => {
  return (
    <button className="flex items-center space-x-1 hover:text-gray-500">
      <RiArrowGoBackLine />
    </button>
  );
};

export default CurlBackButton;
