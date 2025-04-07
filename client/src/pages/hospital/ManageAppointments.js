import React, { useState, useEffect } from "react";

const dummyAppointments = [
  {
    _id: "1",
    date: "2025-04-07",
    time: "10:00 AM",
    reason: "Regular Checkup",
    status: "pending",
    patient: {
      name: "Rohit Sharma",
      email: "rohit.sharma@example.com",
    },
  },
  {
    _id: "2",
    date: "2025-04-08",
    time: "11:30 AM",
    reason: "Fever & Headache",
    status: "approved",
    patient: {
      name: "Neha Verma",
      email: "neha.verma@example.com",
    },
  },
  {
    _id: "3",
    date: "2025-04-09",
    time: "02:00 PM",
    reason: "Follow-up",
    status: "rejected",
    patient: {
      name: "Amit Raj",
      email: "amit.raj@example.com",
    },
  },
  {
    _id: "4",
    date: "2025-04-10",
    time: "09:30 AM",
    reason: "Consultation",
    status: "pending",
    patient: {
      name: "Priya Mehta",
      email: "priya.mehta@example.com",
    },
  },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load the dummy data on component mount
    setAppointments(dummyAppointments);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt._id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = filter === "all" || appt.status === filter;
    const matchesSearch =
      appt.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      appt.patient.email.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Hospital Manage Appointments</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by patient name or email"
          className="border p-2 rounded w-full sm:w-2/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full sm:w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appt) => (
                <tr key={appt._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{appt.patient.name}</td>
                  <td className="p-3">{appt.patient.email}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3">{appt.reason}</td>
                  <td className="p-3 capitalize font-medium">{appt.status}</td>
                  <td className="p-3 text-center">
                    {appt.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => updateStatus(appt._id, "approved")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(appt._id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
