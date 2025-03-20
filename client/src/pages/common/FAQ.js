import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const faqs = [
  {
    category: "About Blood Donation",
    questions: [
      {
        q: "What is blood donation, and why is it important?",
        a: "Blood donation saves lives by providing essential blood supply for patients in need.",
      },
      {
        q: "How often can I donate blood?",
        a: "You can donate whole blood every 8 weeks and platelets every 7 days.",
      },
      {
        q: "Is blood donation safe?",
        a: "Yes, all blood donations are conducted using sterile and disposable needles.",
      },
    ],
  },
  {
    category: "Eligibility and Requirements",
    questions: [
      {
        q: "Who is eligible to donate blood?",
        a: "Healthy adults above 18 years old and weighing at least 50 kg can donate.",
      },
      {
        q: "Can I donate blood if I have a tattoo?",
        a: "Yes, but only after 6 months of getting the tattoo.",
      },
    ],
  },
  {
    category: "Finding and Scheduling Donations",
    questions: [
      {
        q: "How do I find a blood donation center near me?",
        a: "Use our location finder on the website to find the nearest donation center.",
      },
      {
        q: "Do I need an appointment to donate?",
        a: "Appointments are recommended but walk-ins are also accepted at most centers.",
      },
    ],
  },
  {
    category: "Blood4U Platform Specific",
    questions: [
      {
        q: "How do I register as a donor on Blood4U?",
        a: "You can sign up through our website and complete your profile.",
      },
      {
        q: "Is my personal information secure on Blood4U?",
        a: "Yes, we use encryption to protect your personal details.",
      },
    ],
  },
  {
    category: "Post-Donation Care",
    questions: [
      {
        q: "What should I do after donating blood?",
        a: "Drink plenty of fluids and avoid strenuous activities for 24 hours.",
      },
      {
        q: "Are there any side effects?",
        a: "Most donors feel fine, but some may experience dizziness or bruising.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "I am having trouble logging in. What do I do?",
        a: "Try resetting your password or contact our support team for help.",
      },
      {
        q: "How do I clear my cache?",
        a: "Go to your browser settings and clear your browsing data.",
      },
    ],
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [feedback, setFeedback] = useState(null); // Track user feedback on FAQ usefulness

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter((faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        Frequently Asked Questions
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-red-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-red-500 mb-2">
          Table of Contents
        </h2>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
          {faqs.map((category, index) => (
            <li key={index}>
              <a href={`#${category.category}`} className="hover:text-red-600">
                {category.category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ Sections */}
      {filteredFAQs.map((category, categoryIndex) => (
        <div key={categoryIndex} id={category.category} className="mb-6">
          <h2 className="text-2xl font-semibold text-red-500 mb-3">
            {category.category}
          </h2>
          <div className="space-y-2">
            {category.questions.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all"
              >
                <button
                  className="flex justify-between w-full text-left font-medium text-gray-800 dark:text-white"
                  onClick={() => toggleFAQ(`${categoryIndex}-${index}`)}
                >
                  {faq.q}
                  {openIndex === `${categoryIndex}-${index}` ? (
                    <FaMinus className="text-red-600" />
                  ) : (
                    <FaPlus className="text-red-600" />
                  )}
                </button>
                {openIndex === `${categoryIndex}-${index}` && (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Feedback Mechanism */}
      <div className="text-center mt-8">
        <p className="text-gray-700  font-medium mb-2">Was this FAQ helpful?</p>
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            onClick={() => setFeedback("yes")}
          >
            <FaCheckCircle /> Yes
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={() => setFeedback("no")}
          >
            <FaTimesCircle /> No
          </button>
        </div>
        {feedback && (
          <p
            className={`mt-3 font-semibold ${
              feedback === "yes" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback === "yes"
              ? "Glad to hear that! 😊"
              : "We're sorry! Let us know how we can improve."}
          </p>
        )}
      </div>

      {/* Contact Support */}
      <div className="text-center mt-6">
        <p className="text-gray-700 ">
          Still have questions?{" "}
          <a
            href="/contact-support"
            className="text-red-500 font-semibold hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
