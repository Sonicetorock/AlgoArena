import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'
const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    // Initial state
    const initialFormData = {
        fullname: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        bio: '',
        forgotPassQ: '', //dropdown
        forgotPassA: '', 
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');

    //handleinput
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const res = await register(formData);
            // toastsuccessful registration
            toast.success(res.msg)//'User registered successfully!'
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.error || error.message || "Login failed");
            toast.error(error.response?.data?.error || error.message || "Login failed");
        }
    };

    return (
        <div className="m-5 flex items-center justify-center font-[sans-serif]">
            <div className="max-w-3xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]  flex">
                {/*  Mandatory Fields */}
                <div className="w-1/2 pr-8">
                    <h2 className="text-gray-800 text-3xl font-extrabold">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="flex flex-col">
                            <label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInput}
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInput}
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInput}
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInput}
                                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                                required
                            />
                        </div>
                        <div className='flex justify-evenly items-baseline'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                        >
                            Register
                        </button>
                    <p className="mt-4 text-sm text-center text-gray-800">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                            Login
                        </Link>
                    </p>
                    </div>
                    </form>
                    {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
                </div>
                {/* Additional Information */}
                <div className="w-1/2 pl-8 border-l">
                    <h2 className="text-gray-800 text-2xl font-extrabold mb-6">Additional Information</h2>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInput}
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="bio" className="text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInput}
                            rows="3"
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Tell us about yourself"
                        />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="forgotPassQ" className="text-sm font-medium text-gray-700 mb-2">
                            Forgot Password Question
                        </label>
                        <select
                            id="forgotPassQ"
                            name="forgotPassQ"
                            value={formData.forgotPassQ}
                            onChange={handleInput}
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                        >
                            <option value="">Select a question</option>
                            <option value="What is your pet's name?">What is your pet's name?</option>
                            <option value="Which city are you from?">Which city are you from?</option>
                            <option value="What is your favorite food?">What is your favorite food?</option>
                            <option value="Which programming language do u love most ?">What is your favorite food?</option>
                            <option value="What is your first salary ?">What is your favorite food?</option>
                            <option value="Your dream company ?">What is your favorite food?</option>
                        </select>
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="forgotPassA" className="text-sm font-medium text-gray-700 mb-2">
                            Forgot Password Answer
                        </label>
                        <input
                            type="text"
                            id="forgotPassA"
                            name="forgotPassA"
                            value={formData.forgotPassA}
                            onChange={handleInput}
                            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                            placeholder="Answer to selected question(keep it short)"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;