import React, { useState } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

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
];

const Support = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredTopics = supportTopics.filter((topic) =>
    topic.question.toLowerCase().includes(search.toLowerCase())
  );

  const visibleTopics = showAll ? filteredTopics : filteredTopics.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-red-600 mb-6"
      >
        Support Center
      </motion.h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-400 shadow-md"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-4 text-gray-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
        <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center">
          <FaQuestionCircle className="mr-2" /> Frequently Asked Questions
        </h2>
        {visibleTopics.length > 0 ? (
          visibleTopics.map((topic, index) => (
            <div
              key={index}
              className="mb-4 border-b pb-3 last:border-b-0 transition-all duration-300"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800 hover:text-indigo-700 focus:outline-none"
              >
                {topic.question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-gray-600 mt-2"
                >
                  {topic.answer}
                </motion.p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No matching results found.</p>
        )}

        {filteredTopics.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-center mx-auto"
            >
              {showAll ? (
                <>
                  Show Less <FaChevronUp className="ml-2" />
                </>
              ) : (
                <>
                  Show More <FaChevronDown className="ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 bg-red-50 p-6 rounded-2xl shadow-lg text-center border border-red-100"
      >
        <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center justify-center">
          <FaHeadset className="mr-2" /> Need More Help?
        </h2>
        <p className="text-gray-700 mb-4">
          Our support team is available 24/7 to assist you.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="mailto:support@blood4u.com"
            className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow"
          >
            <FaEnvelope /> Email Us
          </a>
          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow"
          >
            <FaPhoneAlt /> Call Us
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
