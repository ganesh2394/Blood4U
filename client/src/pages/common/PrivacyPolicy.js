import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const sectionsData = [
  {
    title: "Introduction",
    content: (
      <>
        Welcome to <span className="font-semibold">Blood4U</span>. This Privacy
        Policy explains how we collect, use, and protect your information. By
        using our platform, you agree to the practices described below.
      </>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Personal:</strong> Name, email, phone, date of birth, blood
          type.
        </li>
        <li>
          <strong>Non-Personal:</strong> IP address, browser type, device
          details.
        </li>
        <li>
          <strong>Cookies:</strong> Used to improve user experience.
        </li>
      </ul>
    ),
  },
  {
    title: "How We Use Your Data",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Facilitating blood donations and recipient matching.</li>
        <li>Sending important notifications and reminders.</li>
        <li>Enhancing platform functionality and security.</li>
      </ul>
    ),
  },
  {
    title: "Data Security",
    content: (
      <>
        We use encryption, secure authentication, and access control to
        safeguard your data. We do not sell or share your personal information
        without consent.
      </>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Access and update your personal data.</li>
        <li>Request data deletion.</li>
        <li>Opt out of marketing communications.</li>
      </ul>
    ),
  },
  {
    title: "Cookies and Tracking",
    content: (
      <>
        We use cookies for analytics and personalization. You can manage your
        preferences in browser settings.
      </>
    ),
  },
  {
    title: "Policy Updates",
    content: (
      <>
        We may update this policy periodically. Changes will be posted with an
        updated effective date.
      </>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <>
        If you have any questions, email us at{" "}
        <a
          href="mailto:support@blood4u.com"
          className="text-red-500 font-semibold hover:underline"
        >
          support@blood4u.com
        </a>
        .
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-600 flex items-center justify-center gap-3 mb-8"
        >
          <FaShieldAlt className="text-indigo-500" /> Privacy Policy
        </motion.h1>

        <div className="space-y-4">
          {sectionsData.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-gray-800 focus:outline-none"
              >
                {section.title}
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 text-gray-600 text-md"
                >
                  {section.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow-md hover:bg-red-700 transition-all"
          >
            Accept & Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
