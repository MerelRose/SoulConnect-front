import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Profile() {

  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const API_ENDPOINT = `http://localhost:4200/info/1/`;
  const API_KEY = '*anker';

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
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


  return (
    profile && (
      <div key={profile.id} className="w-screen flex flex-col h-max-screen h-screen border border-white text-white -mt-1 p-10 bg-gray-800">
        <div className="text-4xl text-left mb-5 flex">{profile.nickname}</div>
        <div className="text-base font-bold flex mb-2">{profile.birth}</div>
        <div className="text-lg text-left mb-2">{profile.profielfoto}</div>
        <div className="text-lg text-left mb-2">{profile.one_liner}</div>
        <div className="flex content-start mb-2">
          <div className="text-sm text-left mt-10">is {profile.gender}</div>
          <div className="text-sm text-left mt-10 ml-1">voorkeur {profile.zoekt}</div>
        </div>
        <div className="text-xl font-bold mt-2">hobbies</div>
        <div className="text-sm text-left mt-1">{profile.intresse}</div>
        <div className="text-sm text-left mt-4">zoekt voor een {profile.soort}</div>
        <div className="text-xl text-left mt-2 font-bold">huisdieren</div>
        <div className="text-sm text-left mt-1">{profile.huisdier}</div>
        <div className="text-sm text-left mt-4">spreekt {profile.talen}</div>
        <div className="text-xl font-bold mt-4">beroep</div>
        <div className="text-sm text-left mt-1">{profile.beroep}</div>
        <div className="text-xl font-bold mt-4">doet aan</div>
        <div className="text-sm text-left mt-1">{profile.sport}</div>
        <div className="text-xl font-bold mt-4">houd van</div>
        <div className="text-sm text-left mt-1">{profile.muziek}</div>
        <div className="text-xl font-bold mt-4">kinderen</div>
        <div className="text-sm text-left mt-2">{profile.kinderen}</div>
      </div>
    )
  );
}