import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const API_KEY = '*anker';
  const userId = localStorage.getItem('userId');
  const [userInfo, setUserInfo] = useState({
    one_liner: '',
    zoekt: '',
    gender: '',
    intresse: '',
    soort: '',
    huisdier: '',
    talen: '',
    beroep: '',
    sport: '',
    muziek: '',
    kinderen: '',
    profielfoto: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/info/${userId}`, {
          headers: {
            'api-key': API_KEY,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('one_liner', userInfo.one_liner);
    formData.append('zoekt', userInfo.zoekt);
    formData.append('gender', userInfo.gender);
    formData.append('intresse', userInfo.intresse);
    formData.append('soort', userInfo.soort);
    formData.append('huisdier', userInfo.huisdier);
    formData.append('talen', userInfo.talen);
    formData.append('beroep', userInfo.beroep);
    formData.append('sport', userInfo.sport);
    formData.append('muziek', userInfo.muziek);
    formData.append('kinderen', userInfo.kinderen);
    if (selectedFile) {
      formData.append('profielfoto', selectedFile);
    }

    // Voeg hier een console log toe
    console.log('Form Data:', Object.fromEntries(formData.entries()));

    try {
      await axios.put(`http://localhost:4200/info/${userId}`, formData, {
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User info updated successfully!');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Update User Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-white">One Liner</label>
          <input
            type="text"
            name="one_liner"
            value={userInfo.one_liner}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Zoekt</label>
          <select
            name="zoekt"
            value={userInfo.zoekt}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="vrouw">Vrouw</option>
            <option value="man">Man</option>
            <option value="beide">Beide</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Gender</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="vrouw">Vrouw</option>
            <option value="man">Man</option>
            <option value="beide">Beide</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Soort Relatie</label>
          <select name="soort" value={userInfo.soort} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="vriendschappelijk">Vriendschappelijk</option>
            <option value="relatie">Relatie</option>
            <option value="lange termijn">Lange termijn</option>
            <option value="LAT">LAT</option>
            <option value="FWB">FWB</option>
            <option value="ONS">ONS</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Huisdier</label>
          <select name="huisdier" value={userInfo.huisdier} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="ja">Ja</option>
            <option value="nee">Nee</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Talen</label>
          <input
            type="text"
            name="talen"
            value={userInfo.talen}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Beroep</label>
          <input
            type="text"
            name="beroep"
            value={userInfo.beroep}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Sport</label>
          <input
            type="text"
            name="sport"
            value={userInfo.sport}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Muziek</label>
          <select name="muziek" value={userInfo.muziek} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
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
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Kinderen</label>
          <select name="kinderen" value={userInfo.kinderen} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="ja">Ja</option>
            <option value="nee">Nee</option>
            <option value="wens">Wens</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Intresse</label>
          <input
            type="text"
            name="intresse"
            value={userInfo.intresse}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Profielfoto</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UserProfile;