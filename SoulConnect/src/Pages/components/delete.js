import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccountPage = () => {
  const API_KEY = '*anker';
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userId');

  const handleDeleteAccount = async () => {
    try {
      // Verwijder de gebruiker via de endpoint /users/loggedinuserid
      await axios.delete(`http://localhost:4200/users/${loggedInUserId}`, {
        headers: {
          'api-key': API_KEY,
        },
      });

      // Verwijder de token en userId uit localStorage en navigeer naar /landing
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/landing');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="p-6">
      <button onClick={handleDeleteAccount} className="px-4 py-2 text-white bg-red-500 rounded">
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccountPage;