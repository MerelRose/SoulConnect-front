import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {

  const id = localStorage.getItem('user_id');
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [profielfoto, setFoto] = useState('');
  const [fotos, setFotos] = useState([]);
  const API_ENDPOINT_INFO = `http://localhost:4200/info/${id}`;
  const API_ENDPOINT_user = `http://localhost:4200/users/${id}`;
  const API_ENDPOINT_foto = `http://localhost:4200/fotos/user/${id}`;
  const API_KEY = '*anker';

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const response = await axios.get(API_ENDPOINT_INFO, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
    fetchinfo();
  }, []);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(API_ENDPOINT_user, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchuser();
  }, []);

  useEffect(() => {
    const fetchfoto = async () => {
      try {
        const response = await axios.get(API_ENDPOINT_foto, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setFotos(response.data);
        if (response.data.length > 0) {
          setFoto(response.data[0].link); // Use 'link' instead of 'url'
        }
      } catch (error) {
        console.error('Error fetching foto:', error);
      }
    };
    fetchfoto();
  }, []);

  // Check if the foto value is correct
  useEffect(() => {
    console.log('Profile photo URL:', profielfoto);
  }, [profielfoto]);

  //get age
  const leeftijd = new Date().getFullYear() - new Date(user.geboortedatum).getFullYear();

  return (
    profile && (
      <div key={id} className="w-screen flex flex-row h-screen-full border border-white text-white -mt-1 p-10 bg-gray-800">
        <div className="w-1/2 p-4">
          <div className="flex items-start mb-4">
            <img src={profielfoto || 'default-profile.png'} alt="profile" className="w-52 h-52 rounded-full bg-black mr-4"/>
            <div>
              <div className="text-4xl">{user.username}</div>
              <div className="text-lg font-bold">{leeftijd + " jaar oud"}</div>
              <div className="text-lg font-bold">{profile.one_liner}</div>
              <div className="text-lg font-bold">gender is {profile.gender}</div>
              <div className="text-lg font-bold">is looking for {profile.zoekt}</div>
            </div>
          </div>
          <div className="w-full mt-6">
  <div className="text-2xl font-bold mb-4">Gallery</div>
  <div className="grid grid-cols-3 gap-4">
    {fotos.map((foto, index) => {
      // Resolve full URL by prepending the base URL
      const fullUrl = foto.link.startsWith('http')
        ? foto.link
        : `http://localhost:4200/${foto.link.replaceAll('\\', '/')}`;
        console.log(fullUrl);

      return (
        <img
          key={index}
          src={fullUrl}
          alt={`Gallery item ${index + 1}`}
          className="w-full h-40 object-cover rounded-lg shadow-lg"
        />
      );
    })}
  </div>
</div>

        </div>
        <div className="w-1/2 h-4/5 p-4 border-4 border-color-white rounded-xl">
          <div className="text-xl font-bold mt-2">hobbys</div>
          <div className="text-lg mt-1">{profile.intresse}</div>
          <div className="text-lg mt-4">is looking for a {profile.soort}</div>
          <div className="text-xl font-bold mt-2">pets</div>
          <div className="text-lg mt-1">{profile.huisdier}</div>
          <div className="text-lg mt-4">speaks {profile.talen}</div>
          <div className="text-xl font-bold mt-4">job</div>
          <div className="text-lg mt-1">{profile.beroep}</div>
          <div className="text-xl font-bold mt-4">plays</div>
          <div className="text-lg mt-1">{profile.sport}</div>
          <div className="text-xl font-bold mt-4">listens to</div>
          <div className="text-lg mt-1">{profile.muziek}</div>
          <div className="text-xl font-bold mt-4">has children</div>
          <div className="text-lg mt-2">{profile.kinderen}</div>
        </div>
      </div>
    )
  );
}
