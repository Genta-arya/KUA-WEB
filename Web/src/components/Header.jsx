import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ title , slug }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(slug); // Navigate to the previous page
  };

  return (
    <div className="flex items-center p-3 bg-gray-100 border-b border-gray-300">
      <button onClick={handleBack} className="mr-2 p-2 rounded hover:bg-gray-200">
        <FaArrowLeft size={16} className="text-gray-600" />
      </button>
      <h1 className="text-sm font-bold">{title}</h1>
    </div>
  );
};

export default Header;
