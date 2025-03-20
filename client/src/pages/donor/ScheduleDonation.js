import React, { useState } from "react";

const ScheduleDonation = () => {
  // Dummy list of donation centers
  const donationCenters = [
    { id: 1, name: "Red Cross Center, Delhi" },
    { id: 2, name: "Mumbai Blood Bank" },
    { id: 3, name: "Bangalore Blood Donation Hub" },
    { id: 4, name: "Chennai Medical Blood Center" },
  ];

  // State for scheduling donation
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Handle scheduling
  const handleSchedule = () => {
    if (!date || !time || !selectedCenter) {
      alert("Please select date, time, and a donation center.");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date,
      time,
      center: selectedCenter,
    };

    setAppointments([...appointments, newAppointment]);
    setDate("");
    setTime("");
    setSelectedCenter("");
    alert("Donation appointment scheduled successfully!");
  };

  // Handle appointment cancellation
  const handleCancel = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
    alert("Appointment canceled.");
  };

  return (
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Schedule Your Donation
      </h2>

      {/* Form for Scheduling */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <label className="block text-lg font-semibold mb-2">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-lg font-semibold mb-2">Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block text-lg font-semibold mb-2">
          Choose Donation Center:
        </label>
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="">Select a center</option>
          {donationCenters.map((center) => (
            <option key={center.id} value={center.name}>
              {center.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSchedule}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full"
        >
          Schedule Appointment
        </button>
      </div>

      {/* Upcoming Appointments */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Upcoming Appointments
      </h3>
      {appointments.length > 0 ? (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="bg-gray-200 p-3 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  {appointment.date} at {appointment.time}
                </p>
                <p className="text-sm text-gray-700">{appointment.center}</p>
              </div>
              <button
                onClick={() => handleCancel(appointment.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No upcoming appointments.</p>
      )}
    </div>
  );
};

export default ScheduleDonation;
