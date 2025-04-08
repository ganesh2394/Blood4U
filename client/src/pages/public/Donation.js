import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaHeartbeat,
  FaSearchLocation,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

const Donate = () => {
  const [eligibility, setEligibility] = useState(null);
  const [form, setForm] = useState({
    role: "donor",
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    bloodType: "",
  });
  const handleEligibilityCheck = () => {
    setEligibility("You are eligible to donate blood!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    if (!payload.bloodType) delete payload.bloodType;

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registered successfully!");
        setForm({
          role: "donor",
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          bloodType: "",
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 mt-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-600 flex items-center justify-center gap-2">
          <FaHeartbeat className="text-red-500" /> Donate Blood, Save Lives
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Every donation can save up to <strong>3 lives</strong>. Be a hero
          today! 💪
        </p>
      </div>

      {/* Eligibility Check */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          ✅ Quick Eligibility Check
        </h2>
        <p className="mb-2">Are you above 18 and in good health?</p>
        <button
          onClick={handleEligibilityCheck}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Check Now
        </button>
        {eligibility && (
          <p className="mt-3 text-green-600 font-medium">{eligibility}</p>
        )}
      </div>

      {/* Search Center */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          📍 Find a Donation Center
        </h2>
        <p className="mb-2">
          Enter your city or pincode to search nearby centers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. Delhi or 110001"
            className="flex-1 border p-2 rounded"
          />
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaSearchLocation /> Search
          </button>
        </div>
      </div>

      {/* Donation Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          📝 Register as a Blood Donor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="bloodType"
            value={form.bloodType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Blood Group (Optional)</option>
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
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded font-medium"
          >
            Register Now
          </button>
        </form>
      </div>

      {/* Donation Process */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          🩸 How Blood Donation Works
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>✅ Confirm your eligibility and register online.</li>
          <li>📍 Visit a nearby blood donation center.</li>
          <li>🏥 Complete a quick health screening.</li>
          <li>🛌 Donate blood (takes ~10-15 minutes).</li>
          <li>💧 Rehydrate and relax post-donation.</li>
        </ul>
      </div>

      {/* Social Sharing */}
      <div className="text-center mt-8">
        <h2 className="text-xl font-semibold mb-2">📢 Spread the Word</h2>
        <p className="text-gray-600 mb-4">
          Inspire others to become blood donors too!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaFacebook /> Facebook
          </button>
          <button className="bg-blue-400 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaTwitter /> Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
