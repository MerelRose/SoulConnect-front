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
import Profile from'./Pages/components/profiel';
import DeleteAccountPage from './Pages/components/delete';
import NavBar from './Pages/components/navbar';
import ResetPassword from './Pages/resetpassword';
import Add from './Pages/components/add';
import LikesAndMatches from './Pages/likes-matches';

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
          className="w-16 h-16 rounded-full cursor-pointer"
          alt="logo"
          onClick={() => navigate('/landing')}
        />
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
    <footer className="fixed bottom-0 w-full py-4 bg-gray-950">
      <p className="text-center text-white">©2025 SoulConnect, All rights reserved</p>
    </footer>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/landing" />;
}

// Main App component
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavBar /> {/* Add the NavBar component here */}
      <main className="flex-1 bg-zinc-900 ">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/info-profiel" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/profiel/:id" element={<Profile />} />
          <Route path="/delete" element={<PrivateRoute><DeleteAccountPage /></PrivateRoute>} />
          <Route path="/likes&matches" element={<PrivateRoute><LikesAndMatches /></PrivateRoute>} />
          <Route path="/add" element={<Add />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resetpassword" element={<ResetPassword />}/>
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