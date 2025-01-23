import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import NavBar from '../NavBar';
import Landing from './Pages/Landing';
import Voorwaarden from './Pages/voorwaarden';
import Profile from './Pages/Profiel';
import Author from './Pages/add';
// import Login from './Pages/notfound';
// import Register from './Pages/notfound';
import NotFound from './Pages/notfound';

const App = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/voorwaarden" element={<Voorwaarden />} />
        <Route path="/profiel" element={<Profile />} />
        <Route path="/add" element={<Author />} />
        {/* <Route path="/" element={<Login />} />
        <Route path="/" element={<Register />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;