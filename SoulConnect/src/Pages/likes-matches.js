import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LikesAndMatches = () => {
  const API_KEY = '*anker';
  const navigate = useNavigate();

  const [likedUsers, setLikedUsers] = useState([]);
  const [likedByUsers, setLikedByUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/likes/${loggedInUserId}`, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setLikedUsers(response.data);
      } catch (error) {
        console.error('Error fetching liked users:', error);
      }
    };

    const fetchLikedByUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/likedBy/${loggedInUserId}`, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setLikedByUsers(response.data);
      } catch (error) {
        console.error('Error fetching liked by users:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/matches/${loggedInUserId}`, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchLikedUsers();
    fetchLikedByUsers();
    fetchMatches();
  }, [loggedInUserId]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4200/users/${userId}`, {
        headers: {
          'api-key': API_KEY,
        },
      });
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [userId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching user details:', error);
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
      window.location.reload(); // Reload the page
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
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error disliking user:', error);
    }
  };

  useEffect(() => {
    likedUsers.forEach((like) => fetchUserDetails(like.liked_user_id));
    likedByUsers.forEach((like) => fetchUserDetails(like.user_id));
    matches.forEach((match) => {
      fetchUserDetails(match.user1_id);
      fetchUserDetails(match.user2_id);
    });
  }, [likedUsers, likedByUsers, matches, loggedInUserId]);

  return (
    <div className="p-6 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] overflow-y-auto">
      <h1 className="text-white text-8xl font-loveLight">Likes and Matches</h1>
      
      <h2 className="mt-6 text-4xl text-white font-loveLight">Users You Liked</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {likedUsers.map((like) => {
          const user = userDetails[like.liked_user_id];
          return user ? (
            <div key={user.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
                <button onClick={() => handleDislike(user.id)} className="px-4 py-2 mr-2 text-white bg-red-500 rounded">Dislike</button>
            </div>
          ) : null;
        })}
      </div>

      <h2 className="mt-6 text-4xl text-white font-loveLight">Users Who Liked You</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {likedByUsers.map((like) => {
          const user = userDetails[like.user_id];
          return user ? (
            <div key={user.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
                  <button onClick={() => handleLike(user.id)} className="px-4 py-2 mr-2 text-white bg-green-500 rounded">Like</button>
            </div>
          ) : null;
        })}
      </div>

      <h2 className="mt-6 text-4xl text-white font-loveLight">Matches</h2>
      <div className="grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => {
          const user1 = userDetails[match.user1_id];
          const user2 = userDetails[match.user2_id];
          return user1 && user2 ? (
            <div key={match.id} className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
              {/* <h2 className="text-xl font-semibold">Match ID: {match.id}</h2> */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">User 1</h3>
                <p className="text-gray-700">Username: {user1.username}</p>
                <p className="text-gray-700">Email: {user1.email}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">User 2</h3>
                <p className="text-gray-700">Username: {user2.username}</p>
                <p className="text-gray-700">Email: {user2.email}</p>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default LikesAndMatches;