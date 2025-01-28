import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from './img/logo.png';
import cover from './img/cover.png';
import './styles/App.css';
import Landing from './Pages/landing';
import Dashboard from './Pages/dashboard';
import { AuthProvider, useAuth } from './authcontext';
import Home from './Pages/components/login';
import UserProfile from './Pages/info-profiel';
import Chat from './Pages/chat';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 w-screen h-64 bg-gray-950 drop-shadow-lg">
      {/* Cover Image */}
      <img
        src={cover}
        className="absolute top-0 left-0 object-cover w-full h-full shadow-xl"
        alt="cover"
      />

      {/* Logo in Top-Right Corner */}
      <div className="absolute p-4 bg-black rounded-full shadow-lg top-4 right-4">
        <img
          src={logo}
          className="w-16 h-16 rounded-full"
          alt="logo"
          onClick={() => navigate('/landing')}
        />
        <button onClick={() => navigate('/chat')} className="ml-4 text-white">Chat</button> {/* Add this line */}
      </div>

      {/* Centered Text */}
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <p className="text-white text-9xl font-loveLight">SoulConnect</p>
        <p className="text-6xl text-white font-loveLight">Vind Jou Partner In Crime</p>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-0 w-screen py-4 bg-gray-950">
      <p className="text-center text-white">©2025 SoulConnect, All rights reserved</p>
    </footer>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/dashboard" />;
  return user ? children : <Navigate to="/info-profiel" />;
}

// Main App component
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-zinc-900 ">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/info-profiel" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} /> {/* Add this line */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppWithRouter;
