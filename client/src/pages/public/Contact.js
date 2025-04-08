import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    setError("");
    setStatusMessage("🎉 Your message has been sent successfully!");

    // Simulate sending to backend
    setTimeout(() => {
      setStatusMessage("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 p-4 sm:p-6 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-6 mb-10 mt-12"
      >
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-4 tracking-wide">
          📞 Contact Us
        </h2>
        <p className="text-center text-gray-600 text-lg mb-8">
          We'd love to hear from you. Reach out to us anytime!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <FaPhone className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2 font-medium">+91 98765 43210</p>
          </div>
          <div>
            <FaEnvelope className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2 font-medium">
              contact@blood4u.com
            </p>
          </div>
          <div>
            <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2 font-medium">Delhi, India</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6 text-2xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition duration-200"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:scale-110 transition duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:scale-110 transition duration-200"
          >
            <FaInstagram />
          </a>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-6"
      >
        <h3 className="text-3xl font-bold text-red-600 text-center mb-6">
          📝 Get in Touch
        </h3>

        {statusMessage && (
          <p className="text-green-600 text-center mb-2 font-medium">
            {statusMessage}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mb-2 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {["name", "email", "phone", "subject"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                {field === "name" || field === "email" ? (
                  <span className="text-red-600">*</span>
                ) : (
                  "(Optional)"
                )}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            📤 Send Message
          </button>
        </form>
      </motion.div>

      {/* Google Map */}
      <div className="w-full max-w-5xl mx-auto mt-10 rounded-xl overflow-hidden shadow-md">
        <iframe
          title="Blood4U Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.84633018172!2d77.06889995506144!3d28.52728034368333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01f14f53e2b1%3A0xabc92c4a991da6f2!2sDelhi%2C+India!5e0!3m2!1sen!2sin!4v1639823718417!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="border-none"
        ></iframe>
      </div>

      {/* Business Hours */}
      <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8 text-center">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">
          ⏰ Business Hours
        </h4>
        <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
        <p className="text-gray-700">Sat - Sun: 10:00 AM - 4:00 PM</p>
        <p className="text-gray-600 mt-4 text-sm">
          We aim to respond to inquiries within 24 hours. Your information is
          handled securely and never shared.
        </p>
      </div>
    </div>
  );
};

export default Contact;
