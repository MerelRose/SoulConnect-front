import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const API_KEY = '*anker';

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    distance: '',
    gender: '',
    relationshipType: '',
    profilePerPage: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4200/users', {
          headers: {
            'api-key': API_KEY // Include the API key in the headers
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch filter options on component mount
    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:4200/info', {
          headers: {
            'api-key': API_KEY // Include the API key in the headers
          }
        });
        setFilters(response.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = async () => {
    try {
      const response = await axios.get('http://localhost:4200/info', {
        headers: {
          'api-key': API_KEY // Include the API key in the headers
        }
      });
      setUsers(response.data); // Assuming /info returns filtered user data
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const getUserDetails = (userId) => {
    // Implement user details fetching or navigation here
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg" onClick={() => getUserDetails(user.id)}>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Postcode: {user.postcode}</p>
              <p class ="text-gray-700">Geboortedatum: {user.geboortedatum}</p>
              <div className="mt-4">
                <button className="px-4 py-2 mr-2 text-white bg-green-500 rounded">Like</button>
                <button className="px-4 py-2 text-white bg-red-500 rounded">Dislike</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;