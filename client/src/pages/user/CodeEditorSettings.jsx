import React from "react";
import { EraserIcon } from 'lucide-react';
import { Select, Input, Button } from "@chakra-ui/react";

const CodeEditorSettings = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize, clearCode }) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="flex justify-start gap-4 align-baseline items-center">
      <div className="flex flex-col mb-4">
        <label htmlFor="language">Language</label>
        <Select id="language" value={userLang} onChange={(e) => setUserLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="theme">Theme</label>
        <Select id="theme" value={userTheme} onChange={(e) => setUserTheme(e.target.value)}>
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col mb-4 w-[15%]">
        <label htmlFor="font-size">Font Size</label>
        <Input
          id="font-size"
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>

      <Button
        sx={{
          bg: "red.500",
          color: "white",
          py: 2,
          px: 4,
          rounded: "md",
          _hover: { bg: "red.600" },
        }}
        onClick={clearCode}
      >
        <EraserIcon />
        Clear Code
      </Button>
    </div>
  );
};

export default CodeEditorSettings;
