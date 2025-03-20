import React, { useState } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaHeadset,
} from "react-icons/fa";

const supportTopics = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page, click 'Forgot Password', and follow the instructions.",
  },
  {
    question: "Why am I not receiving email notifications?",
    answer:
      "Check your spam folder and ensure notifications are enabled in settings.",
  },
  {
    question: "How do I update my profile details?",
    answer: "Go to your account settings and edit your personal details.",
  },
  {
    question: "Is my personal data secure?",
    answer: "Yes, we use end-to-end encryption to protect your data.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to your account settings, select 'Delete Account', and confirm your action.",
  },
  {
    question: "How do I find a blood donation center near me?",
    answer:
      "Use our location search feature or visit the 'Find a Donation Center' section.",
  },
  {
    question: "Can I donate blood if I have recently recovered from COVID-19?",
    answer:
      "Yes, but you must wait at least 28 days after recovery before donating.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Whole blood can be donated every 56 days, while platelets every 7-14 days.",
  },
  {
    question: "Can I schedule an appointment online?",
    answer:
      "Yes, log in to your account and visit the 'Schedule Donation' section.",
  },
  {
    question: "What should I do if I feel dizzy after donating blood?",
    answer:
      "Lie down, drink plenty of fluids, and avoid strenuous activity for 24 hours.",
  },
  {
    question: "What should I bring to my blood donation appointment?",
    answer:
      "Bring a government-issued ID, eat a light meal, and drink plenty of water.",
  },
  {
    question: "How can I track my donation history?",
    answer:
      "Log in to your Blood4U account and go to the 'Donation History' section.",
  },
  {
    question: "What medical conditions disqualify me from donating?",
    answer:
      "Conditions like hepatitis, HIV, and low hemoglobin levels may disqualify you.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Email support@blood4u.com or call our 24/7 helpline at +1-800-123-4567.",
  },
];

const Support = () => {
  const [search, setSearch] = useState("");

  const filteredTopics = supportTopics.filter((topic) =>
    topic.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        Support Center
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-red-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-4 text-gray-500" />
      </div>

      {/* Support Topics */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-500 mb-3">
          <FaQuestionCircle className="inline-block mr-2" /> Frequently Asked
          Questions
        </h2>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{topic.question}</p>
              <p className="text-gray-600">{topic.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No matching results found.</p>
        )}
      </div>

      {/* Contact Support Section */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          <FaHeadset className="inline-block mr-2" /> Need More Help?
        </h2>
        <p className="text-gray-700">
          Our support team is available 24/7 to assist you.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
          <a
            href="mailto:support@blood4u.com"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <FaEnvelope /> Email Us
          </a>
          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            <FaPhoneAlt /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
