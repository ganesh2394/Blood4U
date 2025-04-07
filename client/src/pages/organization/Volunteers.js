import React from "react";

const Volunteers = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Intro */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Join as a Volunteer
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Become a part of our mission to make a difference! Help us run blood
          donation camps, organize awareness drives, and support patients in
          need.
        </p>
      </section>

      {/* Benefits */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Why Volunteer with Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold text-lg text-red-500">Make an Impact</h3>
            <p className="text-sm text-gray-600">
              Your time and skills can save lives and inspire others.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold text-lg text-red-500">Earn Recognition</h3>
            <p className="text-sm text-gray-600">
              Get certificates, badges, and shoutouts on our platforms.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold text-lg text-red-500">Build Skills</h3>
            <p className="text-sm text-gray-600">
              Gain leadership, communication, and event management experience.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Volunteer Roles
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            "Camp Organizer",
            "Social Media Volunteer",
            "Medical Assistant",
            "Field Support",
            "Awareness Campaigner",
            "Designer / Tech",
          ].map((role) => (
            <div
              key={role}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-red-500">{role}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6 text-red-600">
          Volunteer Registration
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400">
            <option value="">Select Volunteer Role</option>
            <option value="camp">Camp Organizer</option>
            <option value="social">Social Media</option>
            <option value="medical">Medical Assistant</option>
            <option value="field">Field Support</option>
          </select>
          <textarea
            placeholder="Why do you want to volunteer?"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Have questions?{" "}
          <span className="text-red-500 font-semibold cursor-pointer hover:underline">
            Contact us
          </span>
        </p>
      </div>
    </div>
  );
};

export default Volunteers;
