import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
     // Extrae el parámetro 'id' de la URL usando useParams
    const { id } = useParams();
    // Estado para almacenar los detalles de la película
    const [movie, setMovie] = useState(null);
     // Hook para manejar la navegación 
    const navigate = useNavigate();

    // useEffect para obtener los detalles de la película cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                // Actualiza el estado con los datos de la película
                setMovie(response.data);
                
            })
            .catch(error => {
                console.error('There was an error fetching the movie!', error);
            });
    }, [id]);// Dependencia en 'id' para volver a ejecutar si cambia

     // Maneja el clic en el botón de compra de entradas
    const handleBuyTickets = () => {
        const userId = localStorage.getItem('userId');
        localStorage.setItem('selectedMovieId', id); // Guardar el ID de la película en localStorage
        if (userId) {
             // Si el usuario está registrado, redirige a la página de reserva
            navigate(`/booking/${id}`);
        } else {
            // Si el usuario no está registrado, muestra un mensaje de confirmación
            const isRegistered = window.confirm("¿Estás registrado? Si es así, haz clic en 'Aceptar' para iniciar sesión. De lo contrario, haz clic en 'Cancelar' para registrarte.");
            if (isRegistered) {
                 // Redirige a la página de inicio de sesión si el usuario está registrado
                navigate('/user/login');
            } else {
                // Redirige a la página de registro si el usuario no está registrado
                navigate('/user/register');
            }
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto mt-8">
            {/* Muestra los detalles de la película */}
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p>{movie.description}</p>
            <p className="text-sm text-gray-600">Duration: {movie.duration} mins</p>
            <button
                onClick={handleBuyTickets}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Buy Tickets
            </button>
        </div>
    );
};

export default MovieDetail;

