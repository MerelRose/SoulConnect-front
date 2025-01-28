import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { useAuth } from '../authcontext';

const Chat = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMatches();
      setupPusher();
    }
  }, [user]);

  useEffect(() => {
    if (selectedMatch) {
      fetchMessages(selectedMatch.id);
    }
  }, [selectedMatch]);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:4200/matches/${user.user_id}`, {
        headers: { 'api-key': process.env.REACT_APP_API_KEY } // Ensure API key is used
      });
      console.log('Fetched matches:', response.data); // Add logging
      const matchUserIds = response.data.map(match => match.user1_id === user.user_id ? match.user2_id : match.user1_id);
      const matchDetails = await Promise.all(matchUserIds.map(async (matchUserId) => {
        const userResponse = await axios.get(`http://localhost:4200/users/${matchUserId}`, {
          headers: { 'api-key': process.env.REACT_APP_API_KEY } // Ensure API key is used
        });
        return userResponse.data;
      }));
      setMatches(matchDetails);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const fetchMessages = async (matchUserId) => {
    try {
      const response = await axios.get(`http://localhost:4200/chat/${user.user_id}/${matchUserId}`, {
        headers: { 'api-key': process.env.REACT_APP_API_KEY } // Ensure API key is used
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const setupPusher = () => {
    const pusher = new Pusher('353ddb77f1d42d4003f8', {
      cluster: 'eu',
      encrypted: true
    });

    const channel = pusher.subscribe('chat');
    channel.bind('receiveMessage', (data) => {
      if (selectedMatch && ((data.sender_id === user.user_id && data.receiver_id === selectedMatch.id) ||
          (data.sender_id === selectedMatch.id && data.receiver_id === user.user_id))) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };

  const handleSendMessage = async () => {
    if (!selectedMatch) {
      console.error('No match selected');
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      await axios.post('http://localhost:4200/sendMessage', {
        sender_id: user.user_id,
        receiver_id: selectedMatch.id,
        content: newMessage,
        timestamp
      }, {
        headers: { 'api-key': process.env.REACT_APP_API_KEY } // Ensure API key is used
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="mb-4 text-2xl font-semibold">Chat</h2>
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-700 rounded">
          <h3 className="mb-2 text-lg font-semibold">Matches</h3>
          <ul>
            {matches.map((match) => (
              <li
                key={match.id}
                className={`p-2 mb-2 cursor-pointer rounded ${selectedMatch && selectedMatch.id === match.id ? 'bg-gray-600' : 'bg-gray-800'}`}
                onClick={() => {
                  console.log('Selected match:', match); // Add logging
                  setSelectedMatch(match);
                }}
              >
                {match.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4 bg-gray-700 rounded ml-4">
          {selectedMatch ? (
            <>
              <h3 className="mb-2 text-lg font-semibold">Chat with {selectedMatch.username}</h3>
              <div className="max-h-64 overflow-y-auto bg-gray-800 p-4 rounded">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-2 mb-2 border-b border-gray-600">
                    <p><strong>{msg.sender_id === user.user_id ? 'You' : `User ${msg.sender_id}`}:</strong> {msg.content}</p>
                    <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-2 mb-4 border rounded bg-gray-800 border-gray-600"
                />
                <button onClick={handleSendMessage} className="px-4 py-2 text-white bg-blue-500 rounded">
                  Send
                </button>
              </div>
            </>
          ) : (
            <p>Select a match to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;