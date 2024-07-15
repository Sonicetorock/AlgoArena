import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { apiAdmin } from "../../utils/apiURLS";

const EditProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState({
    probName: "",
    probStatement: "",
    difficulty: 1,
    level: "normal",
    setNum: 0,
    tags: [],
    hints: [],
    testcases: [],
    demoTestCases: [],
    constraintTime: 0,
    constraintMemory: 0,
  });
  const [tagsInputs, setTagsInputs] = useState([]);
  const [hintsInputs, setHintsInputs] = useState([]);
  const [testcasesInputs, setTestcasesInputs] = useState([]);
  const [demoTestCasesInputs, setDemoTestCasesInputs] = useState([]);

  // Fetch problem data when component mounts
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${apiAdmin}/problems/${id}`);
        const problem = response.data.problem;
        setFormData(problem);
        setTagsInputs(problem.tags);
        setHintsInputs(problem.hints);
        setTestcasesInputs(problem.testcases);
        setDemoTestCasesInputs(problem.demoTestCases);
      } catch (error) {
        console.error("Error fetching problem:", error);
        toast.error("Error fetching problem");
      }
    };

    fetchProblem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChangeType1 = (setter, index, value, arrayName) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArr.filter((item) => item !== ""), // Remove empty strings
      }));
      return newArr;
    });
  };

  const handleArrayChangeType2 = (setter, index, field, value, arrayName) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], [field]: value };
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArray,
      }));
      return newArray;
    });
  };

  const handleArrayAddType1 = (setter, arrayName) => {
    setter((prev) => {
      const newArr = [...prev, ""];
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArr.filter((item) => item !== ""), // Remove empty strings
      }));
      return newArr;
    });
  };

  const handleArrayAddType2 = (setter, arrayName, template) => {
    setter((prev) => {
      const newArray = [...prev, template];
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArray,
      }));
      return newArray;
    });
  };

  const handleArrayRemoveType1 = (setter, index, arrayName) => {
    setter((prev) => {
      const newArr = prev.filter((_, i) => i !== index);
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArr.filter((item) => item !== ""), // Remove empty strings
      }));
      return newArr;
    });
  };

  const handleArrayRemoveType2 = (setter, index, arrayName) => {
    setter((prev) => {
      const newArray = prev.filter((_, i) => i !== index);
      setFormData((prevState) => ({
        ...prevState,
        [arrayName]: newArray,
      }));
      return newArray;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiAdmin}/problems/${id}`, formData);
      toast.success("Problem updated successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Error updating problem");
      console.error("Error updating problem:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Update Problem
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Problem Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Problem Title
              </label>
              <input
                type="text"
                name="probName"
                value={formData.probName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Problem Statement
              </label>
              <textarea
                name="probStatement"
                value={formData.probStatement}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <input
                type="number"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="normal">Normal</option>
                <option value="premium">Premium</option>
                <option value="elite">Elite</option>
              </select>
            </div>
            {/* Set Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Set Number
              </label>
              <input
                type="number"
                name="setNum"
                value={formData.setNum}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              {tagsInputs.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) =>
                      handleArrayChangeType1(
                        setTagsInputs,
                        index,
                        e.target.value,
                        "tags"
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleArrayRemoveType1(setTagsInputs, index, "tags")
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayAddType1(setTagsInputs, "tags")}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Add Tag
              </button>
            </div>
            {/* Hints */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hints
              </label>
              {hintsInputs.map((hint, index) => (
                <div key={index} className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) =>
                      handleArrayChangeType1(
                        setHintsInputs,
                        index,
                        e.target.value,
                        "hints"
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleArrayRemoveType1(setHintsInputs, index, "hints")
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleArrayAddType1(setHintsInputs, "hints")}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Add Hint
              </button>
            </div>
            {/* Testcases */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Testcases
              </label>
              {testcasesInputs.map((testcase, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={testcase.input}
                      onChange={(e) =>
                        handleArrayChangeType2(
                          setTestcasesInputs,
                          index,
                          "input",
                          e.target.value,
                          "testcases"
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayRemoveType2(
                          setTestcasesInputs,
                          index,
                          "testcases"
                        )
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={testcase.output}
                      onChange={(e) =>
                        handleArrayChangeType2(
                          setTestcasesInputs,
                          index,
                          "output",
                          e.target.value,
                          "testcases"
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Output"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleArrayAddType2(setTestcasesInputs, "testcases", {
                    input: "",
                    output: "",
                  })
                }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Add Testcase
              </button>
            </div>
            {/* Demo Testcases */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Demo Testcases
              </label>
              {demoTestCasesInputs.map((demoTestCase, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={demoTestCase.input}
                      onChange={(e) =>
                        handleArrayChangeType2(
                          setDemoTestCasesInputs,
                          index,
                          "input",
                          e.target.value,
                          "demoTestCases"
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayRemoveType2(
                          setDemoTestCasesInputs,
                          index,
                          "demoTestCases"
                        )
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="text"
                      value={demoTestCase.output}
                      onChange={(e) =>
                        handleArrayChangeType2(
                          setDemoTestCasesInputs,
                          index,
                          "output",
                          e.target.value,
                          "demoTestCases"
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Output"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleArrayAddType2(setDemoTestCasesInputs, "demoTestCases", {
                    input: "",
                    output: "",
                  })
                }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Add Demo Testcase
              </button>
            </div>
            {/* Constraint Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Constraint Time
              </label>
              <input
                type="number"
                name="constraintTime"
                value={formData.constraintTime}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {/* Constraint Memory */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Constraint Memory
              </label>
              <input
                type="number"
                name="constraintMemory"
                value={formData.constraintMemory}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-evenly">
              <button
                type="submit"
                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Update Problem
              </button>
              <div>
                <Link
                  to="/admin/dashboard"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <button
                    type="button"
                    class="bg-white text-center w-48 rounded-xl h-12 relative font-sans text-black text-lg font-semibold group"
                  >
                    <div class="bg-emerald-600 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000000"
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        ></path>
                        <path
                          fill="#000000"
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        ></path>
                      </svg>
                    </div>
                    <p className="translate-x-2">Go Back</p>
                  </button>
                </Link>
              </div>
            </div>
            

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProblemPage;
