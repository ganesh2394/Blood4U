import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

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
    setStatusMessage("Your message has been sent successfully!");

    // Here, integrate with backend to send emails
    setTimeout(() => {
      setStatusMessage("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 mt-14">
      {/* Contact Information */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Contact Us
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
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

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-600 text-2xl">
            <FaFacebook />
          </a>
          <a href="#" className="text-blue-400 text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-pink-600 text-2xl">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Get in Touch
        </h3>
        {statusMessage && (
          <p className="text-green-500 text-center">{statusMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-28"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map Embed */}
      <div className="w-full max-w-4xl mt-6">
        <iframe
          title="Blood4U Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.84633018172!2d77.06889995506144!3d28.52728034368333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01f14f53e2b1%3A0xabc92c4a991da6f2!2sDelhi%2C+India!5e0!3m2!1sen!2sin!4v1639823718417!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="rounded shadow-lg"
        ></iframe>
      </div>

      {/* Business Hours & Privacy */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 text-center">
        <h4 className="text-xl font-semibold text-gray-800">Business Hours</h4>
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
