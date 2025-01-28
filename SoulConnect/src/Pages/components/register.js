import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/App.css';
import Voorwaarden from './voorwaarden';
import { Link } from 'react-router-dom';
//test
function Registration({ showModal, setShowModal }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        postcode: '',
        geboortedatum: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_KEY = '*anker'; // Access the API key from the environment variable

        // Password validation
        if (formData.password.length < 16) {
            setErrorMessage('Password must be at least 16 characters long.');
            return;
        }

        // Age validation
        const birthDate = new Date(formData.geboortedatum);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const isAdult = age > 18 || (age === 18 && monthDiff >= 0);

        if (!isAdult) {
            setErrorMessage('You must be at least 18 years old to register.');
            return;
        }

        // Log the data being sent
        console.log('Data being sent to the server:', formData);

        try {
            const response = await axios.post('http://localhost:4200/users', formData, {
                headers: {
                    'api-key': API_KEY // Include the API key in the headers
                }
            });
            if (response.status === 201) {
                setSuccessMessage('Registration successful! Please check your email to verify your account.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    postcode: '',
                    geboortedatum: ''
                });
            }
        } catch (error) {
            // Handle error response from the backend
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || 'Registration failed. Please try again.');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
            setSuccessMessage('');
        }
    };

    const [showVoorwaarden, setShowVoorwaarden] = useState(false);

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <div className="p-2 mt-4 text-white bg-red-500 bg-opacity-50 border-4 border-red-700 rounded-lg">{errorMessage}</div>}
                            {successMessage && <div className="p-2 mt-4 text-white bg-green-500 bg-opacity-50 border-4 border-green-700 rounded-lg">{successMessage}</div>}
                            
                            <label htmlFor="username" className="block mb-2 text-lg font-Rubik">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email" className="block mb-2 text-lg font-Rubik">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="password" className="block mb-2 text-lg font-Rubik">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="postcode" className="block mb-2 text-lg font-Rubik">
                                Postcode:
                            </label>
                            <input
                                type="text"
                                id="postcode"
                                name="postcode"
                                placeholder="Postcode"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={formData.postcode}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="geboortedatum" className="block mb-2 text-lg font-Rubik">
                                Geboortedatum:
                            </label>
                            <input
                                type="date"
                                id="geboortedatum"
                                name="geboortedatum"
                                className="w-full p-2 border mb-4 rounded-lg bg-neutral-800"
                                value={formData.geboortedatum}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 mt-3"
                                onClick={() => setShowVoorwaarden(true)}
                            >
                                voorwaarden
                            </button>

                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3"
                            >
                                Register
                            </button>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showVoorwaarden && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Voorwaarden</h2>
                        <Voorwaarden />
                        <button
                            onClick={() => setShowVoorwaarden(false)}
                            className="w-full py-2 mt-4 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Registration;