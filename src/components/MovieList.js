import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, []);

    const handleViewDescription = (id) => {
        navigate(`/movies/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {movies.map(movie => (
                <div key={movie._id} className="border p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p>{movie.description}</p>
                    <p className="text-sm text-gray-600">Duration: {movie.duration} mins</p>
                    <button
                        onClick={() => handleViewDescription(movie._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                    >
                        Ver Descripción
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MovieList;

