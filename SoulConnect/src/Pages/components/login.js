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
    const [resendMessage, setResendMessage] = useState('');
    const [showResendPopup, setShowResendPopup] = useState(false);  // For the resend verification popup
    const [resendEmail, setResendEmail] = useState('');  // Email for resend
    const [showResetPopup, setShowResetPopup] = useState(false);  // For the reset password popup
    const [resetEmail, setResetEmail] = useState('');  // Email for reset
    const [resetMessage, setResetMessage] = useState('');
    const navigate = useNavigate();

    const API_KEY = '*anker';
    const API_ENDPOINT = 'http://localhost:4200/login';
    const RESEND_ENDPOINT = 'http://localhost:4200/resend'; 
    const RESET_ENDPOINT = 'http://localhost:4200/request-reset';

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

    const handleResendVerification = async () => {
        try {
            const response = await axios.post(
                RESEND_ENDPOINT,
                { email: resendEmail },  // Use the email entered in the popup
                { headers: { 'x-api-key': API_KEY } }
            );
            setResendMessage(response.data.message || 'Verification email sent successfully.');
            setShowResendPopup(false);  // Close the popup after successful resend
        } catch (error) {
            setResendMessage(error.response?.data?.message || 'Failed to resend verification email.');
        }
    };

    const handleResetPasswordRequest = async () => {
        try {
            const response = await axios.post(RESET_ENDPOINT, { email: resetEmail });
            setResetMessage(response.data.message || 'If this email is registered, a reset link will be sent.');
        } catch (error) {
            setResetMessage(error.response?.data?.message || 'Failed to send reset request.');
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
                                    onClick={() => setShowResendPopup(true)}  // Show the resend popup
                                >
                                    Resend Verification Email
                                </button>
                                {resendMessage && <div className="mt-2 text-green-500">{resendMessage}</div>}
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
                                onClick={() => setShowResetPopup(true)} // Show the reset password popup
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resend Verification Email Popup */}
            {showResendPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Resend Verification Email</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleResendVerification();
                            }}
                        >
                            <label htmlFor="resendEmail" className="block mb-2 text-lg font-Rubik">
                                Enter your email address:
                            </label>
                            <input
                                type="email"
                                id="resendEmail"
                                value={resendEmail}
                                onChange={(e) => setResendEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Resend Email
                            </button>
                        </form>
                        {resendMessage && <div className="mt-2 text-green-500">{resendMessage}</div>}
                        <button
                            className="w-full py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowResendPopup(false)}  // Close the popup
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Reset Password Popup */}
            {showResetPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-white rounded-lg shadow-lg bg-neutral-800 w-96">
                        <h2 className="mb-4 text-2xl font-semibold">Reset Password</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleResetPasswordRequest();
                            }}
                        >
                            <label htmlFor="resetEmail" className="block mb-2 text-lg font-Rubik">
                                Enter your email address:
                            </label>
                            <input
                                type="email"
                                id="resetEmail"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full p-2 mb-4 border rounded-lg bg-neutral-800"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Request Reset
                            </button>
                        </form>
                        {resetMessage && <div className="mt-2 text-green-500">{resetMessage}</div>}
                        <button
                            className="w-full py-2 mt-4 bg-gray-600 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowResetPopup(false)}  // Close the popup
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
