import React, { useEffect, useState } from 'react';

function Profiel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error('Error fetching Profile:', err);
        setError(err.message);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.title.toLowerCase().includes(filter.toLowerCase()) ||
      user.author.toLowerCase().includes(filter.toLowerCase()) ||
      user.description.toLowerCase().includes(filter.toLowerCase())
    );
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center space-x-8 align-center w-screen">
      <NavBar />
      <div className="flex justify-center">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search Profile..."
          className="w-full h-10 p-2 mb-4 border-2 border-gray-400 rounded-lg"
        />
      </div>

      {filteredUsers.map((user) => (
        <div key={user.id} className='w-1/2 h-96 p-4 border-4 border-black rounded-lg m-10'>
          <div className='text-2xl'>{user.nickname}</div>
          <div className='text-lg'>{user.gender}</div>
          <div className='text-sm'>{user.description}</div>
          <div className='text-xl font-bold'>${user.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Profiel;
