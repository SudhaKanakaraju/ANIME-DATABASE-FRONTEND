//src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import PopularPage from './components/PopularPage';
import AiringPage from './components/AiringPage';
import UpcomingPage from './components/UpcomingPage';
import AnimeDetailPage from './components/AnimeDetailPage'; // Added
import { GlobalProvider } from './context/global';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/airing" element={<AiringPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} /> 
      </Routes>
    </GlobalProvider>
  );
}

export default App;