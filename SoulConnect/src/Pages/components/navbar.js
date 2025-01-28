import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authcontext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the auth context
    localStorage.clear(); // Clear local storage
    navigate('/landing'); // Redirect to the login page
  };

  if (!user) {
    return null; // NavBar is not rendered if the user is not logged in
  }

  return (
    <nav className="p-4 bg-gray-800">
      <ul className="flex space-x-4">
        <li>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
        </li>
        <li>
          <Link to="/info-profiel" className="text-white">Profiel</Link>
        </li>
        <li>
          <Link to="/delete" className="text-white">Account Verwijderen</Link>
        </li>
        <li>
          <Link to="/likes&matches" className="text-white">Likes & Matches</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="text-white">Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;