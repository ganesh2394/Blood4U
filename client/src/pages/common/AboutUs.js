import React from "react";
import {
  FaUserMd,
  FaGlobe,
  FaCheckCircle,
  FaUser,
  FaHeartbeat,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Blood4U
        </motion.h1>

        {/* Mission and Vision */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 uppercase">
            Our Mission & Vision
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Blood4U bridges the gap between blood donors and recipients. Our
            mission is to ensure no life is lost due to a lack of timely
            donations. Our vision is a world where every patient in need of
            blood receives it without delay.
          </p>
        </section>

        {/* Why Choose Us? */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-gray-800 uppercase">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                icon: <FaUserMd />,
                title: "Trusted by Doctors",
                desc: "Recommended by medical professionals for quick and safe donations.",
              },
              {
                icon: <FaGlobe />,
                title: "Global Network",
                desc: "Connecting donors and recipients across multiple regions.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Verified Donors",
                desc: "Ensuring authenticity and safety in every donation.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-800 text-white rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-red-500 text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="mt-2 text-center text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 text-center uppercase">
            How It Works?
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaUser />,
                step: "Sign Up & Register",
              },
              {
                icon: <FaHeartbeat />,
                step: "Find a Donor or Request Blood",
              },
              {
                icon: <FaHandHoldingHeart />,
                step: "Make a Life-Saving Donation",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white border-b-2  border-t-2 border-blue-400 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-red-500 text-3xl mb-3 mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">Step {index + 1}</h3>
                <p className="mt-2 text-gray-700">{item.step}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 uppercase">
            Our Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since our inception, Blood4U has facilitated over{" "}
            <strong className="text-red-600">10,000+</strong> successful
            donations and saved countless lives. Every day, we continue to grow,
            expand, and improve our platform.
          </p>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 text-center uppercase">
            What People Say
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {[
              "Blood4U helped me find a donor in just minutes. It saved my father's life!",
              "Being a donor through Blood4U has been an incredible experience. It's easy and rewarding!",
              "This platform ensures quick and safe blood donation without any hassle!",
              "I never realized how easy it was to save lives until I joined Blood4U.",
            ].map((quote, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="text-3xl text-red-500">
                  <FaUser />
                </div>
                <p className="italic text-gray-700">"{quote}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 uppercase">
            Join Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Be a hero, donate blood, and save lives today.
          </p>
          <motion.button
            className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Donate Now
          </motion.button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
