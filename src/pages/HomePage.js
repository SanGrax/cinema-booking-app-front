import React from 'react';
import MovieList from '../components/MovieList';

const HomePage = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to Cinema Booking</h1>
            <MovieList />
        </div>
    );
};

export default HomePage;
