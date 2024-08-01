import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setMovie(response.data);
                
            })
            .catch(error => {
                console.error('There was an error fetching the movie!', error);
            });
    }, [id]);

    const handleBuyTickets = () => {
        const userId = localStorage.getItem('userId');
        localStorage.setItem('selectedMovieId', id); // Guardar el ID de la película en localStorage
        if (userId) {
            navigate(`/booking/${id}`);
        } else {
            const isRegistered = window.confirm("¿Estás registrado? Si es así, haz clic en 'Aceptar' para iniciar sesión. De lo contrario, haz clic en 'Cancelar' para registrarte.");
            if (isRegistered) {
                navigate('/user/login');
            } else {
                navigate('/user/register');
            }
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p>{movie.description}</p>
            <p className="text-sm text-gray-600">Duration: {movie.duration} mins</p>
            <button
                onClick={handleBuyTickets}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Comprar Entradas
            </button>
        </div>
    );
};

export default MovieDetail;

