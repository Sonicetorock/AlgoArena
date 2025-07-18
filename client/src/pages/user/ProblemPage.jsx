import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUser } from "../../utils/apiURLS";
import CodeEditorSettings from "./CodeEditorSettings";

// 3rd party Imports
import { Tooltip } from "react-tooltip";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

// icons
import { Eraser , CirclePlay, Send } from 'lucide-react';
import { FaTags } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";
import { TfiLayoutAccordionList, TfiThought } from "react-icons/tfi";
import { useAuth } from "../../context/AuthContext";

const ProblemPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);

  const compile = async () => {
    if (!userCode) {
      toast.error("Code can't be empty!");
      return;
    }
    setLoading(true);
    setUserOutput("");
    setIsError(false);
    try {
      const payload = {
        code: userCode.trim(),
        language: userLang === "python" ? "py" : userLang,
        input: userInput,
        pid: id,
      };
      const response = await axios.post(`${apiUser}/compile`, payload);
      console.log("running ", payload);
      console.log(response.data);
      setUserOutput(response.data.output);
      onOpen(); // Open the drawer to show the output
    } catch (error) {
      console.error("Error compiling code:", error);
      setIsError(true);
      toast.error(
        error.response?.data?.msg ||
          "Error compiling code" ||
          error.response?.data?.error
      );
      setUserOutput(
        error.response?.data?.error || error.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    if (!userCode) {
      toast.error("Code can't be empty!");
      return;
    }
    setLoading(true);
    setUserOutput("");
    setIsError(false);
    try {
      const payload = {
        code: userCode.trim(),
        language: userLang === "python" ? "py" : userLang,
        uid: user._id, //sending for purpose of storing in the submission schema
        pid: id,
      };
      console.log("submitting.... ", payload);

      const response = await axios.post(`${apiUser}/submit`, payload);
      console.log(response.data);

      //toasting 
      if(response.data.allTestsPassed) {toast.success(response.data.verdict);toast.success("YourScore+=100",{icon:'⚡'})}
      else {toast.error(response.data.verdict);toast.success("YourScore-=15",{icon:'🥹'})}
      const formattedOutput = formatTestCaseResults(response.data.results,response.data.totalTCs);
      setUserOutput(formattedOutput);
      onOpen(); // Open the drawer to show the output
    } catch (error) {
      console.error("Error submitting code:", error);
      setIsError(true);
      toast.error(
        error.response?.data?.msg ||
          "Error submitting code" ||
          error.response?.data?.error
      );
      setUserOutput(
        error.response?.data?.error || error.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUser}/problems/${id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setProblem(response.data.problem);
        console.log("Problem Acquired:", problem);
      })
      .catch((error) => console.error("Error fetching problem:", error));
  }, [id,loading, problem]);

  const formatTestCaseResults = (results,total) => {
    return results
      .map((result, index) => {
        const emoji = result.passed ? "✅" : "❌";
        return `TC ${index + 1}/${total}: ${emoji} ${result.passed ? "Passed and executed in" : "Failed with"} ${result.passed ? (result.execTime/1000).toFixed(2) : "wrong answer"}\n` 
      }) 
  };
  
  const clearOutput = () => setUserOutput("");
  const clearCode = () => setUserCode("");

  const revealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints((prevRevealedHints) => {
        const newRevealedHints = [...prevRevealedHints, index];
        if (newRevealedHints.length === problem.hints.length) {
          // All hints are revealed, disable tooltip
          const hintUnlockElement = document.getElementById("hint-unlock");
          if (hintUnlockElement) {
            hintUnlockElement.remove();
          }
        }
        return newRevealedHints;
      });
    }
  };

  return (
    problem && (
      <div className="p-8 flex">
        <div className="w-1/2 pr-4 font-serif">
          <h1 className="text-3xl font-bold mb-4 font-serif">
            {problem.probName.charAt(0).toUpperCase() +
              problem.probName.slice(1)}
          </h1>
          <div className="flex-col gap-4 ">
            <p className="font-semibold text-md text-gray-600 mb-2 flex items-center gap-1 hover:text-amber-400">
              <CiCalendarDate size={25} />
              <span>Posted on </span>
              {new Date(problem.createdAt).toLocaleString()}
            </p>
            <p className="font-semibold text-md text-gray-600 mb-2 flex items-center gap-1 hover:text-emerald-400">
              <MdUpdate size={25} />
              <span>Updated on </span>
              {new Date(problem.updatedAt).toLocaleString()}
            </p>
          </div>

          <p className="mx-2 my-5 text-xl font-serif">
            <strong>Problem Statement:</strong> {problem.probStatement}
          </p>
          <div className="flex flex-wrap justify-left my-2 gap-2 rounded-md">
            <Tooltip id="my-tooltip" />
            <span
              className=" flex items-center gap-1 cursor-pointer px-2 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={problem.totalSubmissions}
              data-tooltip-place="top"
            >
              <span className="block w-3 h-3 bg-red-500 rounded-full"></span>
              Submissions
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer px-1.5 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={problem.difficulty}
              data-tooltip-place="top"
            >
              <span className="block w-3 h-3 bg-amber-600 rounded-full"></span>
              Difficulty
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer px-1.5 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={problem.setNum}
              data-tooltip-place="top"
            >
              <span className="block w-3 h-3 bg-zinc-800 rounded-full"></span>
              Set Number
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer px-1.5 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={problem.level}
              data-tooltip-place="top"
            >
              <span className="block w-3 h-3 bg-rose-500 rounded-full"></span>
              Level
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer px-1.5 py-2 bg-white border border-gray-300 rounded-2xl shadow-xl"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={problem.acceptedSols}
              data-tooltip-place="top"
            >
              <span className="block w-3 h-3 bg-indigo-800 rounded-full"></span>
              Accepted Codes
            </span>
          </div>

          {/* tags */}
          {problem.tags && problem.tags.length > 0 ? (

          <div className=" bg-white dark:bg-transparent p-2 m-1 shadow-xl rounded-lg">
            <p className=" text-xl font-semibold m-4 flex gap-2 items-center">
              Tags <FaTags />
            </p>
            <div className="flex flex-wrap">
              {problem.tags.map((tag, index) => (
                <span
                  className="p-1.5 m-1.5 text-[12px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3]"
                  key={tag + index}
                >
                  # {tag}
                </span>
              ))}
            </div>
          </div>):<h2 className="text-xl font-semibold">No Tags!</h2>}

          {/* hints */}
          <Tooltip id="hint-unlock" className="z-10" />
          {problem.hints && problem.hints.length > 0 ? (
          <div className="bg-white dark:bg-transparent p-2 m-1 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold m-4 flex gap-2 items-center">
              Hints <TfiThought />
            </h2>
            <ul>
              {problem.hints.map((hint, index) => (
                <li
                  key={index}
                  className={`mb-2 p-2 rounded  transition-all duration-500 ease-in-out ${
                    revealedHints.includes(index)
                      ? "bg-white text-black"
                      : "bg-gray-500 text-gray-500 cursor-pointer"
                  }`}
                  data-tooltip-id={`${
                    revealedHints.includes(index) ? "" : "hint-unlock"
                  }`}
                  data-tooltip-content="Tap to view"
                  data-tooltip-place="top"
                  onClick={() => revealHint(index)}
                >
                  <p className={`${revealedHints.includes(index) ? "block" : "hidden"}`}>
                    {hint}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ):<h2 className="text-xl font-semibold">No Hints! Figure this out on your own</h2>}

          <div className="bg-white dark:bg-transparent p-2 m-1 shadow-xl rounded-lg">
            <h2 className="text-xl font-semibold m-4 flex gap-2 items-center">
              Demo Test Cases
            </h2>
            <ul className="mb-6">
              {problem.demoTestCases.map((tc, index) => (
                <div
                  className="bg-zinc-100 w-6/7 h-fit rounded-lg m-2"
                  key={index}
                >
                  <div className="flex p-2 gap-1">
                    <div className="">
                      <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                    <div className="circle">
                      <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                    <div className="circle">
                      <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                  </div>
                  <div className="card__content p-2">
                    <li key={tc._id} className="mb-2">
                      <p>
                        <strong>Input:</strong> {tc.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {tc.output}
                      </p>
                      {tc.explanation && (
                        <p>
                          <strong>Explanation:</strong> {tc.explanation}
                        </p>
                      )}
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/2">
          <CodeEditorSettings
            userLang={userLang}
            setUserLang={setUserLang}
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            clearCode={clearCode}
          />
          <Editor
            height="45vh"
            language={userLang}
            theme={userTheme}
            value={userCode}
            loading={ <DNA
              visible={true}
              height="50"
              width="50"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />}
            options={{
              fontSize: fontSize,
              automaticLayout: true,
              cursorBlinking: true,
              overviewRulerBorder: true,
            }}
            onChange={(value) => setUserCode(value)}
          />
          <div className="mt-4">
            <div className="flex justify-start align-baseline items-center gap-2 mb-4">

            <button
              className="bg-blue-500 text-white py-2 px-4 mr-2 flex gap-1 rounded-sm"
              onClick={compile} >
                <CirclePlay/>
              Run
            </button>
            <button
              className="bg-emerald-500 text-white py-2 px-4 mr-2 flex gap-1 rounded-sm"
              onClick={submitCode} >
                <Send/>
              Submit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 flex gap-1 rounded-sm"
              onClick={clearOutput}>
              <Eraser />
              Erase Output
            </button>
                </div>
            <label className="block mb-2">Input:</label>
            <textarea
              className="w-full p-2 border border-gray-300 mb-4"
              rows="4"
              onChange={(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
        </div>

        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Output</DrawerHeader>

            <DrawerBody>
              {loading && (
                <DNA
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              )}
              <pre
                className={`${
                  isError ? "text-red-500" : ""
                } p-4 border border-gray-300 bg-gray-100 `}
              >
                {userOutput || ""}
              </pre>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  );
};

export default ProblemPage;


