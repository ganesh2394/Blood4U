import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      title: "Introduction & Acceptance",
      content:
        "Welcome to Blood4U! By using our platform, you agree to the terms outlined below.",
    },
    {
      title: "User Accounts & Registration",
      content:
        "Users must be at least 18 years old and provide accurate information. Accounts may be suspended if false details are given.",
    },
    {
      title: "Use of Platform",
      content:
        "You may use this platform to find blood donation centers. Prohibited activities include fraud, hacking, and spreading misinformation.",
    },
    {
      title: "Blood Donation Information",
      content:
        "Blood4U does not provide medical advice. Always consult healthcare professionals before donating or receiving blood.",
    },
    {
      title: "Intellectual Property",
      content:
        "All website content, including logos, text, and graphics, belongs to Blood4U. Unauthorized use is strictly prohibited.",
    },
    {
      title: "Privacy & Data Protection",
      content: `We prioritize user privacy. Personal data is stored securely, and we comply with data protection laws. <a href="/privacy-policy" class='text-blue-600 underline'>Read our Privacy Policy</a>.`,
    },
    {
      title: "Limitation of Liability",
      content:
        "Blood4U is not liable for any inaccuracies or medical issues arising from blood donations arranged through our platform.",
    },
    {
      title: "Modifications to Terms",
      content:
        "We may update these terms at any time. Users will be notified via email or website announcements.",
    },
    {
      title: "Governing Law & Dispute Resolution",
      content:
        "These terms are governed by Indian law. Disputes will be resolved through arbitration before any court action.",
    },
    {
      title: "Contact Information",
      content: `For queries, email us at <a href="mailto:support@blood4u.com" class='text-red-600 underline'>support@blood4u.com</a>.`,
    },
    {
      title: "Severability",
      content:
        "If any section of this agreement is deemed invalid, the remaining provisions shall still apply.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-red-600 text-white shadow-md">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Terms of Service - Blood4U
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="hidden lg:block w-1/4 bg-white p-6 border-r sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          {sections.map((section, index) => (
            <a
              key={index}
              href={`#section-${index}`}
              className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-red-100 transition-all"
            >
              {section.title}
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 p-6">
          <p className="text-center text-sm text-gray-500 mb-8">
            <strong>Last Updated:</strong> March 20, 2025
          </p>

          {sections.map((section, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className="mb-6 rounded-lg border bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => toggleSection(index)}
                aria-expanded={openSections[index]}
                aria-controls={`section-content-${index}`}
                className="w-full flex justify-between items-center px-5 py-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg text-left"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {section.title}
                </span>
                {openSections[index] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              <AnimatePresence>
                {openSections[index] && (
                  <motion.div
                    id={`section-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 py-4 text-gray-700 text-md leading-relaxed border-t"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;
