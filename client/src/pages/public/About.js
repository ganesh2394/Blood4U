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
  FaHeart,
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
      <section className="py-16 bg-gradient-to-br from-white via-red-50 to-white rounded-xl shadow-md mt-12">
        <div className="max-w-screen-lg mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-extrabold text-red-600 text-center mb-12">
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-red-500 text-4xl mr-4">❤️</span>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To connect blood donors with those in urgent need, ensuring
                timely access and saving lives through seamless coordination.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-red-500 text-4xl mr-4">🌍</span>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To build a compassionate global community where no life is lost
                due to the unavailability of blood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-gray-50 to-white rounded-xl mt-12">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Why We Started
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            <span className="italic text-red-600 font-medium">"Blood4U"</span>{" "}
            was born from a deeply personal experience — witnessing the struggle
            of finding blood in a critical emergency. Our mission is to make
            blood donation
            <strong className="text-red-500 font-semibold">
              {" "}
              seamless, accessible, and impactful{" "}
            </strong>
            for everyone in need.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-red-600 mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaHeartbeat, title: "Compassion" },
              { icon: FaHandHoldingHeart, title: "Integrity" },
              { icon: FaUsers, title: "Community" },
              { icon: FaHandsHelping, title: "Transparency" },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-red-50 hover:bg-red-100 transition shadow-md rounded-2xl flex flex-col items-center text-center"
              >
                <value.icon className="text-5xl text-red-500 mb-4" />
                <p className="text-lg font-semibold text-gray-800">
                  {value.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Blood Donation Matters - Modern */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl mt-12 shadow-xl">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold">
            Why Blood Donation Matters
          </h2>
          <p className="mt-4 text-lg md:text-xl text-red-100 leading-relaxed">
            Every <strong>2 seconds</strong>, someone in the world needs blood.
            A single donation can
            <strong> save up to 3 lives</strong>!
          </p>
          <motion.div
            className="text-6xl font-extrabold mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            100,000+ Lives Saved
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 mt-12 rounded-2xl">
        <div className="text-center max-w-screen-md mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How Blood4U Works
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Follow these simple steps to <strong>help save lives</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:scale-105 text-center"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  {item.step}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials*/}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 text-center mt-12 rounded-2xl">
        <div className="max-w-screen-lg mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            What Our Donors Say
          </h2>
          <Slider {...sliderSettings} className="mt-8 px-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 mx-4 shadow hover:shadow-xl transition text-gray-800"
              >
                <p className="italic text-lg text-gray-700">
                  "{testimonial.message}"
                </p>
                <p className="mt-4 font-semibold text-gray-900">
                  — {testimonial.name}, {testimonial.role}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Call to Action - Modern */}
      <section className="py-20 mt-16 bg-gradient-to-r from-red-500 to-red-600 text-white text-center rounded-2xl shadow-xl mx-4 sm:mx-8">
        <div className="max-w-screen-md mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Join Us in Saving Lives!
          </h2>
          <p className="text-lg md:text-xl text-red-100 mb-8">
            Be a hero today. Register as a donor and make a difference.
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white"
              aria-label="Donate Now"
            >
              <FaHeart className="text-red-500 text-xl" />
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
