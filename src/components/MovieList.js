import React, { useState, useEffect } from 'react';
import axios from 'axios';// Importa axios para hacer peticiones HTTP
import { useNavigate } from 'react-router-dom';// Importa useNavigate para manejar la navegación

const MovieList = () => {
    // Estado para almacenar la lista de películas
    const [movies, setMovies] = useState([]);
     // Hook para manejar la navegación 
    const navigate = useNavigate();

    // useEffect para realizar una petición a la API cuando el componente se monta
    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then(response => {
                 // Actualiza el estado con los datos obtenidos
                setMovies(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, []);// El array vacío asegura que el efecto se ejecute solo una vez cuando el componente se monta

    // Función para manejar el clic en el botón y navegar a la página de descripción de la película
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
                        See description
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MovieList;

