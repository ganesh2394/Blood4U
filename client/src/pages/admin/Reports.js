import React, { useEffect, useState } from "react";
import { Download, CalendarDays } from "lucide-react";
import { DatePicker } from "antd";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [donationStats, setDonationStats] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalBlood, setTotalBlood] = useState(0);
  const [centers, setCenters] = useState(0);
  const [recentDonations, setRecentDonations] = useState([]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Fetch all inventory (admin)
      const inventoryRes = await axios.get(
        "http://localhost:8080/api/inventory/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Total Donations & Blood Units
      const inInventory = inventoryRes.data.inventory.filter(
        (item) => item.inventoryType === "in"
      );
      setTotalDonations(inInventory.length);
      const totalMl = inInventory.reduce((acc, item) => acc + item.quantity, 0);
      setTotalBlood(totalMl);

      const monthMap = {};
      inInventory.forEach((item) => {
        const month = new Date(item.createdAt).toLocaleString("default", {
          month: "short",
        });
        monthMap[month] = (monthMap[month] || 0) + 1;
      });
      const formattedChart = Object.entries(monthMap).map(([month, count]) => ({
        name: month,
        donations: count,
      }));
      setDonationStats(formattedChart);

      // Centers Active (hospitals)
      const centersRes = await axios.get(
        "http://localhost:8080/api/inventory/hospitals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCenters(centersRes.data?.hospitals?.length || 0);

      // Recent Donations
      const recentRes = await axios.get(
        "http://localhost:8080/api/inventory/recent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredRecent =
        recentRes.data?.inventory?.filter(
          (item) => item.inventoryType === "in"
        ) || [];
      setRecentDonations(filteredRecent);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">📊 Admin Reports</h1>
        <p className="text-sm px-2 mt-2 text-indigo-500">
          Get insights and analytics here
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <CalendarDays className="text-red-500" />
          <DatePicker.RangePicker className="rounded-md" />
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-red-500">
          <h2 className="text-sm text-gray-500">Total Donations</h2>
          <p className="text-2xl font-semibold text-red-600">
            {totalDonations}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-sm text-gray-500">Blood Units Available</h2>
          <p className="text-2xl font-semibold text-blue-600">
            {totalBlood} ml
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500">
          <h2 className="text-sm text-gray-500">Centers Active</h2>
          <p className="text-2xl font-semibold text-green-600">{centers}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Donation Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={donationStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Donor</th>
                <th className="py-2">Blood Group</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.donor?.name || "N/A"}</td>
                  <td className="py-2">{item.bloodGroup}</td>
                  <td className="py-2">{item.quantity} ml</td>
                  <td className="py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentDonations.length === 0 && (
                <tr>
                  <td className="py-4 text-center text-gray-500" colSpan={4}>
                    No recent donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
