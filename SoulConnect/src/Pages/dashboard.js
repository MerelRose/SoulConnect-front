import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const API_KEY = '*anker';
  const navigate = useNavigate(); // Initialize useNavigate

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    zoekt: '',
    gender: '',
    soort: '',
    huisdier: '',
    muziek: '',
    kinderen: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUserId, setExpandedUserId] = useState(null); // State to track which user's info is expanded

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4200/users', {
          headers: {
            'api-key': API_KEY, // Include the API key in the headers
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    // Filter users based on the selected filters
    const filteredUsers = users.filter((user) => {
      return (
        (filters.zoekt ? user.zoekt === filters.zoekt : true) &&
        (filters.gender ? user.gender === filters.gender : true) &&
        (filters.soort ? user.soort === filters.soort : true) &&
        (filters.huisdier ? user.huisdier === filters.huisdier : true) &&
        (filters.muziek ? user.muziek === filters.muziek : true) &&
        (filters.kinderen ? user.kinderen === filters.kinderen : true) &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  const toggleUserInfo = async (userId) => {
    if (expandedUserId === userId) {
      // Collapse the info if it's already expanded
      setExpandedUserId(null);
      return;
    }

    try {
      // Fetch user info by ID
      const response = await axios.get(`http://localhost:4200/info/${userId}`, {
        headers: { 'api-key': API_KEY },
      });

      // Set the expanded user ID and store their info
      setExpandedUserId(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, expandedInfo: response.data } : user
        )
      );
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="p-6 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px]">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 mr-2 border rounded"
        />
        <select name="zoekt" value={filters.zoekt} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Zoekt</option>
          <option value="vrouw">Vrouw</option>
          <option value="man">Man</option>
          <option value="beide">Beide</option>
        </select>
        <select name="gender" value={filters.gender} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Gender</option>
          <option value="vrouw">Vrouw</option>
          <option value="man">Man</option>
          <option value="beide">Beide</option>
        </select>
        <select name="soort" value={filters.soort} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Soort</option>
          <option value="vriendschappelijk">Vriendschappelijk</option>
          <option value="relatie">Relatie</option>
          <option value="lange termijn">Lange termijn</option>
          <option value="LAT">LAT</option>
          <option value="FWB">FWB</option>
          <option value="ONS">ONS</option>
        </select>
        <select name="huisdier" value={filters.huisdier} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Huisdier</option>
          <option value="ja">Ja</option>
          <option value="nee">Nee</option>
        </select>
        <select name="muziek" value={filters.muziek} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Muziek</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hip-hop">Hip-hop</option>
          <option value="electronic">Electronic</option>
          <option value="r&b">R&B</option>
          <option value="jazz">Jazz</option>
          <option value="country">Country</option>
          <option value="klassiek">Klassiek</option>
          <option value="reggae">Reggae</option>
          <option value="blues">Blues</option>
          <option value="metal">Metal</option>
          <option value="folk">Folk</option>
          <option value="gospel">Gospel</option>
        </select>
        <select name="kinderen" value={filters.kinderen} onChange={handleFilterChange} className="p-2 mr-2 border rounded">
          <option value="">Kinderen</option>
          <option value="ja">Ja</option>
          <option value="nee">Nee</option>
          <option value="wens">Wens</option>
        </select>
        <button onClick={applyFilters} className="p-2 text-white bg-blue-500 rounded">Apply Filters</button>
      </div>
      <div className="max-h-[520px] overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Postcode: {user.postcode}</p>
              <p className="text-gray-700">Geboortedatum: {user.geboortedatum}</p>
              <div className="mt-4">
                <button className="px-4 py-2 mr-2 text-white bg-green-500 rounded">Like</button>
                <button className="px-4 py-2 text-white bg-red-500 rounded">Dislike</button>
                <button onClick={() => toggleUserInfo(user.id)} className="px-4 py-2 text-white bg-blue-500 rounded">
                  {expandedUserId === user.id ? 'Hide Info' : 'View Info'}
                </button>
              </div>
              {expandedUserId === user.id && user.expandedInfo && (
                <div className="p-4 mt-4 border-t border-gray-300">
                  <p>Zoekt: {user.expandedInfo.zoekt}</p>
                  <p>Gender: {user.expandedInfo.gender}</p>
                  <p>Soort: {user.expandedInfo.soort}</p>
                  <p>Huisdier: {user.expandedInfo.huisdier}</p>
                  <p>Muziek: {user.expandedInfo.muziek}</p>
                  <p>Kinderen: {user.expandedInfo.kinderen}</p>
                </div>
              )}
              {expandedUserId === user.id && !user.expandedInfo && (
                <div className="p-4 mt-4 border-t border-gray-300">
                  <p>No additional info available for this user.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
