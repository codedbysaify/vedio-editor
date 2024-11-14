// src/components/DeleteButton.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteButton = () => {
  return (
    <button className="hover:text-gray-500">
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
