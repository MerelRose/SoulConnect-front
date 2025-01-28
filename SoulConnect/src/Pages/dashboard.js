import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from './components/user-carousel';

const Dashboard = () => {
  const API_KEY = '*anker';
  const navigate = useNavigate();

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
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [complaintPopupVisible, setComplaintPopupVisible] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [reportedUserId, setReportedUserId] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:4200/filter-users', filters, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      zoekt: '',
      gender: '',
      soort: '',
      huisdier: '',
      muziek: '',
      kinderen: '',
    });
    setSearchTerm('');
  };

  const toggleUserInfo = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4200/info/${userId}`, {
        headers: { 'api-key': API_KEY },
      });

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

  const handleComplaintSubmit = async () => {
    if (!complaintText || !reportedUserId) {
      console.log("Complaint text or reported user ID is missing.");
      return;
    }
  
    try {
      // Prepare the payload based on the database structure
      const payload = {
        user_id: loggedInUserId,  // Sender's user ID
        reported_id: reportedUserId, // Reported user's ID
        info: complaintText, // Complaint text
      };
  
      console.log("Submitting complaint with the following payload:", payload);
  
      // Send the request to the API
      await axios.post('http://localhost:4200/meldingen', payload, {
        headers: {
          'api-key': API_KEY,
        },
      });
  
      // Reset the complaint text and close the popup
      setComplaintText('');
      setReportedUserId(null);
      setComplaintPopupVisible(false);
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const handleLike = async (userId) => {
    try {
      const response = await axios.post('http://localhost:4200/likes', {
        user_id: loggedInUserId,
        liked_user_id: userId,
      }, {
        headers: {
          'api-key': API_KEY,
        },
      });
  
      if (response.data.match) {
        alert('It\'s a match!');
      }
  
      setLikedUsers((prevLikedUsers) => [...prevLikedUsers, userId]);
    } catch (error) {
      console.error('Error liking user:', error);
    }
  };
  
  const handleDislike = async (userId) => {
    try {
      await axios.delete('http://localhost:4200/likes', {
        data: {
          user_id: loggedInUserId,
          liked_user_id: userId,
        },
        headers: {
          'api-key': API_KEY,
        },
      });
  
      setLikedUsers((prevLikedUsers) => prevLikedUsers.filter((id) => id !== userId));
    } catch (error) {
      console.error('Error disliking user:', error);
    }
  };

  return (
    <div className="p-6 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] overflow-y-auto">
      <h1 className="text-white text-8xl font-loveLight">Top5 Voorgestelde Matches</h1>
        <Carousel />
        <h1 className="text-white text-8xl font-loveLight">Zoek verder</h1>
      <div className="flex items-center mb-4">
        {/* <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 mr-2 border rounded"
        /> */}
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
        <button onClick={clearFilters} className="p-2 ml-2 text-white bg-red-500 rounded">
          Clear Filters
        </button>
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
                {likedUsers.includes(user.id) ? (
                <button onClick={() => handleDislike(user.id)} className="px-4 py-2 mr-2 text-white bg-red-500 rounded">Dislike</button>
                ) : (
                  <button onClick={() => handleLike(user.id)} className="px-4 py-2 mr-2 text-white bg-green-500 rounded">Like</button>
                )}
                <button onClick={() => toggleUserInfo(user.id)} className="px-4 py-2 text-white bg-blue-500 rounded">
                  {expandedUserId === user.id ? 'Hide Info' : 'View Info'}
                </button>
                <button onClick={() => {
                  setReportedUserId(user.id);
                  setComplaintPopupVisible(true);
                }} className="px-4 py-2 text-white bg-yellow-500 rounded">
                  Report
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

      {/* Complaint Popup */}
      {complaintPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Report User</h2>
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder="Write your complaint here..."
              className="w-full p-2 border rounded"
              rows="4"
            />
            <div className="mt-4">
              <button onClick={handleComplaintSubmit} className="px-4 py-2 text-white bg-blue-500 rounded">
                Submit Complaint
              </button>
              <button onClick={() => setComplaintPopupVisible(false)} className="px-4 py-2 ml-2 text-white bg-red-500 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;