import { FaUsers, FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountUp from "react-countup";

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
      <section className="relative bg-blue-900 text-white text-center pt-0 pb-20 overflow-hidden">
        {/* Scrolling Text Marquee */}
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-60 py-3 z-20">
          <div className="whitespace-nowrap flex gap-8 animate-marquee text-sm sm:text-base font-medium tracking-wide">
            {bloodDonationThoughts.map((thought, index) => (
              <span key={index} className="mx-6 opacity-90">
                • {thought}
              </span>
            ))}
          </div>
        </div>

        {/* Image Slider with Gradient Overlay */}
        <div className="relative">
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />

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

        {/* Heading and Call-to-Action */}
        <div className="relative z-30 px-6 mt-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Blood4U:{" "}
            <span className="text-red-500">Save a Life, Give Blood</span>
          </h1>
          <p className="text-base md:text-xl mt-4 max-w-3xl mx-auto font-light text-white/90">
            Your small act of kindness can be the difference between life and
            death. Join us in making an impact today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/donate"
              className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
              Donate Now
            </Link>
            <Link
              to="/register"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-all duration-200 shadow-md"
            >
              Register as Donor
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-200">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-x-10 px-6 py-10 mx-auto max-w-screen-xl">
          {/* Left */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-4">
              Donate Blood, Save Lives
            </h2>
            <p className="text-gray-700 text-base sm:text-lg font-mono mb-6 max-w-md mx-auto md:mx-0">
              Your blood donation can give someone another chance at life.
            </p>
            <Link
              to="/register"
              className="inline-block hover:bg-slate-300 text-black border border-black font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Register Here
            </Link>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/assets/images/donation_home.jpg"
              alt="Donate Blood"
              className="w-64 sm:w-72 md:w-80 h-auto rounded-xl shadow-md shadow-indigo-300"
            />
          </div>
        </div>
      </section>

      {/* Blood Type Compatibility Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          🩸 Blood Group Compatibility Guide
        </h2>

        <p className="text-gray-700 max-w-3xl mx-auto text-center text-lg mb-10 leading-relaxed">
          Understanding your blood type is crucial for safe transfusions and
          saving lives. Learn how different blood groups interact and why
          compatibility matters.
        </p>

        {/* Blood Types & Compatibility Boxes */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-md p-6 rounded-xl border border-red-100 hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-red-600 mb-2 flex items-center">
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
                />
              </svg>
              What Are Blood Types?
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              There are 4 main blood groups: <strong>A, B, AB,</strong> and{" "}
              <strong>O</strong>, based on the presence of antigens.
            </p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              Each group is classified further by the <strong>Rh factor</strong>{" "}
              (positive or negative), creating 8 total types:
              <span className="block mt-1 font-medium text-gray-800">
                A+, A-, B+, B-, AB+, AB-, O+, O-
              </span>
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-red-100 hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-red-600 mb-2 flex items-center">
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
                />
              </svg>
              Blood Compatibility
            </h3>
            <ul className="text-gray-700 mt-2 space-y-2 leading-relaxed list-disc list-inside">
              <li>
                <strong>O-</strong> is the{" "}
                <span className="text-green-600 font-medium capitalize">
                  universal donor
                </span>
                .
              </li>
              <li>
                <strong>AB+</strong> is the{" "}
                <span className="text-green-600 font-medium capitalize">
                  universal recipient
                </span>
                .
              </li>
              <li>
                Correct matches are essential to prevent transfusion reactions.
              </li>
            </ul>
          </div>
        </div>

        {/* Compatibility Chart */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-red-600 mb-4">
            🧬 Blood Donation Compatibility Chart
          </h3>
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="w-full border border-gray-300 bg-white text-center shadow-md rounded-lg overflow-hidden">
              <thead className="bg-red-100 text-gray-800">
                <tr>
                  <th className="border px-4 py-2">Blood Type</th>
                  <th className="border px-4 py-2">Can Donate To</th>
                  <th className="border px-4 py-2">Can Receive From</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { type: "O-", donateTo: "All", receiveFrom: "O-" },
                  {
                    type: "O+",
                    donateTo: "O+, A+, B+, AB+",
                    receiveFrom: "O+, O-",
                  },
                  {
                    type: "A-",
                    donateTo: "A-, A+, AB-, AB+",
                    receiveFrom: "A-, O-",
                  },
                  {
                    type: "A+",
                    donateTo: "A+, AB+",
                    receiveFrom: "A+, A-, O+, O-",
                  },
                  {
                    type: "B-",
                    donateTo: "B-, B+, AB-, AB+",
                    receiveFrom: "B-, O-",
                  },
                  {
                    type: "B+",
                    donateTo: "B+, AB+",
                    receiveFrom: "B+, B-, O+, O-",
                  },
                  {
                    type: "AB-",
                    donateTo: "AB-, AB+",
                    receiveFrom: "AB-, A-, B-, O-",
                  },
                  { type: "AB+", donateTo: "AB+", receiveFrom: "All" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2 font-semibold">
                      {row.type}
                    </td>
                    <td className="border px-4 py-2">{row.donateTo}</td>
                    <td className="border px-4 py-2">{row.receiveFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blood Donation Importance */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            💡 Why Blood Donation Matters
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Blood donations are critical during{" "}
            <strong>accidents, surgeries, childbirth</strong>, and for patients
            with conditions like <strong>leukemia or anemia</strong>.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>Only 10% of eligible people donate blood.</strong> Be the
            change. Help save lives today.
          </p>
          <div className="mt-6">
            <Link
              to="/donate"
              className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition duration-300 shadow-md"
            >
              ❤️ Donate Blood Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-white to-blue-50">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          How Blood4U Works
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Just 3 simple steps to become a hero and save lives through blood
          donation.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white hover:shadow-xl transition-shadow duration-300 p-6 rounded-2xl text-center border border-red-100">
            <FaUsers className="text-blue-600 text-5xl mx-auto mb-4 transition-all duration-200" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Join Our Community
            </h3>
            <p className="text-gray-600 text-base">
              Sign up as a donor and be part of a growing family committed to
              saving lives.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white hover:shadow-xl transition-shadow duration-300 p-6 rounded-2xl text-center border border-red-100">
            <FaMapMarkerAlt className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Find a Nearby Center
            </h3>
            <p className="text-gray-600 text-base">
              Use our easy search tool to locate the closest blood donation
              center near you.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white hover:shadow-xl transition-shadow duration-300 p-6 rounded-2xl text-center border border-red-100">
            <FaCalendarCheck className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Book Your Slot
            </h3>
            <p className="text-gray-600 text-base">
              Pick a date and time that fits your schedule and make a difference
              today!
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate Blood Section */}
      <section className="bg-gradient-to-r from-blue-100 to-gray-100 py-16 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Why Donate Blood?
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center mb-12 text-lg">
          A simple act of kindness can create a ripple of hope. Discover the
          powerful impact of your blood donation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Save Lives */}
          <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-red-500 hover:scale-105">
            <div className="bg-red-600 text-white p-4 rounded-full shadow-md">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4m8 0a4 4 0 00-8 0m4-8v1m0 10v1m5-3h1m-12 0h1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Save Lives
            </h3>
            <p className="text-gray-600 mt-2">
              One donation can save up to{" "}
              <strong className="text-red-600">three lives</strong> during
              critical moments.
            </p>
          </div>

          {/* Card 2 - Improve Health */}
          <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-red-500 hover:scale-105">
            <div className="bg-red-600 text-white p-4 rounded-full shadow-md">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Improve Health
            </h3>
            <p className="text-gray-600 mt-2">
              Donating regularly helps maintain{" "}
              <strong className="text-red-600">iron balance</strong> and boosts
              circulation.
            </p>
          </div>

          {/* Card 3 - Support Patients */}
          <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-red-500 hover:scale-105">
            <div className="bg-red-600 text-white p-4 rounded-full shadow-md">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Support Patients
            </h3>
            <p className="text-gray-600 mt-2">
              Help <strong className="text-red-600">cancer warriors</strong>,
              accident survivors, and surgical patients heal.
            </p>
          </div>

          {/* Card 4 - Strengthen Community */}
          <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-red-500 hover:scale-105">
            <div className="bg-red-600 text-white p-4 rounded-full shadow-md">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Strengthen Community
            </h3>
            <p className="text-gray-600 mt-2">
              Become a vital part of a{" "}
              <strong className="text-red-600">
                healthier and united society
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-100 to-gray-50 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Our Life-Saving Impact
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg md:text-xl">
          Every donation makes a difference. Here’s how we’ve helped communities
          across the nation with life-saving blood donations.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-xl p-10 rounded-2xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-5">
              <div className="bg-red-100 p-4 rounded-full">
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
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">
              <CountUp end={10000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 text-lg font-medium mt-2">
              Successful Donations
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-xl p-10 rounded-2xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-5">
              <div className="bg-red-100 p-4 rounded-full">
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
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">
              <CountUp end={5000} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 text-lg font-medium mt-2">
              Registered Donors
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-xl p-10 rounded-2xl transform hover:scale-105 transition duration-300">
            <div className="flex justify-center mb-5">
              <div className="bg-red-100 p-4 rounded-full">
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
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-5xl font-extrabold text-red-600">
              <CountUp end={500} duration={3} separator="," />+
            </h3>
            <p className="text-gray-700 text-lg font-medium mt-2">
              Lives Saved Weekly
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16">
          <Link
            to={"/donate"}
            className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-red-700 transition duration-300"
          >
            Join Us & Save Lives
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          What Our Donors Say
        </h2>

        <div className="max-w-5xl mx-auto">
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white mx-4 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5h.01M15 5h.01M7 10h10M7 15h10M7 20h10"
                    />
                  </svg>
                </div>

                <p className="text-gray-700 italic text-lg mb-6">
                  “{testimonial.message}”
                </p>

                <div className="text-gray-900 font-semibold text-md">
                  — {testimonial.name}
                  <span className="block text-gray-500 font-normal text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Upcoming Blood Donation Camps */}
      <section className="py-24 px-6 bg-gradient-to-br from-white via-red-50 to-white text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-6">
          🩸 Upcoming Blood Donation Camps
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg md:text-xl">
          Be the reason someone lives. Explore nearby camps and donate with
          compassion.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="border-l-4 border-red-500 pl-8 space-y-12">
            {[
              {
                city: "Mumbai",
                venue: "City Hospital",
                date: "15th April 2025",
                time: "10:00 AM - 4:00 PM",
                link: "#",
              },
              {
                city: "Delhi",
                venue: "Red Cross Center",
                date: "20th April 2025",
                time: "9:00 AM - 3:00 PM",
                link: "#",
              },
              {
                city: "Bengaluru",
                venue: "Govt. General Hospital",
                date: "25th April 2025",
                time: "11:00 AM - 5:00 PM",
                link: "#",
              },
            ].map((camp, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[1.15rem] top-6 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow"></div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  📍 {camp.venue},{" "}
                  <span className="text-indigo-600">{camp.city}</span>
                </h3>
                <p className="text-gray-700 flex items-center gap-2">
                  🗓️ <span>{camp.date}</span>
                </p>
                <p className="text-gray-600 flex items-center gap-2 mb-4">
                  ⏰ <span>{camp.time}</span>
                </p>
                <a
                  href={camp.link}
                  className="inline-flex items-center gap-2 px-6 py-2 font-semibold rounded-full transition hover:bg-red-300 border border-1 border-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  Register Now
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/all-camps"
            className="inline-flex items-center gap-2 px-4 py-2 text-indigo-800 font-medium border border-indigo-200 rounded-md hover:bg-indigo-50 hover:text-indigo-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            View All Camps
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Sponsors / Partners Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-6">
          Our Trusted Partners
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg md:text-xl">
          We are proud to be supported by these amazing organizations that help
          us make a difference.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center justify-center max-w-5xl mx-auto">
          {/* Partner 1 */}
          <div className="transform hover:scale-105 transition duration-300">
            <img
              src="/assets/sponsors/apollo_hospital.webp"
              alt="Apollo Hospital"
              className="mx-auto h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          </div>

          {/* Partner 2 */}
          <div className="transform hover:scale-105 transition duration-300">
            <img
              src="/assets/sponsors/red_cross.webp"
              alt="Red Cross"
              className="mx-auto h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          </div>

          {/* Partner 3 */}
          <div className="transform hover:scale-105 transition duration-300">
            <img
              src="/assets/sponsors/who.webp"
              alt="World Health Organization"
              className="mx-auto h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          </div>

          {/* Partner 4 */}
          <div className="transform hover:scale-105 transition duration-300">
            <img
              src="/assets/sponsors/ngo_bloodcare.webp"
              alt="BloodCare NGO"
              className="mx-auto h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          </div>
        </div>
      </section>

      {/* Hero Call to Action Section */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white py-20 px-4 sm:px-8 text-center overflow-hidden">
        {/* Blurred Animated Pulse Background */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-300 rounded-full opacity-30 blur-3xl animate-pulse z-0"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Be the Lifeline Someone Needs Today
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-8">
            Your donation can bring hope, healing, and life. Join the Blood4U
            community and be a hero in someone's story.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-red-600 text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Become a Donor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
