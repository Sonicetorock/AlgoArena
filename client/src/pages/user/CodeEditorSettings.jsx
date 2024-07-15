import React from 'react';

const CodeEditorSettings = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize,clearCode }) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
];
const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
]
  return (
    <div className="flex justify-start gap-8 align-baseline">
      <div className="flex flex-col mb-4">
        <label className="mb-2">Language:</label>
        <select
          value={userLang}
          onChange={(e) => setUserLang(e.target.value)}
          className="p-2 border border-gray-300"
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2">Theme:</label>
        <select
          value={userTheme}
          onChange={(e) => setUserTheme(e.target.value)}
          className="p-2 border border-gray-300"
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
          {/* Add more themes as needed */}
        </select>
      </div>

      <div className="flex flex-col mb-4 w-[15%]">
        <label className="mb-1">Font Size:</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="p-2 border border-gray-300"
        />
      </div>
      <div>
      <button className="bg-red-500 text-white p-3 rounded-md" onClick={clearCode}>Clear Code</button>
      </div>
    </div>
  );
};

export default CodeEditorSettings;
