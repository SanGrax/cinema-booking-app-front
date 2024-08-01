import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import BookingPage from './pages/BookingPage';
import UserPage from './pages/UserPage';
import MovieDetail from './pages/MovieDetail';
import UserAuth from './components/UserAuth';
import SeatSelection from './components/SeatSelection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies/:id" element={<MovieDetail />} /> 
      <Route path="/user" element={<UserPage />} />
      <Route path="/booking/:id" element={<SeatSelection />} />
      <Route path="/user/register" element={<UserPage />} />
      {/* <Route path="/movies" element={<MoviePage />} />
      <Route path="/booking" element={<BookingPage />} />*/}
      <Route path="/user/login" element={<UserAuth />} />
    </Routes>
  );
}

export default App;
