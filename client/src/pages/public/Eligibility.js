import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

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
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.age || formData.age <= 0) {
      newErrors.age = "⚠️ Age must be a positive number.";
    } else if (formData.age < 18 || formData.age > 65) {
      newErrors.age = "🔞 You must be between 18 and 65 years old to donate.";
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "⚖️ Weight must be a positive number.";
    } else if (formData.weight < 50) {
      newErrors.weight = "📏 You must weigh at least 50kg to donate.";
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
          "❌ Unfortunately, you may not be eligible to donate blood based on your current details. Please consult a healthcare professional.",
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 py-12 px-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          🩸 Blood Donation Eligibility Checker
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Fill in your details to check if you're eligible to donate blood.
        </p>

        <form onSubmit={checkEligibility} className="space-y-5">
          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your age"
              min="1"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-gray-700 font-medium">
              Weight (kg):
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your weight"
              min="1"
              required
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>

          {/* Health Condition */}
          <div>
            <label className="block text-gray-700 font-medium">
              Chronic health conditions?
            </label>
            <select
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Recent Travel */}
          <div>
            <label className="block text-gray-700 font-medium">
              Traveled to a malaria-affected area in the past 6 months?
            </label>
            <select
              name="recentTravel"
              value={formData.recentTravel}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Recent Procedure */}
          <div>
            <label className="block text-gray-700 font-medium">
              Had tattoos, piercings, or surgeries in the last 6 months?
            </label>
            <select
              name="recentProcedure"
              value={formData.recentProcedure}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Check My Eligibility
          </button>
        </form>

        {/* Result */}
        {eligibilityResult && (
          <div
            className={`mt-6 p-4 rounded-xl shadow-lg flex items-center space-x-3 ${
              eligibilityResult.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {eligibilityResult.success ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span className="font-medium">{eligibilityResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
