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
    autoplaySpeed: 4000,
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
    <div className="min-h-screen w-full bg-gray-50 p-6 pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] rounded-xl overflow-hidden shadow-md">
        <img
          src="/assets/images/donation_home.jpg"
          alt="Blood Donation"
          className="w-full h-full object-cover object-center absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 z-10 flex flex-col justify-center items-center text-white px-4 text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Blood4U
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-screen-md">
            Connecting donors to those in need — one drop at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white shadow-lg rounded-xl text-center mt-12">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-4xl font-bold text-red-600">
            Our Mission & Vision
          </h2>
          <p className="text-gray-700 mt-6 text-lg leading-relaxed">
            <strong>Mission:</strong> To connect blood donors with urgent needs
            and save lives effectively. <br />
            <strong>Vision:</strong> A world where no one suffers due to a lack
            of blood.
          </p>
        </div>
      </section>

      {/* Why We Started */}
      <section className="py-16 bg-gradient-to-r from-red-100 to-gray-100 rounded-xl mt-12 text-center">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-4xl font-semibold text-gray-800">
            Why We Started
          </h2>
          <p className="text-gray-700 mt-6 text-lg leading-relaxed">
            "Blood4U" was born from a personal experience witnessing the
            challenges of finding blood in emergencies. Our goal is to make
            blood donation <strong>seamless, accessible, and impactful</strong>.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-red-500 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 px-4">
          {[
            { icon: FaHeartbeat, title: "Compassion" },
            { icon: FaHandHoldingHeart, title: "Integrity" },
            { icon: FaUsers, title: "Community" },
            { icon: FaHandsHelping, title: "Transparency" },
          ].map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:scale-105"
              aria-label={value.title}
            >
              <value.icon className="text-5xl text-red-500 mx-auto mb-3" />
              <p className="text-lg font-semibold text-center">{value.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Blood Donation Matters */}
      <section className="py-16 bg-red-500 text-white text-center rounded-xl mt-12">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-4xl font-bold">Why Blood Donation Matters</h2>
          <p className="mt-4 text-lg">
            Every 2 seconds, someone in the world needs blood. A single donation
            can <strong>save up to 3 lives</strong>!
          </p>
          <motion.div
            className="text-6xl font-extrabold mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            100,000+ Lives Saved
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 mt-12">
        <div className="text-center max-w-screen-md mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800">
            How Blood4U Works
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Follow these simple steps to <strong>help save lives</strong>:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4">
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
              className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-red-600">
                {item.step}
              </h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-200 text-center rounded-xl mt-12">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Donors Say
          </h2>
          <Slider {...sliderSettings} className="mt-6 px-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center px-6 py-6">
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
      <section className="py-16 text-center mt-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Join Us in Saving Lives!
        </h2>
        <p className="text-lg mt-4 text-gray-700">
          Be a hero today. Register as a donor and make a difference.
        </p>
        <button
          className="mt-6 px-8 py-4 bg-red-600 text-white font-semibold text-lg rounded-full hover:bg-red-700 transition focus:outline-none focus:ring-4 focus:ring-red-300"
          aria-label="Donate Now"
        >
          Donate Now
        </button>
      </section>
    </div>
  );
};

export default About;
