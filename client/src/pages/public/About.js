import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaHeartbeat,
  FaHandHoldingHeart,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const testimonials = [
    {
      message: "Donating blood was the best decision!",
      name: "Rahul",
      role: "Regular Donor",
    },
    {
      message: "I saved a life, and it felt amazing!",
      name: "Sneha",
      role: "First-Time Donor",
    },
    {
      message: "More people should donate blood!",
      name: "Amit",
      role: "Frequent Donor",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 mt-14">
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white text-center py-20">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Blood4U
        </motion.h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Connecting donors to those in need—one drop at a time.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-4xl font-bold text-red-600">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto text-lg">
          <strong>Mission:</strong> To connect blood donors with urgent needs
          and save lives effectively. <br />
          <strong>Vision:</strong> A world where no one suffers due to a lack of
          blood.
        </p>
      </section>

      {/* Why We Started */}
      <section className="py-16 text-center bg-gradient-to-r from-red-100 to-gray-100 rounded-lg">
        <h2 className="text-4xl font-semibold text-gray-800">Why We Started</h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto text-lg">
          "Blood4U" was born from a personal experience witnessing the
          challenges of finding blood in emergencies. Our goal is to make blood
          donation **seamless, accessible, and impactful**.
        </p>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-red-500 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
          {[
            { icon: FaHeartbeat, title: "Compassion" },
            { icon: FaHandHoldingHeart, title: "Integrity" },
            { icon: FaUsers, title: "Community" },
            { icon: FaHandsHelping, title: "Transparency" },
          ].map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <value.icon className="text-5xl text-red-500 mx-auto mb-3" />
              <p className="text-lg font-semibold">{value.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Importance of Blood Donation */}
      <section className="py-16 bg-red-500 text-white text-center rounded-lg">
        <h2 className="text-4xl font-bold">Why Blood Donation Matters</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Every 2 seconds, someone in the world needs blood. A single donation
          can **save up to 3 lives**!
        </p>
        <motion.div
          className="text-6xl font-extrabold mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          100,000+ Lives Saved
        </motion.div>
      </section>

      {/* How Blood4U Works */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          How Blood4U Works
        </h2>
        <p className="text-gray-600 text-center mt-4 max-w-xl mx-auto">
          Follow these simple steps to **help save lives**:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { step: "Step 1", desc: "Register as a donor on our platform." },
            {
              step: "Step 2",
              desc: "Find a nearby blood bank or a recipient.",
            },
            { step: "Step 3", desc: "Donate and help save lives." },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{item.step}</h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-16 bg-gray-200 text-center rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800">
          What Our Donors Say
        </h2>
        <div className="max-w-4xl mx-auto mt-6">
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center px-6 py-4">
                <p className="text-gray-700 italic text-lg">
                  "{testimonial.message}"
                </p>
                <p className="text-gray-900 font-semibold mt-4">
                  — {testimonial.name}, {testimonial.role}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Join Us in Saving Lives!
        </h2>
        <p className="text-lg mt-4">
          Be a hero today. Register as a donor and make a difference.
        </p>
        <button className="mt-6 px-8 py-4 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-700 transition">
          Donate Now
        </button>
      </section>
    </div>
  );
};

export default About;
