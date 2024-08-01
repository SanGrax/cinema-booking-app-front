import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const UserAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/login', formData)
            .then(response => {
                setMessage('User logged in successfully');
                localStorage.setItem('userId', response.data.user._id);
                setFormData({
                    email: '',
                    password: ''
                });
                const selectedMovieId = localStorage.getItem('selectedMovieId');
                if (selectedMovieId) {
                    navigate(`/booking/${selectedMovieId}`);
                 } // Redirigir al componente de SeatSelection.js con el selectedMovieId
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
