import React, { useState, useEffect } from "react";
import { Sun, Moon, Upload, RefreshCcw } from "lucide-react";

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
  const [notifications, setNotifications] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setLanguage("English");
    setTheme("light");
    setTimezone("UTC+0 (GMT)");
    setFontSize("normal");
    setHighContrast(false);
    setKeyboardNav(false);
    setNotifications(true);
    setProfileImage(null);
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-lg ${
        highContrast ? "contrast-200" : ""
      }`}
      style={{
        fontSize:
          fontSize === "small"
            ? "14px"
            : fontSize === "large"
            ? "18px"
            : "16px",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">User Settings</h1>

      {/* Profile Picture Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Profile Picture:</label>
        <div className="flex items-center gap-4">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:underline">
            <Upload size={18} />
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

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
            className={`p-2 flex items-center gap-2 rounded-lg ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setTheme("light")}
          >
            <Sun size={16} /> Light
          </button>
          <button
            className={`p-2 flex items-center gap-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={16} /> Dark
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

      {/* Font Size */}
      <div className="mb-4">
        <label className="block font-medium">
          Font Size:
          <span className="text-gray-500 text-sm ml-2">
            (Affects entire page)
          </span>
        </label>
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

      {/* Accessibility Options */}
      <div className="mb-4 flex justify-between items-center">
        <label className="font-medium">
          High Contrast Mode
          <span className="text-sm text-gray-500 block">
            Improves visibility for low vision
          </span>
        </label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={highContrast}
          onChange={() => setHighContrast(!highContrast)}
        />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <label className="font-medium">
          Keyboard Navigation
          <span className="text-sm text-gray-500 block">
            Use Tab / Arrow keys to move around
          </span>
        </label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={keyboardNav}
          onChange={() => setKeyboardNav(!keyboardNav)}
        />
      </div>

      {/* Notifications */}
      <div className="mb-6 flex justify-between items-center">
        <label className="font-medium">
          Notifications
          <span className="text-sm text-gray-500 block">
            Get email updates and alerts
          </span>
        </label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <RefreshCcw size={18} /> Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;
