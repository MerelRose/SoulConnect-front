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
    const [isVerified, setIsVerified] = useState(true); 
    const [resendMessage, setResendMessage] = useState(''); 
    const navigate = useNavigate();

    const API_KEY = '*anker';
    const API_ENDPOINT = 'http://localhost:4200/login';
    const RESEND_ENDPOINT = 'http://localhost:4200/resend-verification';

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                API_ENDPOINT,
                { email, password },
                { headers: { 'x-api-key': API_KEY } }
            );
    
            // Log the entire response data for debugging
            console.log('Login Response:', response.data);
    
            const { token, role, user_id, name, verified } = response.data;
    
            // Log the specific login info
            console.log(`User  Info: 
                Email: ${email}, 
                Token: ${token}, 
                Role: ${role}, 
                User ID: ${user_id}, 
                Name: ${name}, 
                Verified: ${verified}`);
    
            // Check if the user is verified
            if (verified === 0) {
                setIsVerified(false);
                setErrorMessage('Your email is not verified. Please verify your email.');
                return;
            }
    
            // If verified, proceed with login
            const userData = { token, role, user_id, name };
            setSuccessMessage(`Welcome, ${name}`);
            setErrorMessage('');
            login(userData); 
            navigate('/dashboard');
        } catch (error) {
            // Handle errors from the API
            setErrorMessage(error.response?.data?.message || error.message || 'Login failed');
            setSuccessMessage('');
            console.error(error);
        }
    };

    const handleResendVerification = async () => {
        try {
            const response = await axios.post(
                RESEND_ENDPOINT,
                { email },
                { headers: { 'x-api-key': API_KEY } }
            );

            setResendMessage(response.data.message || 'Verification email sent successfully.');
        } catch (error) {
            setResendMessage(error.response?.data?.message || 'Failed to resend verification email.');
            console.error(error);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ml-0 bg-black bg-opacity-50">
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
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
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

                        {/* Show resend email button if the user is not verified */}
                        {!isVerified && (
                            <div className="mt-4">
                                <button
                                    className="w-full py-2 mb-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                    onClick={handleResendVerification}
                                >
                                    Resend Verification Email
                                </button>
                                {resendMessage && <div className="mt-2 text-green-500">{resendMessage}</div>}
                            </div>
                        )}

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