import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [organizationSearch, setOrganizationSearch] = useState("");

  const getDonorHistory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const currentUserRes = await axios.get(
        "http://localhost:8080/api/auth/current-user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const currentUser = currentUserRes.data.user;
      setUserEmail(currentUser.email);

      const allInventory = res.data.inventory;

      const donorInventory = allInventory.filter(
        (item) =>
          item.inventoryType === "in" && item.email === currentUser.email
      );

      setDonations(donorInventory);
      setFilteredDonations(donorInventory);
    } catch (error) {
      console.error("Error fetching donation history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonorHistory();
  }, []);

  // Apply Filters
  useEffect(() => {
    let filtered = donations;

    if (startDate && endDate) {
      filtered = filtered.filter((d) =>
        moment(d.createdAt).isBetween(startDate, endDate, null, "[]")
      );
    }

    if (bloodGroup) {
      filtered = filtered.filter((d) => d.bloodGroup === bloodGroup);
    }

    if (organizationSearch) {
      filtered = filtered.filter((d) =>
        d.organization?.organizationName
          ?.toLowerCase()
          .includes(organizationSearch.toLowerCase())
      );
    }

    setFilteredDonations(filtered);
  }, [startDate, endDate, bloodGroup, organizationSearch, donations]);

  // Quick Stats
  const totalDonations = filteredDonations.length;
  const totalVolume = filteredDonations.reduce(
    (acc, curr) => acc + curr.quantity * 100,
    0
  );
  const lastDonationDate = filteredDonations[0]
    ? moment(filteredDonations[0].createdAt).format("DD MMM YYYY")
    : "N/A";

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Donation History</h2>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-2xl font-bold">{totalDonations}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold">Total Volume Donated</h3>
          <p className="text-2xl font-bold">{totalVolume} ml</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold">Last Donation Date</h3>
          <p className="text-2xl font-bold">{lastDonationDate}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Blood Group</label>
          <select
            className="border p-2 rounded"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">
            Search Organization
          </label>
          <input
            type="text"
            placeholder="e.g., Red Cross"
            className="w-full border p-2 rounded"
            value={organizationSearch}
            onChange={(e) => setOrganizationSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Donation Table */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredDonations.length === 0 ? (
        <p className="text-gray-600">
          No donations found for the selected filters.
        </p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse border shadow-md rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Quantity (ml)</th>
                <th className="p-2 border">Organization</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation) => (
                <tr
                  key={donation._id}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="p-2 border">
                    {moment(donation.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="p-2 border">{donation.bloodGroup}</td>
                  <td className="p-2 border">{donation.quantity * 100} ml</td>
                  <td className="p-2 border">
                    {donation.organization?.organizationName || "N/A"}
                  </td>
                  <td className="p-2 border">{donation.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
