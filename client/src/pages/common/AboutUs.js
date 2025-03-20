import React from "react";
import { FaHeartbeat, FaUsers, FaTrophy, FaHandsHelping } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-100  min-h-screen p-2 ">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-4">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
          About Blood4U
        </h1>

        {/* Mission and Vision */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 ">
            Our Mission & Vision
          </h2>
          <p className="mt-2 text-lg">
            Blood4U aims to bridge the gap between blood donors and recipients,
            ensuring that no life is lost due to a lack of timely donations. Our
            vision is a world where every patient in need of blood receives it
            without delay.
          </p>
        </section>

        {/* Story and Background */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 ">Our Story</h2>
          <p className="mt-2 text-lg">
            Blood4U was born out of a critical need for an efficient and
            accessible blood donation platform. With a mission to save lives, we
            leverage technology to connect willing donors with those in need.
          </p>
        </section>

        {/* Core Values */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 ">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mt-4">
            <div className="p-4 text-white bg-gray-800 shadow-lg rounded-lg flex flex-col items-center">
              <FaHeartbeat className="text-red-500 text-3xl mb-2" />
              <h3 className="font-semibold">Compassion</h3>
            </div>
            <div className="p-4 text-white bg-gray-800 shadow-lg rounded-lg flex flex-col items-center">
              <FaUsers className="text-red-500 text-3xl mb-2" />
              <h3 className="font-semibold">Community</h3>
            </div>
            <div className="p-4 text-white bg-gray-800 shadow-lg rounded-lg flex flex-col items-center">
              <FaTrophy className="text-red-500 text-3xl mb-2" />
              <h3 className="font-semibold">Excellence</h3>
            </div>
            <div className="p-4 text-white bg-gray-800 shadow-lg rounded-lg flex flex-col items-center">
              <FaHandsHelping className="text-red-500 text-3xl mb-2" />
              <h3 className="font-semibold">Integrity</h3>
            </div>
          </div>
        </section>

        {/* Impact and Achievements */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 ">Our Impact</h2>
          <p className="mt-2 text-lg">
            We have facilitated over <strong>10,000+</strong> successful
            donations and helped save countless lives through our platform.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 ">
            Join Our Mission
          </h2>
          <p className="mt-2 text-lg">
            Be a hero, donate blood, and save lives today.
          </p>
          <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
            Donate Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
