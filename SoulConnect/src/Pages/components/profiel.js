import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { id } = useParams(); // get the id from the url
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [profielfoto, setFoto] = useState('');
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(null); // for error state

  const API_ENDPOINT_INFO = `http://localhost:4200/info/${id}`;
  const API_ENDPOINT_user = `http://localhost:4200/users/${id}`;
  const API_ENDPOINT_foto = `http://localhost:4200/fotos/user/${id}`;
  const API_KEY = '*anker';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const [infoResponse, userResponse, fotoResponse] = await Promise.all([
          axios.get(API_ENDPOINT_INFO, {
            headers: { 'api-key': API_KEY },
          }),
          axios.get(API_ENDPOINT_user, {
            headers: { 'api-key': API_KEY },
          }),
          axios.get(API_ENDPOINT_foto, {
            headers: { 'api-key': API_KEY },
          }),
        ]);

        // Set all the responses into the states
        setProfile(infoResponse.data);
        setUser(userResponse.data);
        setFotos(fotoResponse.data);

        // Set the profile photo if available
        if (fotoResponse.data.length > 0) {
          setFoto(fotoResponse.data[0].link); // Use 'link' for profile photo
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.'); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [id]); // Re-fetch if 'id' changes

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if data fetching failed
  }

  // Calculate age
  const leeftijd = new Date().getFullYear() - new Date(user.geboortedatum).getFullYear();

  return (
    <div key={id} className="w-screen flex flex-row h-screen-full border border-white text-white -mt-1 p-10 bg-gray-800">
      <div className="w-1/2 p-4">
   <div className="flex flex-col items-center md:items-start text-white space-y-4">
  <img 
    src={profielfoto || 'default-profile.png'} 
    alt="Profile" 
    className="w-52 h-52 rounded-full bg-black shadow-lg"
  />
  <div className="text-center md:text-left">
    <h1 className="text-4xl font-bold">{user.username}</h1>
    <p className="text-lg">{leeftijd} years old</p>
    <p className="text-lg">{profile.one_liner || "No one-liner available"}</p>
    <p className="text-lg">Gender: {profile.gender || "Not specified"}</p>
    <p className="text-lg">Looking for: {profile.zoekt || "Not specified"}</p>
  </div>
</div>

        <div className="w-full mt-6">
          <div className="text-2xl font-bold mb-4">Gallery</div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
  {fotos.map((foto, index) => {
    const fullUrl = foto.link.startsWith('http') 
      ? foto.link 
      : `http://localhost:4200/${foto.link.replaceAll('\\', '/')}`;

    return (
      <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={fullUrl}
          alt={`Gallery item ${index + 1}`}
          className="w-full h-40 object-cover rounded-lg shadow-lg"
          onError={(e) => { e.target.src = 'fallback-image.jpg'; }}
        />
      </div>
    );
  })}
</div>

        </div>
      </div>
      <div className="w-1/2 h-full p-6 border-4 border-white rounded-xl bg-gray-900 mt-96 overflow-auto">
  <h2 className="text-xl font-bold">Hobbies</h2>
  <p className="text-lg">{profile.intresse}</p>
  
  <h2 className="text-xl font-bold mt-4">Looking for a {profile.soort}</h2>

  <h2 className="text-xl font-bold mt-4">Pets</h2>
  <p className="text-lg">{profile.huisdier}</p>

  <h2 className="text-xl font-bold mt-4">Speaks</h2>
  <p className="text-lg">{profile.talen}</p>

  <h2 className="text-xl font-bold mt-4">Job</h2>
  <p className="text-lg">{profile.beroep}</p>

  <h2 className="text-xl font-bold mt-4">Plays</h2>
  <p className="text-lg">{profile.sport}</p>

  <h2 className="text-xl font-bold mt-4">Listens to</h2>
  <p className="text-lg">{profile.muziek}</p>

  <h2 className="text-xl font-bold mt-4">Has children</h2>
  <p className="text-lg">{profile.kinderen}</p>
</div>

    </div>
  );
}
