import React, { useState } from "react";

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      title: "Introduction & Acceptance",
      content: `Welcome to Blood4U! By using our platform, you agree to the terms outlined below.`,
    },
    {
      title: "User Accounts & Registration",
      content: `Users must be at least 18 years old and provide accurate information. Accounts may be suspended if false details are given.`,
    },
    {
      title: "Use of Platform",
      content: `You may use this platform to find blood donation centers. Prohibited activities include fraud, hacking, and spreading misinformation.`,
    },
    {
      title: "Blood Donation Information",
      content: `Blood4U does not provide medical advice. Always consult healthcare professionals before donating or receiving blood.`,
    },
    {
      title: "Intellectual Property",
      content: `All website content, including logos, text, and graphics, belongs to Blood4U. Unauthorized use is strictly prohibited.`,
    },
    {
      title: "Privacy & Data Protection",
      content: `We prioritize user privacy. Personal data is stored securely, and we comply with data protection laws. <a href="/privacy-policy" style="color: blue; text-decoration: underline;">Read our Privacy Policy</a>.`,
    },
    {
      title: "Limitation of Liability",
      content: `Blood4U is not liable for any inaccuracies or medical issues arising from blood donations arranged through our platform.`,
    },
    {
      title: "Modifications to Terms",
      content: `We may update these terms at any time. Users will be notified via email or website announcements.`,
    },
    {
      title: "Governing Law & Dispute Resolution",
      content: `These terms are governed by Indian law. Disputes will be resolved through arbitration before any court action.`,
    },
    {
      title: "Contact Information",
      content: `For queries, email us at <a href="mailto:support@blood4u.com" style="color: red; text-decoration: underline;">support@blood4u.com</a>.`,
    },
    {
      title: "Severability",
      content: `If any section of this agreement is deemed invalid, the remaining provisions shall still apply.`,
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-red-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">Terms of Service - Blood4U</h1>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:block w-1/4 bg-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          {sections.map((section, index) => (
            <a
              key={index}
              href={`#section-${index}`}
              className="block py-2 px-4 hover:bg-gray-300 rounded transition"
            >
              {section.title}
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 p-6">
          <p className="text-center text-gray-500 text-sm mb-6">
            Last Updated: <strong>March 20, 2025</strong>
          </p>

          {sections.map((section, index) => (
            <div key={index} id={`section-${index}`} className="mb-6">
              <button
                onClick={() => toggleSection(index)}
                className="text-xl font-semibold flex justify-between w-full p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                {section.title}
                <span>{openSections[index] ? "▲" : "▼"}</span>
              </button>
              {openSections[index] && (
                <p
                  className="mt-2 text-md bg-gray-50 p-3 rounded-md"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                ></p>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;
