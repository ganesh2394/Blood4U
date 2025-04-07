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
      {
        q: "How much blood is taken during donation?",
        a: "Typically, 350 to 450 ml of blood is collected, which the body replenishes quickly.",
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
      {
        q: "Are there any health conditions that disqualify me?",
        a: "Yes. People with infections, anemia, heart problems, or chronic diseases may not be eligible.",
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
      {
        q: "Can I donate at blood donation drives?",
        a: "Absolutely! Our platform lists upcoming blood drives in your area.",
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
      {
        q: "Can I update my availability on the platform?",
        a: "Yes, you can update your donation status and availability anytime in your dashboard.",
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
      {
        q: "Can I resume normal activities after donation?",
        a: "Yes, but avoid lifting heavy objects or intense physical activity for the rest of the day.",
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
      {
        q: "The website is not loading properly. What should I do?",
        a: "Try refreshing the page or accessing it using a different browser or device.",
      },
    ],
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);

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
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Frequently Asked Questions
      </h1>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search FAQs..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-4 text-gray-500" />
      </div>

      {/* Sticky Table of Contents */}
      <div className="sticky top-4 z-10 mb-8 p-4 rounded-xl shadow-lg border border-gray-200 bg-white/60 backdrop-blur-md transition duration-300 hover:shadow-2xl hover:border-red-400">
        <h2 className="text-xl font-semibold text-red-600 mb-3">Categories</h2>
        <ul className="list-disc list-inside space-y-2">
          {faqs.map((category, index) => (
            <li key={index}>
              <a
                href={`#${category.category.replace(/\s+/g, "-")}`}
                className="text-blue-600 hover:underline"
              >
                {category.category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ Content */}
      {filteredFAQs.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          id={category.category.replace(/\s+/g, "-")}
          className="mb-10 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            {category.category}
          </h2>
          <div className="space-y-3">
            {category.questions.map((faq, index) => {
              const idx = `${categoryIndex}-${index}`;
              return (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300"
                >
                  <button
                    className="flex justify-between items-center w-full text-left text-gray-800 dark:text-white font-medium"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span>{faq.q}</span>
                    {openIndex === idx ? (
                      <FaMinus className="text-red-600" />
                    ) : (
                      <FaPlus className="text-red-600" />
                    )}
                  </button>
                  {openIndex === idx && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Feedback Section */}
      <div className="text-center mt-10">
        <p className="text-gray-800 font-semibold mb-3">
          Was this FAQ helpful?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => setFeedback("yes")}
          >
            <FaCheckCircle /> Yes
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
              ? "Awesome! We're glad it helped. 😊"
              : "Sorry to hear that! Let us know what we missed."}
          </p>
        )}
      </div>

      {/* Support Link */}
      <div className="text-center mt-6">
        <p className="text-gray-700">
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
