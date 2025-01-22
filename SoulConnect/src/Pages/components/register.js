import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/App.css';

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

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                            {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
                            
                            <label htmlFor="username" className="block mb-2 text-lg font-Rubik">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="w-full p-2 mb-4 bg-gray-100 border rounded-lg"
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
                                className="w-full p-2 bg-gray-100 border rounded-lg mb- 4"
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
                                className="w-full p-2 mb-4 bg-gray-100 border rounded-lg"
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
                                className="w-full p-2 mb-4 bg-gray-100 border rounded-lg"
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
                                className="w-full p-2 mb-4 bg-gray-100 border rounded-lg"
                                value={formData.geboortedatum}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 text-blue-600 underline"
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