import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import loginImage from '../assests/login-animate.svg'

const LoginPage = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!(email && password)) {
            toast.error("Fill all the Creds !");
            return;
        }
        
        try {
            const res = await login(email, password);
            console.log("@loginPage: login response", res);
            if (res.user && res.accessToken) {
                toast.success("Logged In successfully");
                console.log("Global User:", res.user);
                navigate('/user'); // Redirect to home page or dashboard
            } else {
                setError('Unexpected response from server');
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            console.error("@loginPage: login error", error);
            setError(error.response?.data?.error || error.message || "Login failed");
            toast.error(error.response?.data?.error || error.message || "Login failed");
        }
    };

    return (
        <div className="font-[sans-serif] w-full">
            <div className="flex flex-col items-center justify-center py-4 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="mb-10 py-3">
                                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                                    Sign in to your account and explore a world of possibilities. Your journey begins here.
                                </p>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email <span className='text-red-400'>*</span></label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        placeholder="Enter email"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password <span className='text-red-400'>*</span></label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        placeholder="Enter password"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button
                                    type="submit"
                                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    Log in
                                </button>
                            </div>

                            <p className="text-sm !mt-8 text-center text-gray-800">
                                Don't have an account?
                                <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                    <div className="lg:h-[500px] md:h-[350px] max-md:mt-8">
                        <img
                            src={loginImage}
                            className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                            alt="Login Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
