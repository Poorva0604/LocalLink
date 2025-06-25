import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.js'
import Home from './Home.js'
import About from './About.js'
import Forgotpswdpage from './Forgotpswdpage.js';
import Loginpage from './Loginpage.js';
import Registerpage from './Registerpage.js';
import Profile from './Profile.js';
import Addservice from './Addservice.js';
import Searchresults from './Searchresults.js';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/forgotpswdpage" element={<Forgotpswdpage />} />
        <Route path="/registerpage" element={<Registerpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addservice" element={<Addservice />} />
        <Route path="/searchresults" element={<Searchresults />} />
      </Routes>
    </Router>
  );
}

export default App;
