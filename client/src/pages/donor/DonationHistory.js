import React, { useState } from "react";

const DonationHistory = () => {
  // Dummy donation history data
  const [donations, setDonations] = useState([
    { id: 1, date: "2024-03-05", location: "Delhi", type: "Whole Blood" },
    { id: 2, date: "2024-01-15", location: "Mumbai", type: "Platelets" },
    { id: 3, date: "2023-11-10", location: "Bangalore", type: "Plasma" },
    { id: 4, date: "2023-09-25", location: "Hyderabad", type: "Whole Blood" },
    { id: 5, date: "2023-07-18", location: "Chennai", type: "Plasma" },
    { id: 6, date: "2023-05-12", location: "Pune", type: "Platelets" },
    { id: 7, date: "2023-03-07", location: "Kolkata", type: "Whole Blood" },
    { id: 8, date: "2023-01-20", location: "Jaipur", type: "Whole Blood" },
  ]);

  // Search filters
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Calculate next eligible donation date (assuming 3-month gap required)
  const lastDonationDate =
    donations.length > 0 ? new Date(donations[0].date) : null;
  const nextEligibleDate = lastDonationDate
    ? new Date(lastDonationDate.setMonth(lastDonationDate.getMonth() + 3))
        .toISOString()
        .split("T")[0]
    : "N/A";

  // Filter donation history based on search inputs
  const filteredDonations = donations.filter(
    (donation) =>
      (!searchDate || donation.date === searchDate) &&
      (!searchLocation ||
        donation.location.toLowerCase().includes(searchLocation.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Donation History</h2>

      {/* Summary Section */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-lg font-semibold">
          Total Donations:{" "}
          <span className="text-red-500">{donations.length}</span>
        </p>
        <p className="text-lg">
          Next Eligible Donation Date:{" "}
          <span className="font-semibold">{nextEligibleDate}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Donation History Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Donation Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    {donation.date}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {donation.location}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {donation.type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
                  No donation records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;
