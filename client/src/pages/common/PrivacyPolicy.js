import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className=" mx-auto bg-white shadow-xl rounded-lg p-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
          Privacy Policy
        </h1>

        {/* Introduction and Scope */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="mt-2 text-lg text-gray-600">
            Welcome to <span className="font-semibold">Blood4U</span>. This
            Privacy Policy explains how we collect, use, and protect your
            information. By using our platform, you agree to the practices
            described below.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Information We Collect
          </h2>
          <ul className="mt-2 text-lg text-gray-600 list-disc pl-5">
            <li>
              <strong>Personal Information:</strong> Name, email, phone, date of
              birth, blood type.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> IP address, browser
              type, device details.
            </li>
            <li>
              <strong>Cookies & Tracking:</strong> We use cookies to improve
              user experience.
            </li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            How We Use Your Data
          </h2>
          <ul className="mt-2 text-lg text-gray-600 list-disc pl-5">
            <li>Facilitating blood donations and recipient matching.</li>
            <li>Sending important notifications and reminders.</li>
            <li>Improving platform functionality and user experience.</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Data Security
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We implement encryption, secure authentication, and access control
            to protect your data. We do not sell or share your personal
            information without consent.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
          <ul className="mt-2 text-lg text-gray-600 list-disc pl-5">
            <li>Access and update your personal data.</li>
            <li>Request deletion of your data.</li>
            <li>Opt out of marketing communications.</li>
          </ul>
        </section>

        {/* Cookies and Tracking */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Cookies and Tracking
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We use cookies for analytics and personalized experiences. You can
            manage your cookie preferences in your browser settings.
          </p>
        </section>

        {/* Changes to the Privacy Policy */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Policy Updates
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We may update this policy periodically. Changes will be posted on
            this page with an updated effective date.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have any questions, email us at{" "}
            <a
              href="mailto:support@blood4u.com"
              className="text-red-500 hover:underline"
            >
              support@blood4u.com
            </a>
            .
          </p>
        </section>

        {/* Accept Button */}
        <div className="text-center mt-6">
          <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg">
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
