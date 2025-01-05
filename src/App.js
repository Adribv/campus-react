import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.js';
import Home from './pages/home';
import WebTeam from './pages/webteam.js';
import Footer from './components/Footer';
import './style.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/webteam" element={<WebTeam />} />
          
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;