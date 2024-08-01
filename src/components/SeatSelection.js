import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SeatSelection = () => {
    const navigate = useNavigate();
    const [seats, setSeats] = useState(Array(30).fill(null)); // Suponiendo 30 asientos para simplificar
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const userId = localStorage.getItem('userId');
    const movieId = localStorage.getItem('selectedMovieId');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/reservations/movie/${movieId}`)
            .then(response => {
                const reserved = response.data.flatMap(reservation => reservation.seats);
                setReservedSeats(reserved);
            })
            .catch(error => {
                console.error('There was an error fetching the reserved seats!', error);
            });
    }, [movieId]);

    const handleSeatClick = (index) => {
        const seat = `A${index + 1}`;
        if (reservedSeats.includes(seat)) return;

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleReserveSeats = () => {
        const reservationData = {
            user: userId,
            movie: movieId,
            seats: selectedSeats
        };

        axios.post('http://localhost:5000/api/reservations', reservationData)
            .then(response => {
                alert('Reservation created successfully!');
                navigate(`/tickets/${response.data.reservation._id}`);
            })
            .catch(error => {
                alert('Error creating reservation: ' + error.response.data.message);
            });
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>
            <div className="grid grid-cols-6 gap-4">
                {seats.map((seat, index) => {
                    const seatNumber = `A${index + 1}`;
                    const isReserved = reservedSeats.includes(seatNumber);
                    const isSelected = selectedSeats.includes(seatNumber);
                    return (
                        <button
                            key={index}
                            className={`p-2 border rounded ${isReserved ? 'bg-red-500' : isSelected ? 'bg-green-500' : 'bg-gray-200'}`}
                            onClick={() => handleSeatClick(index)}
                            disabled={isReserved}
                        >
                            {seatNumber}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={handleReserveSeats}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={selectedSeats.length === 0}
            >
                Reserve Seats
            </button>
        </div>
    );
};

export default SeatSelection;
