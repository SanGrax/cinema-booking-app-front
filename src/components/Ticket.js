import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Ticket = () => {
    // Extrae el parámetro 'id' de la URL usando useParams
    const { id } = useParams();
    // Estado para almacenar la información de la reserva
    const [reservation, setReservation] = useState(null);

    // useEffect para obtener los detalles de la reserva cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:5000/api/reservations/${id}`)
            .then(response => {
                // Actualiza el estado con los datos de la reserva
                setReservation(response.data);
            })
            .catch(error => {
                console.error('Error fetching reservation details:', error);
            });
    }, [id]);// Dependencia en 'id' para volver a ejecutar si cambia

    // Muestra un mensaje de carga mientras se obtienen los detalles de la reserva
    if (!reservation) {
        return <div>Loading...</div>;
    }
      // Desestructura los datos de la reserva
    const { movie, seats } = reservation;

    return (
        <div className="container mx-auto mt-8 p-4 border rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Your Ticket</h1>
            <h2 className="text-2xl mb-2">{movie.title}</h2>
            <p className="mb-2">Seats: {seats.join(', ')}</p>
            <p>Enjoy your movie!</p>
        </div>
    );
};

export default Ticket;