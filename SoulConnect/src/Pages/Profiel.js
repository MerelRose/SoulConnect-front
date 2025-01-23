import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/profile/$`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center">
      {profile.map((Profile) => (
        <div key={Profile.id} className="w-screen h-screen border border-8 border-black">
          <div className="text-7xl">{Profile.nickname}</div>
          <div className="text-lg">{Profile.oneliner}</div>
          <div className="text-sm">{Profile.waarderen}</div>
          <div className="text-base font-bold">{Profile.birth}</div>
        </div>
      ))}
    </div>
  );
}
