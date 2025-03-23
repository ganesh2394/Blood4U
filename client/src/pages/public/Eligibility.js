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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user corrects the input
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.age || formData.age <= 0) {
      newErrors.age = "Age must be a positive number.";
    } else if (formData.age < 18 || formData.age > 65) {
      newErrors.age = "You must be between 18 and 65 years old to donate.";
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Weight must be a positive number.";
    } else if (formData.weight < 50) {
      newErrors.weight = "You must weigh at least 50kg to donate.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEligibility = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { healthCondition, recentTravel, recentProcedure } = formData;

    if (
      healthCondition === "no" &&
      recentTravel === "no" &&
      recentProcedure === "no"
    ) {
      setEligibilityResult({
        message: "🎉 Congratulations! You are eligible to donate blood!",
        success: true,
      });
    } else {
      setEligibilityResult({
        message:
          "⚠️ Unfortunately, you may not be eligible to donate blood. Please check the criteria.",
        success: false,
      });
    }
  };

  return (
    <div className="mt-14 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-red-600">
        Blood Donation Eligibility Check
      </h1>
      <p className="text-gray-600 text-lg mb-6 text-center max-w-2xl">
        Ensure you meet the eligibility requirements before donating blood.
        Enter your details below:
      </p>

      <form
        onSubmit={checkEligibility}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Age Input */}
        <label className="block mb-4">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
            min="1"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </label>

        {/* Weight Input */}
        <label className="block mb-4">
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
            min="1"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
        </label>

        {/* Health Condition */}
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

        {/* Recent Travel */}
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

        {/* Recent Procedures */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all"
        >
          Check Eligibility
        </button>
      </form>

      {/* Eligibility Result */}
      {eligibilityResult && (
        <div
          className={`mt-4 p-4 w-full max-w-md text-center font-semibold rounded-lg shadow-lg ${
            eligibilityResult.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {eligibilityResult.message}
        </div>
      )}
    </div>
  );
};

export default Eligibility;
