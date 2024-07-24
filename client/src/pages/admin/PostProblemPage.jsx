
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiAdmin } from '../../utils/apiURLS';

const PostProblemPage = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        probName: '',
        probStatement: '',
        difficulty: 1,
        level: 'normal',
        setNum: 0,
        tags: [],
        hints: [],
        testcases: [],
        demoTestCases: [],
        constraintTime: 2,//default
        constraintMemory: 2,
    });
    const [tagsInputs, setTagsInputs] = useState(['']);
    const [hintsInputs, setHintsInputs] = useState(['']);
    const [testcasesInputs, setTestcasesInputs] = useState([{ input: '', output: '' }]);
    const [demoTestCasesInputs, setDemoTestCasesInputs] = useState([{ input: '', output: '', explanation: '' }]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChangeType1 = (setter, index, value, arrayName) => {
        setter(prev => {
            const newArr = [...prev];
            newArr[index] = value;
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArr.filter(item => item !== '') // Remove empty strings
            }));
            return newArr;
        });
    };

    const handleArrayChangeType2 = (setter, index, field, value, arrayName) => {
        setter(prev => {
            const newArray = [...prev];
            newArray[index] = { ...newArray[index], [field]: value };
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArray
            }));
            return newArray;
        });
    };

    const handleArrayAddType1 = (setter, arrayName) => {
        setter(prev => {
            const newArr = [...prev, ''];
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArr.filter(item => item !== '') // Remove empty strings
            }));
            return newArr;
        });
    };

    const handleArrayAddType2 = (setter, arrayName, template) => {
        setter(prev => {
            const newArray = [...prev, template];
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArray
            }));
            return newArray;
        });
    };

    const handleArrayRemoveType1 = (setter, index, arrayName) => {
        setter(prev => {
            const newArr = prev.filter((_, i) => i !== index);
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArr.filter(item => item !== '') // Remove empty strings
            }));
            return newArr;
        });
    };

    const handleArrayRemoveType2 = (setter, index, arrayName) => {
        setter(prev => {
            const newArray = prev.filter((_, i) => i !== index);
            setFormData(prevState => ({
                ...prevState,
                [arrayName]: newArray
            }));
            return newArray;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                tags: tagsInputs.filter(tag => tag !== ''),
                hints: hintsInputs.filter(hint => hint !== ''),
                testcases: testcasesInputs,
                demoTestCases: demoTestCasesInputs
            };
            console.log(updatedFormData);
            await axios.post(`${apiAdmin}/problems`, updatedFormData);
            toast.success('Problem posted successfully');
            navigate('/admin/allproblems'); //this causes the rendering of adminDashboard
        } catch (error) {
            toast.error('Error posting problem');
            console.error('Error posting problem:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Problem</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                       {/*probname*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Problem Title</label>
                            <input
                                type="text"
                                name="probName"
                                value={formData.probName}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* prob statement */}
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
                           <textarea
                                name="probStatement"
                                value={formData.probStatement}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className='flex justify-between w-full align-baseline'>
                        {/* diff */}
                            <div className='flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">Difficulty</label>
                            <input
                                type="number"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleInputChange}
                                required
                                className="mt-1  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            </div>
                        {/* level */}
                        <div className='flex flex-col'>
                            <label className=" text-sm font-medium text-gray-700">Level</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="mt-1  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="normal">Normal</option>
                                <option value="premium">Premium</option>
                                <option value="elite">Elite</option>
                            </select>
                            </div>
                        {/* set number */}
                        <div className='flex flex-col'>
                            <label className="text-sm font-medium text-gray-700">Set Number</label>
                            <input
                                type="number"
                                name="setNum"
                                value={formData.setNum}
                                onChange={handleInputChange}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        </div>
                        <div className='flex justify-between w-full align-baseline'>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Tags</label>
                            {tagsInputs.map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-1">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleArrayChangeType1(setTagsInputs, index, e.target.value, 'tags')}
                                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleArrayRemoveType1(setTagsInputs, index, 'tags')}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleArrayAddType1(setTagsInputs, 'tags')}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Tag
                            </button>
                        </div>
                        <div>
                            <label className=" text-sm font-medium text-gray-700">Hints</label>
                            {hintsInputs.map((hint, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-1">
                                    <input
                                        type="text"
                                        value={hint}
                                        onChange={(e) => handleArrayChangeType1(setHintsInputs, index, e.target.value, 'hints')}
                                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleArrayRemoveType1(setHintsInputs, index, 'hints')}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleArrayAddType1(setHintsInputs, 'hints')}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Hint
                            </button>
                        </div>
                        </div>
                        {/* Test Cases */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                            {testcasesInputs.map((testcase, index) => (
                                <div key={index} className="flex justify-between align-baseline ">
                                    <input
                                        type="text"
                                        value={testcase.input}
                                        onChange={(e) => handleArrayChangeType2(setTestcasesInputs, index, 'input', e.target.value, 'testcases')}
                                        placeholder="Input"
                                        required
                                        className=" px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={testcase.output}
                                        onChange={(e) => handleArrayChangeType2(setTestcasesInputs, index, 'output', e.target.value, 'testcases')}
                                        placeholder="Output"
                                        required
                                        className=" px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleArrayRemoveType2(setTestcasesInputs, index, 'testcases')}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleArrayAddType2(setTestcasesInputs, 'testcases', { input: '', output: '' })}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Test Case
                            </button>
                        </div>

                        {/* Demo Test Cases */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Demo Test Cases</label>
                            {demoTestCasesInputs.map((demoTestcase, index) => (
                                <div key={index} className="space-y-2 mt-1">
                                    <div className="flex justify-between items-baseline">
                                        <input
                                            type="text"
                                            value={demoTestcase.input}
                                            onChange={(e) => handleArrayChangeType2(setDemoTestCasesInputs, index, 'input', e.target.value, 'demoTestCases')}
                                            placeholder="Input"
                                            required
                                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={demoTestcase.output}
                                            onChange={(e) => handleArrayChangeType2(setDemoTestCasesInputs, index, 'output', e.target.value, 'demoTestCases')}
                                            placeholder="Output"
                                            required
                                            className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ml-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleArrayRemoveType2(setDemoTestCasesInputs, index, 'demoTestCases')}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <textarea
                                        value={demoTestcase.explanation}
                                        onChange={(e) => handleArrayChangeType2(setDemoTestCasesInputs, index, 'explanation', e.target.value, 'demoTestCases')}
                                        placeholder="Explanation (Optional)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-1"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleArrayAddType2(setDemoTestCasesInputs, 'demoTestCases', { input: '', output: '', explanation: '' })}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Demo Test Case
                            </button>
                        </div>

                        {/* Time and Memory Constraints */}
                        <div className="flex justify-around items-baseline">

                        <div className='w-1/3'>
                            <label className="block text-sm font-medium text-gray-700">Time Constraint</label>
                            <input
                                type="number"
                                name="constraintTime"
                                value={formData.constraintTime}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                        </div>
                        <div className='w-1/3'>
                            <label className="block text-sm font-medium text-gray-700">Memory Constraint</label>
                            <input
                                type="number"
                                name="constraintMemory"
                                value={formData.constraintMemory}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                        </div>

                             </div>
                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Post Problem
                            </button>
                        </div>
                        <div className="mt-6">
                            <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                                Back to Dashboard
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostProblemPage;
