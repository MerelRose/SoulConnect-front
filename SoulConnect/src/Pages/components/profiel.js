import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { id } = useParams(); // id ophalen van url
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [profielfoto, setFoto] = useState('');
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const API_ENDPOINT_INFO = `${API_BASE_URL}${process.env.REACT_APP_API_INFO}${id}`;
  const API_ENDPOINT_USER = `${API_BASE_URL}${process.env.REACT_APP_API_USER}${id}`;
  const API_ENDPOINT_FOTO = `${API_BASE_URL}${process.env.REACT_APP_API_FOTOS}${id}`;
  

  useEffect(() => { // gebeurd maar 1 keer tenzij id veranderd
    const fetchData = async () => {
      setLoading(true);

      try {
        const [infoResponse, userResponse, fotoResponse] = await Promise.all([ //promise is hier om er zeker van te zijn dat alle request succesvol zijn anders zal hij niets sturen en voor performance
          axios.get(API_ENDPOINT_INFO, { //wat ik anders kon doen is om promise.allSettled te doen
            headers: { 'api-key': API_KEY },
          }),
          axios.get(API_ENDPOINT_USER, {
            headers: { 'api-key': API_KEY },
          }),
          axios.get(API_ENDPOINT_FOTO, {
            headers: { 'api-key': API_KEY },
          }),
        ]);

        setProfile(infoResponse.data);
        setUser(userResponse.data);
        setFotos(fotoResponse.data);

        if (fotoResponse.data.length > 0) {
          setFoto(fotoResponse.data[0].link);
        }
      } catch (error) { // als 1 van de calls niet lukt geeft hij error aan
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // elke keer dat het id aanpast fetch hij opnieuw

  if (loading) {
    return <div>Loading...</div>; // laat loading zien tijdens het ophalen
  }

  if (error) {
    return <div>{error}</div>; // laat error zien als de data niet goed fetched
  }


  const leeftijd = new Date().getFullYear() - new Date(user.geboortedatum).getFullYear();

  return (
    <div key={id} className="w-screen flex flex-row h-screen-full border border-white text-white -mt-1 p-10 bg-gray-800">
      <div className="w-1/2 p-4">
   <div className="flex flex-col items-center md:items-start text-white space-y-4">
  <img  // zou lazy loading kunnen toevoegen om foto's alleen te laden als het nodig is
    src={profielfoto || 'default-profile.png'} 
    alt="Profile" 
    className="w-52 h-52 rounded-full bg-black shadow-lg"
  />
  <div className="text-center md:text-left">
    <h1 className="text-4xl font-bold">{user.username}</h1>
    <p className="text-lg">{leeftijd} years old</p>
    <p className="text-lg">{profile.one_liner || "No one-liner available"}</p>
    <p className="text-lg">Gender: {profile.gender || "Not specified"}</p> //not specified is een fallback
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
