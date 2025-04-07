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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setStatusMessage("🎉 Your message has been sent successfully!");

    // Integrate backend email service here
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 mt-16">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6 mb-8"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <FaPhone className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2">+91 98765 43210</p>
          </div>
          <div>
            <FaEnvelope className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2">contact@blood4u.com</p>
          </div>
          <div>
            <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto" />
            <p className="text-gray-700 mt-2">Delhi, India</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6 text-2xl">
          <a
            href="#"
            className="text-blue-600 hover:scale-110 transition duration-200"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="text-blue-400 hover:scale-110 transition duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
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
        className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6"
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Get in Touch
        </h3>

        {statusMessage && (
          <p className="text-green-600 text-center mb-2">{statusMessage}</p>
        )}
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "subject"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={
                field === "phone"
                  ? "Your Phone (Optional)"
                  : `Your ${field.charAt(0).toUpperCase() + field.slice(1)} ${
                      field === "name" || field === "email" ? "*" : ""
                    }`
              }
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            />
          ))}

          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            📩 Send Message
          </button>
        </form>
      </motion.div>

      {/* Google Map */}
      <div className="w-full max-w-5xl mt-8 shadow-md rounded-lg overflow-hidden">
        <iframe
          title="Blood4U Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.84633018172!2d77.06889995506144!3d28.52728034368333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01f14f53e2b1%3A0xabc92c4a991da6f2!2sDelhi%2C+India!5e0!3m2!1sen!2sin!4v1639823718417!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Business Hours */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mt-6 text-center">
        <h4 className="text-2xl font-semibold text-gray-800 mb-2">
          Business Hours
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
