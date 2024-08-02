import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // Estado para almacenar mensajes de éxito o error
    const [message, setMessage] = useState('');
    // Hook para manejar la navegación 
    const navigate = useNavigate();

     // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

     // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();// Previene el comportamiento por defecto del formulario

        // Envía una solicitud POST con los datos del formulario
        axios.post('http://localhost:5000/api/users/login', formData)
            .then(response => {
                setMessage('User logged in successfully');

                // Guarda el ID del usuario en el almacenamiento local
                localStorage.setItem('userId', response.data.user._id);

                 // Limpia los datos del formulario
                setFormData({
                    email: '',
                    password: ''
                });

                // Obtiene el ID de la película seleccionada del almacenamiento local
                const selectedMovieId = localStorage.getItem('selectedMovieId');
                if (selectedMovieId) {
                     // Redirige al componente de selección de asientos con el ID de la película
                    navigate(`/booking/${selectedMovieId}`);
                }
            })
            .catch(error => {
                setMessage('Error logging in: ' + error.response.data.message);
            });
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
            {message && <p className="text-center mt-4">{message}</p>}
        </div>
    );
};

export default UserAuth;
