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
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Understanding Blood Groups & Compatibility
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12 text-lg">
          Knowing your blood type is crucial for safe transfusions and
          donations. Here’s how blood groups work and their compatibility.
        </p>

        {/* Blood Groups and Compatibility */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-red-600 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4m8 0a4 4 0 00-8 0m4-8v1m0 10v1m5-3h1m-12 0h1"
                ></path>
              </svg>
              Blood Types
            </h3>
            <p className="text-gray-700 mt-2">
              There are four main blood groups: <strong>A, B, AB, and O</strong>
              . Blood groups are classified based on the presence or absence of
              **antigens** (A and B) on red blood cells.
            </p>
            <p className="text-gray-700 mt-2">
              The **Rh factor** (positive or negative) further classifies blood
              into **eight types**: A+, A-, B+, B-, AB+, AB-, O+, and O-.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-red-600 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              Compatibility
            </h3>
            <p className="text-gray-700 mt-2">
              - **O-** is the <strong>universal donor</strong> (can donate to
              all blood types).
              <br />- **AB+** is the <strong>universal recipient</strong> (can
              receive from all blood types).
              <br />- Matching blood types is essential to **prevent transfusion
              reactions**.
            </p>
          </div>
        </div>

        {/* Blood Compatibility Chart */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center text-red-600 mb-4">
            Blood Donation Compatibility Chart
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-gray-800 text-center bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Blood Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Can Donate To
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Can Receive From
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">O-</td>
                  <td className="border px-4 py-2">All</td>
                  <td className="border px-4 py-2">O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">O+</td>
                  <td className="border px-4 py-2">O+, A+, B+, AB+</td>
                  <td className="border px-4 py-2">O+, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">A-</td>
                  <td className="border px-4 py-2">A-, A+, AB-, AB+</td>
                  <td className="border px-4 py-2">A-, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">A+</td>
                  <td className="border px-4 py-2">A+, AB+</td>
                  <td className="border px-4 py-2">A+, A-, O+, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">B-</td>
                  <td className="border px-4 py-2">B-, B+, AB-, AB+</td>
                  <td className="border px-4 py-2">B-, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">B+</td>
                  <td className="border px-4 py-2">B+, AB+</td>
                  <td className="border px-4 py-2">B+, B-, O+, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">AB-</td>
                  <td className="border px-4 py-2">AB-, AB+</td>
                  <td className="border px-4 py-2">AB-, A-, B-, O-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">AB+</td>
                  <td className="border px-4 py-2">AB+</td>
                  <td className="border px-4 py-2">All</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Importance of Blood Donation */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            Why Blood Donation Matters?
          </h3>
          <p className="text-gray-700">
            Blood donations save lives in **accidents, surgeries, childbirth,
            and medical conditions like leukemia and anemia**.
          </p>
          <p className="text-gray-700 mt-4">
            **Did you know?** Less than **10% of eligible donors** actually
            donate blood! Consider making a difference today.
          </p>
          <div className="mt-6">
            <a
              href="/donate"
              className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
            >
              Donate Blood Now
            </a>
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

      {/* Why Donate Blood Section */}
      <section className="bg-gradient-to-r from-blue-100 to-gray-100 py-16 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Why Donate Blood?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12 text-lg">
          Blood donation is a simple act that creates a huge impact. Here’s why
          your donation matters.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-xl p-6 rounded-xl flex flex-col items-center transform hover:scale-105 transition duration-300">
            <div className="bg-red-600 text-white p-4 rounded-full">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4m8 0a4 4 0 00-8 0m4-8v1m0 10v1m5-3h1m-12 0h1"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mt-4">
              Save Lives
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              A single donation can save up to <strong>three lives</strong> in
              emergencies.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-xl p-6 rounded-xl flex flex-col items-center transform hover:scale-105 transition duration-300">
            <div className="bg-red-600 text-white p-4 rounded-full">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mt-4">
              Improve Health
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              Regular donations help maintain{" "}
              <strong>healthy iron levels</strong> and reduce heart risks.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-xl p-6 rounded-xl flex flex-col items-center transform hover:scale-105 transition duration-300">
            <div className="bg-red-600 text-white p-4 rounded-full">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mt-4">
              Support Patients
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              Donated blood helps{" "}
              <strong>
                cancer patients, accident victims, and surgery patients
              </strong>
              .
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-xl p-6 rounded-xl flex flex-col items-center transform hover:scale-105 transition duration-300">
            <div className="bg-red-600 text-white p-4 rounded-full">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mt-4">
              Strengthen Community
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              Creating a <strong>stronger and healthier society</strong> starts
              with a simple blood donation.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-100 to-gray-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
          Our Life-Saving Impact
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Every donation makes a difference. Here’s how we’ve helped communities
          across the nation with life-saving blood donations.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-xl p-8 rounded-xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4m8 0a4 4 0 00-8 0m4-8v1m0 10v1m5-3h1m-12 0h1"
                ></path>
              </svg>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">10,000+</h3>
            <p className="text-gray-700 text-lg font-medium">
              Successful Donations
            </p>
          </div>

          <div className="bg-white shadow-xl p-8 rounded-xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">5,000+</h3>
            <p className="text-gray-700 text-lg font-medium">
              Registered Donors
            </p>
          </div>

          <div className="bg-white shadow-xl p-8 rounded-xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">500+</h3>
            <p className="text-gray-700 text-lg font-medium">
              Lives Saved Weekly
            </p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/donate"
            className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          >
            Join Us & Save Lives
          </a>
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
