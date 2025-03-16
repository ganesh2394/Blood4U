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
    <div className="min-h-screen w-full bg-gray-100 p-6 mt-14">
      {/* Mission & Vision */}
      <section className="text-center py-10">
        <h2 className="text-4xl font-bold text-red-600">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          <strong>Mission:</strong> To connect blood donors with those in urgent
          need and save lives efficiently.
          <br />
          <strong>Vision:</strong> A world where no one suffers due to a lack of
          blood availability.
        </p>
      </section>

      {/* Why We Started */}
      <section className="py-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Why We Started
        </h2>
        <p className="text-gray-600 text-center mt-4">
          "Blood4U" was born from a personal experience witnessing the
          challenges of finding blood in emergencies. Our goal is to make blood
          donation seamless and accessible.
        </p>
      </section>

      {/* Our Values */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-red-500 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
          <div className="p-4 bg-white shadow-md rounded-md">
            <FaHeartbeat className="text-4xl text-red-500 mx-auto" />
            <p className="mt-2 font-semibold">Compassion</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-md">
            <FaHandHoldingHeart className="text-4xl text-red-500 mx-auto" />
            <p className="mt-2 font-semibold">Integrity</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-md">
            <FaUsers className="text-4xl text-red-500 mx-auto" />
            <p className="mt-2 font-semibold">Community</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-md">
            <FaHandsHelping className="text-4xl text-red-500 mx-auto" />
            <p className="mt-2 font-semibold">Transparency</p>
          </div>
        </div>
      </section>

      {/* The Importance of Blood Donation */}
      <section className="py-10 bg-red-500 text-white text-center rounded-lg">
        <h2 className="text-3xl font-bold">The Importance of Blood Donation</h2>
        <p className="mt-4 text-lg">
          Every 2 seconds, someone in the world needs blood. Your donation can
          save up to 3 lives!
        </p>
        {/* Animated Statistics */}
        <motion.div
          className="text-6xl font-extrabold mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          100,000+ Lives Saved
        </motion.div>
      </section>

      {/* How We Work */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          How Blood4U Works
        </h2>
        <p className="text-gray-600 text-center mt-4">
          Follow these 3 simple steps to save lives:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold">Step 1</h3>
            <p>Register as a donor on our platform.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold">Step 2</h3>
            <p>Find a nearby blood bank or a recipient.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold">Step 3</h3>
            <p>Donate and help save lives.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel (Placeholder) */}
      <section className="py-10 bg-gray-200 text-center rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800">
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

      {/* Video Section */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Learn More About Blood Donation
        </h2>
        <iframe
          className="mt-6 w-full md:w-3/4 h-64 mx-auto rounded-lg"
          src="https://www.youtube.com/embed/donate-video-placeholder"
          title="Blood Donation Awareness"
          allowFullScreen
        ></iframe>
      </section>

      {/* Call to Action */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Join Us in Saving Lives!
        </h2>
        <p className="text-lg mt-4">
          Be a hero today. Register as a donor and make a difference.
        </p>
        <button className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
          Donate Now
        </button>
      </section>
    </div>
  );
};

export default About;
