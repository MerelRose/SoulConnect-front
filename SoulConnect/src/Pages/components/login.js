import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css';
import { useAuth } from '../../authcontext';

function Home({ showModal, setShowModal }) {
    const { login } = useAuth();
    const [emailOrUsername, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isVerified, setIsVerified] = useState(true);
    const [showResendPopup, setShowResendPopup] = useState(false); // Control for resend verification popup
    const navigate = useNavigate();

    const API_KEY = '*anker';
    const API_ENDPOINT = 'http://localhost:4200/login';

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                API_ENDPOINT,
                { emailOrUsername, password },
                { headers: { 'x-api-key': API_KEY } }
            );
            const { token, role, user_id, name, verified } = response.data;

            if (verified === 0) {
                setIsVerified(false);
                setErrorMessage('Your email is not verified. Please verify your email.');
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('userId', user_id);

            const userData = { token, role, user_id, name };
            setSuccessMessage(`Welcome, ${name}`);
            setErrorMessage('');
            login(userData);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || 'Login failed');
            setSuccessMessage('');
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
                            <label htmlFor="emailOrUsername" className="block mb-2 text-lg font-Rubik">
                                E-mail:
                            </label>
                            <input
                                type="text"
                                id="emailOrUsername"
                                name="emailOrUsername"
                                placeholder="School e-mail"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                                value={emailOrUsername}
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

                        {!isVerified && (
                            <div className="mt-4">
                                <button
                                    className="w-full py-2 mb-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                    onClick={() => setShowResendPopup(true)} // Show the resend popup
                                >
                                    Resend Verification Email
                                </button>
                            </div>
                        )}

                        <button
                            className="w-full py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>

                        {/* Forgot Password */}
                        <div className="mt-4 text-center">
                            <button
                                className="text-sm text-blue-500 hover:underline"
                                onClick={() => console.log('Forgot password functionality')}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resend Verification Popup */}
            {showResendPopup && (
                <ResendVerificationPopup
                    showResendPopup={showResendPopup}
                    setShowResendPopup={setShowResendPopup}
                />
            )}
        </>
    );
}

function ResendVerificationPopup({ showResendPopup, setShowResendPopup }) {
    const [email, setEmail] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const RESEND_ENDPOINT = 'http://localhost:4200/resend';
    const API_KEY = '*anker';

    const handleResendVerification = async () => {
        if (!email.trim()) {
            setResendMessage('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post(
                RESEND_ENDPOINT,
                { email }, // Send the email to backend
                { headers: { 'x-api-key': API_KEY } }
            );
            setResendMessage(response.data.message || 'Verification email sent successfully.');
        } catch (error) {
            setResendMessage(error.response?.data?.message || 'Failed to resend verification email.');
        }
    };

    return (
        <>
            {showResendPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Resend Verification Email</h2>
                        <div className="mb-4">
                            <label htmlFor="resendEmail" className="block mb-2">
                                Enter your email to resend verification email:
                            </label>
                            <input
                                type="email"
                                id="resendEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full p-2 border rounded bg-neutral-700"
                            />
                        </div>

                        <button
                            className="w-full py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            onClick={handleResendVerification}
                        >
                            Resend Email
                        </button>

                        {resendMessage && <div className="text-green-500">{resendMessage}</div>}

                        <button
                            className="w-full py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowResendPopup(false)}
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
