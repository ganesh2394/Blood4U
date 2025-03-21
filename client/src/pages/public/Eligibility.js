import React, { useState } from "react";

const Eligibility = () => {
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    healthCondition: "no",
    recentTravel: "no",
    recentProcedure: "no",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEligibility = (e) => {
    e.preventDefault();
    const { age, weight, healthCondition, recentTravel, recentProcedure } =
      formData;
    if (
      parseInt(age) >= 18 &&
      parseInt(age) <= 65 &&
      parseInt(weight) >= 50 &&
      healthCondition === "no" &&
      recentTravel === "no" &&
      recentProcedure === "no"
    ) {
      setEligibilityResult("You are eligible to donate blood!");
    } else {
      setEligibilityResult(
        "Unfortunately, you may not be eligible to donate blood. Please check the criteria."
      );
    }
  };

  return (
    <div className="mt-14 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        Blood Donation Eligibility
      </h1>
      <form
        onSubmit={checkEligibility}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <label className="block mb-4">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Do you have any chronic health conditions?
          <select
            name="healthCondition"
            value={formData.healthCondition}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        <label className="block mb-4">
          Have you traveled to a malaria-affected area in the past 6 months?
          <select
            name="recentTravel"
            value={formData.recentTravel}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        <label className="block mb-4">
          Have you had any tattoos, piercings, or major surgeries in the last 6
          months?
          <select
            name="recentProcedure"
            value={formData.recentProcedure}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Check Eligibility
        </button>
      </form>
      {eligibilityResult && (
        <div className="mt-4 p-4 bg-white rounded shadow-lg w-full max-w-md text-center font-semibold text-gray-700">
          {eligibilityResult}
        </div>
      )}
    </div>
  );
};

export default Eligibility;
