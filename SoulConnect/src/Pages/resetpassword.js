import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('resetToken');

  const handlePasswordReset = async () => {
    if (!resetToken) {
      setErrorMessage('No reset token found.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4200/reset-password', {
        resetToken,
        newPassword,
      });

      if (response.status === 200) {
        navigate('/landing');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-12 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-center text-white">Reset Password</h2>

      <div className="mb-4">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <button
        onClick={handlePasswordReset}
        className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Reset Password
      </button>

      {errorMessage && (
        <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-200">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
