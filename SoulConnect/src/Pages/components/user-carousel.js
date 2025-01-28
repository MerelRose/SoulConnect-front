import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const API_KEY = '*anker';
  const loggedInUserId = localStorage.getItem('userId');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCompatibility = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/compatibility/${loggedInUserId}`, {
          headers: {
            'api-key': API_KEY,
          },
        });
        console.log('Response data:', response.data); // Voeg deze regel toe om de response te controleren
        setUsers(response.data.map(item => item.user));
      } catch (error) {
        console.error('Error fetching compatibility:', error);
      }
    };

    fetchCompatibility();
  }, [loggedInUserId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6 rounded-lg">
      <Slider {...settings}>
        {users.map((user, index) => (
          <div key={index} className="p-6 text-center text-white bg-gray-800 rounded-lg">
            <h2 className="mb-4 text-2xl text-purple-400">{user.username}</h2>
            <div className="text-left">
              <p><span className="font-semibold">Zoekt:</span> {user.zoekt}</p>
              <p><span className="font-semibold">Gender:</span> {user.gender}</p>
              <p><span className="font-semibold">Soort:</span> {user.soort}</p>
              <p><span className="font-semibold">Huisdier:</span> {user.huisdier}</p>
              <p><span className="font-semibold">Muziek:</span> {user.muziek}</p>
              <p><span className="font-semibold">Kinderen:</span> {user.kinderen}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;