import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Profile() {

  const id = localStorage.getItem('user_id');
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [profielfoto, setFoto] = useState({});
  const API_ENDPOINT_INFO = `http://localhost:4200/info/${id}`;
  const API_ENDPOINT_user = `http://localhost:4200/users/${id}`;
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
        setFoto(response.data.profielfoto);
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
  }, [profile]);

  // Check if the foto value is correct
  useEffect(() => {
    console.log(profielfoto);
  }, [profielfoto]);

  //get age
  const leeftijd = new Date().getFullYear() - new Date(user.geboortedatum).getFullYear();

  return (
    profile && (
      <div key={id} className="w-screen flex flex-row h-screen border border-white text-white -mt-1 p-10 bg-gray-800">
        <div className="w-1/2 p-4">
          <div className="flex items-start mb-4">
            <img src={profile.profielfoto} alt="profile" className="w-52 h-52 rounded-full bg-black mr-4"/>
            <div>
              <div className="text-4xl">{user.username}</div>
              <div className="text-lg font-bold">{leeftijd + " jaar oud"}</div>
              <div className="text-lg font-bold">{profile.one_liner}</div>
              <div className="text-lg font-bold">is {profile.gender}</div>
              <div className="text-lg font-bold">voorkeur is {profile.zoekt}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 border-4 border-color-white rounded-xl">
          <div className="text-xl font-bold mt-2">hobbies</div>
          <div className="text-sm mt-1">{profile.intresse}</div>
          <div className="text-lg mt-4 font-bold">zoekt voor een {profile.soort}</div>
          <div className="text-xl font-bold mt-2">huisdieren</div>
          <div className="text-sm mt-1">{profile.huisdier}</div>
          <div className="text-lg mt-4 font-bold">spreekt {profile.talen}</div>
          <div className="text-xl font-bold mt-4">beroep</div>
          <div className="text-sm mt-1">{profile.beroep}</div>
          <div className="text-xl font-bold mt-4">doet aan</div>
          <div className="text-sm mt-1">{profile.sport}</div>
          <div className="text-xl font-bold mt-4">houd van</div>
          <div className="text-sm mt-1">{profile.muziek}</div>
          <div className="text-xl font-bold mt-4">kinderen</div>
          <div className="text-sm mt-2">{profile.kinderen}</div>
        </div>
      </div>
    )
  );
}