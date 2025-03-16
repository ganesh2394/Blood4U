import { FaUsers, FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
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

  const bloodDonationThoughts = [
    "A single donation can save up to three lives.",
    "Blood donation is the best form of humanity.",
    "Every drop counts—donate today!",
    "You have the power to save a life.",
    "Blood donation is safe and simple.",
    "Be a hero, donate blood regularly.",
    "Someone is waiting for your kindness.",
    "There’s no substitute for human blood.",
    "A little pain for you, a lifetime gain for someone.",
    "Giving blood is giving life.",
  ];

  const testimonials = [
    {
      name: "Aisha",
      role: "Regular Donor",
      message:
        "Donating blood with Blood4U was the best decision I ever made. Knowing I helped save a life is an incredible feeling!",
    },
    {
      name: "Rahul",
      role: "First-Time Donor",
      message:
        "I was nervous at first, but the experience was smooth, and the staff was incredibly supportive!",
    },
    {
      name: "Sofia",
      role: "Volunteer",
      message:
        "Every drop counts! I encourage everyone to donate blood and make a difference in someone's life.",
    },
    {
      name: "John",
      role: "Frequent Donor",
      message:
        "A small act of kindness that can save lives. Blood donation is truly rewarding!",
    },
  ];

  return (
    <div className=" bg-gray-100 mt-16">
      {/* Hero Section with Image Slider */}
      <section className="relative bg-red-600 text-white text-center pt-0 pb-20">
        {/* Scrolling Text Marquee */}
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 py-3 overflow-hidden z-10">
          <div className="whitespace-nowrap flex gap-6 animate-marquee text-lg font-semibold">
            {bloodDonationThoughts.map((thought, index) => (
              <span key={index} className="mx-6">
                • {thought}
              </span>
            ))}
          </div>
        </div>

        {/* Image Slider - Wrapped in a Relative Div to Avoid Overlap */}
        <div className="relative">
          <Slider {...sliderSettings}>
            {[...Array(10)].map((_, index) => (
              <div key={index}>
                <img
                  src={`assets/images/blood-donation${index + 1}.jpg`}
                  alt={`Blood Donation ${index + 1}`}
                  className="w-full h-[500px] object-cover object-top"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Heading and Call-to-Action Buttons */}
        <div className="px-6 mt-10">
          <h1 className="text-4xl md:text-6xl font-bold">
            Blood4U: Save a Life, Give Blood.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Your small act of kindness can be the difference between life and
            death. Join us in making an impact today!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/donate"
              className="bg-white text-red-600 px-6 py-3 rounded-md font-bold hover:bg-gray-200"
            >
              Donate Now
            </a>
            <a
              href="/register"
              className="bg-gray-900 text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800"
            >
              Register as Donor
            </a>
          </div>
        </div>
      </section>

      {/* Blood Type Compatibility Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Understanding Blood Groups
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold text-red-600">Blood Types</h3>
            <p className="text-gray-700 mt-2">
              There are four main blood groups: A, B, AB, and O. Blood groups
              are classified based on the presence or absence of antigens on the
              red blood cells.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-600">
              Compatibility
            </h3>
            <p className="text-gray-700 mt-2">
              - O- is the universal donor.
              <br />
              - AB+ is the universal recipient.
              <br />- Blood type matching is crucial for safe transfusions.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaUsers className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Join Our Community</h3>
            <p className="text-gray-600 mt-2">
              Register as a donor and be part of a life-saving mission.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaMapMarkerAlt className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Find a Donation Center</h3>
            <p className="text-gray-600 mt-2">
              Locate a nearby blood bank easily with Blood4U.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaCalendarCheck className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Schedule a Donation</h3>
            <p className="text-gray-600 mt-2">
              Book an appointment at your convenience and save lives.
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="bg-gray-200 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Donate Blood?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-600">
              1. Save Lives
            </h3>
            <p className="text-gray-700 mt-2">
              One donation can save up to three lives.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-600">
              2. Improve Health
            </h3>
            <p className="text-gray-700 mt-2">
              Regular donations help maintain healthy iron levels.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-600">
              3. Support Patients
            </h3>
            <p className="text-gray-700 mt-2">
              Help those with medical conditions like cancer or surgery
              patients.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-red-600">
              4. Strengthen Community
            </h3>
            <p className="text-gray-700 mt-2">
              Contribute to building a stronger and healthier society.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-red-600">10,000+</h3>
            <p className="text-gray-700">Successful Donations</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-red-600">5,000+</h3>
            <p className="text-gray-700">Registered Donors</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-4xl font-bold text-red-600">500+</h3>
            <p className="text-gray-700">Lives Saved Weekly</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Donors Say
        </h2>

        <div className="max-w-4xl mx-auto">
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

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-6">
          Join the Blood4U movement and become a hero today.
        </p>
        <Link
          to="/donate"
          className="bg-white text-red-600 px-6 py-3 rounded-md font-bold hover:bg-gray-200"
        >
          Donate Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
