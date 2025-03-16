import React, { useState } from "react";

const Donate = () => {
  const [eligibility, setEligibility] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    contact: "",
  });

  const handleEligibilityCheck = () => {
    setEligibility("Eligible ✅ You can proceed with donation.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for registering as a blood donor! We will contact you soon."
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-14">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600">
          Donate Blood, Save Lives ❤️
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Every donation can save up to three lives. Your contribution makes a
          difference!
        </p>
      </div>

      {/* Eligibility Check */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Eligibility Check</h2>
        <p>Are you above 18 and in good health?</p>
        <button
          onClick={handleEligibilityCheck}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Check Eligibility
        </button>
        {eligibility && <p className="mt-2 text-green-600">{eligibility}</p>}
      </div>

      {/* Find a Center & Schedule */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Find a Donation Center</h2>
        <p>Locate a blood donation center near you:</p>
        <input
          type="text"
          placeholder="Enter city or zip code"
          className="w-full border p-2 rounded mt-2"
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">
          Search Centers
        </button>
      </div>

      {/* Donation Registration Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Register as a Blood Donor
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-2"
            required
          />
          <select className="w-full border p-2 rounded mb-2" required>
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>
          <input
            type="text"
            placeholder="Location (City, Hospital Name)"
            className="w-full border p-2 rounded mb-2"
            required
          />
          <input
            type="tel"
            placeholder="Contact Number"
            className="w-full border p-2 rounded mb-2"
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Register Now
          </button>
        </form>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          How the Donation Process Works
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>📌 Register and confirm your eligibility.</li>
          <li>🩸 Visit the nearest blood donation center.</li>
          <li>🏥 Undergo a quick health screening.</li>
          <li>🛌 Donate blood (takes about 10-15 minutes).</li>
          <li>💧 Stay hydrated and rest after donation.</li>
        </ul>
      </div>

      {/* Social Sharing */}
      <div className="text-center mt-6">
        <h2 className="text-lg font-semibold">Spread the Word! 📢</h2>
        <p className="text-gray-600">
          Encourage others to donate blood and save lives.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Share on Facebook
        </button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded mt-2 ml-2">
          Share on Twitter
        </button>
      </div>
    </div>
  );
};

export default Donate;
