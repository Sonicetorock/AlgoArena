import { Eraser } from 'lucide-react';
import React from 'react';
import { Tooltip } from 'react-tooltip';

//form comps
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

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
    <div className="flex justify-start gap-8 align-baseline items-center">
      <div className="flex flex-col mb-4">
        {/* <label className="mb-2">Language:</label>
        <select
          value={userLang}
          onChange={(e) => setUserLang(e.target.value)}
          className="p-2 border border-gray-300"
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="c">C</option>
        </select> */}
        <FormControl variant="filled" sx={{ minWidth: 120 }}>
        <InputLabel id="label_language">Language</InputLabel>
        <Select
          labelId="label_language"
          id="label_language"
          value={userLang}
          onChange={(e) => setUserLang(e.target.value)}
        >
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="c">C</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div className="flex flex-col mb-4">
        {/* <label className="mb-2">Theme:</label>
        <select
          value={userTheme}
          onChange={(e) => setUserTheme(e.target.value)}
          className="p-2 border border-gray-300">
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
         */}
        <FormControl variant="filled" sx={{  minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={userTheme}
          onChange={(e) => setUserTheme(e.target.value)}
        >
          <MenuItem value="vs-dark">Dark Mode</MenuItem>
          <MenuItem value="light">Light Mode</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div className="flex flex-col mb-4 w-[15%]">
        {/* <label className="mb-1">Font Size:</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="p-2 border border-gray-300"
        /> */}
        <TextField id="filled-basic" label="Font Size" variant="filled" type='Number' value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}/>
      </div>

      <div>
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={clearCode}  data-tooltip-id="my-tooltip"
              data-tooltip-content="Clear code"
              data-tooltip-place="top">
        <Tooltip id="my-tooltip" />
        <Eraser/>
        </button>
      </div>
    </div>
  );
};

export default CodeEditorSettings;
