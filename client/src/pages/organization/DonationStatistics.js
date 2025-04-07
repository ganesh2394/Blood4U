import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DonationStatistics = () => {
  const [inventory, setInventory] = useState([]);
  const [bloodGroupStats, setBloodGroupStats] = useState({});
  const [topDonors, setTopDonors] = useState([]);
  const token = localStorage.getItem("authToken");

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.inventory || [];

      setInventory(data);

      // Calculate blood group availability
      const bloodStats = {};
      data.forEach((item) => {
        const group = item.bloodGroup;
        const quantity = item.quantity;
        if (!bloodStats[group]) bloodStats[group] = 0;
        bloodStats[group] += item.inventoryType === "in" ? quantity : -quantity;
      });
      setBloodGroupStats(bloodStats);

      // Top donors calculation
      const donorMap = {};
      data
        .filter((item) => item.inventoryType === "in")
        .forEach((item) => {
          const name = item.donor?.name || "Anonymous";
          donorMap[name] = (donorMap[name] || 0) + item.quantity;
        });

      const sortedDonors = Object.entries(donorMap)
        .map(([name, qty]) => ({ name, quantity: qty }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      setTopDonors(sortedDonors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const totalIn = inventory
    .filter((i) => i.inventoryType === "in")
    .reduce((sum, i) => sum + i.quantity, 0);

  const totalOut = inventory
    .filter((i) => i.inventoryType === "out")
    .reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        📊 Organization Donation Statistics
      </h1>

      {/* Total IN and OUT summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Blood Received</h2>
          <p className="text-3xl font-bold mt-2 text-green-700">{totalIn} ml</p>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Blood Distributed</h2>
          <p className="text-3xl font-bold mt-2 text-red-700">{totalOut} ml</p>
        </div>
      </div>

      {/* Blood group-wise availability */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          📌 Blood Group Availability
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(bloodGroupStats).map(([group, qty]) => ({
              bloodGroup: group,
              quantity: qty,
            }))}
          >
            <XAxis dataKey="bloodGroup" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Donors */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">🏅 Top Donors</h2>
        <ul className="divide-y">
          {topDonors.length > 0 ? (
            topDonors.map((donor, index) => (
              <li key={index} className="py-2">
                <span className="font-medium">{donor.name}</span> —{" "}
                <span className="text-blue-600">{donor.quantity} ml</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No donor data available.</li>
          )}
        </ul>
      </div>

      {/* Recent Inventory Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          🕓 Recent Inventory Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Blood Group</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {inventory.slice(0, 8).map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2 capitalize">{item.inventoryType}</td>
                  <td className="p-2">{item.bloodGroup}</td>
                  <td className="p-2">{item.quantity} ml</td>
                  <td className="p-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationStatistics;
