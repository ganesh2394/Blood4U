import React, { useState, useEffect } from "react";

const languages = ["English", "हिन्दी", "Español", "Français", "Deutsch"];
const timezones = [
  "UTC-5 (EST)",
  "UTC+0 (GMT)",
  "UTC+5:30 (IST)",
  "UTC+8 (CST)",
  "UTC+9 (JST)",
];

const Settings = () => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");
  const [timezone, setTimezone] = useState("UTC+0 (GMT)");
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className={`max-w-3xl mx-auto p-6 ${highContrast ? "contrast-200" : ""}`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="block font-medium">Preferred Language:</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Selection */}
      <div className="mb-4">
        <label className="block font-medium">Theme:</label>
        <div className="flex gap-4">
          <button
            className={`p-2 rounded-lg ${
              theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <button
            className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Time Zone Selection */}
      <div className="mb-4">
        <label className="block font-medium">Time Zone:</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {timezones.map((tz, index) => (
            <option key={index} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      {/* Accessibility Options */}
      <div className="mb-4">
        <label className="block font-medium">Font Size:</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <label className="font-medium">High Contrast Mode:</label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={highContrast}
          onChange={() => setHighContrast(!highContrast)}
        />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <label className="font-medium">Keyboard Navigation:</label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={keyboardNav}
          onChange={() => setKeyboardNav(!keyboardNav)}
        />
      </div>
    </div>
  );
};

export default Settings;
