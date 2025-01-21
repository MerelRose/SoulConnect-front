import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from './img/logo.png';
import './styles/App.css';
import Landing from './pages/landing';

// Header component
function Header() {
  const navigate = useNavigate();

  return (
    <header className='z-50 w-screen bg-gray-950 drop-shadow-lg'>
      <img src={logo} className="h-32 auto w- p-4" alt="logo" onClick={() => navigate('/landing')} />
      <div className='absolute top-10 left-[200px] text-center'>
        <p className='text-6xl text-white'><strong>SoulConnect</strong></p>
        <button className='bg-red-900' onClick={() => navigate('/')}>wha</button>

      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className='absolute bottom-0 w-screen py-4 bg-gray-950'>
      <p className='text-center text-white'>©2025 SoulConnect, All rights reserved</p>
    </footer>
  );
}

// Main App component
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWithRouter;
