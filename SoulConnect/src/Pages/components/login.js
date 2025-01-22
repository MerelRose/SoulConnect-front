import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css';
import { useAuth } from '../../authcontext';

function Home({ showModal, setShowModal }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Access the API key from the environment variable
    const API_KEY = '*anker';
    const API_ENDPOINT = 'http://localhost:4200/login';

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                API_ENDPOINT,
                { email, password },
                { headers: { 'x-api-key': API_KEY } }
            );

            const { token, role, user_id, name } = response.data;
            const userData = { token, role, user_id, name };

            console.log('Logged-in user info:', userData);

            setSuccessMessage(`Welcome, ${name}`);
            setErrorMessage('');

            login(userData);
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || 'Login failed');
            setSuccessMessage('');
            console.error(error);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                        >
                            <label htmlFor="email" className="block mb-2 text-lg font-Rubik">
                                E-mail:
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="School e-mail"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="block mb-2 text-lg font-Rubik">
                                Wachtwoord:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Wachtwoord"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                Login
                            </button>
                        </form>

                        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
                        {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}

                        {/* Close Button */}
                        <button
                            className="w-full py-2 mt-4 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;