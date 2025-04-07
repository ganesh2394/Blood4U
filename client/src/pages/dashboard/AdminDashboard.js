import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    donors: 0,
    hospitals: 0,
    organizations: 0,
    inventoryCount: 0,
  });
  const [recentInventories, setRecentInventories] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [donorsRes, hospitalsRes, orgsRes, inventoryRes, recentRes] =
        await Promise.all([
          axios.get("http://localhost:8080/api/inventory/donors", { headers }),
          axios.get("http://localhost:8080/api/inventory/hospitals", {
            headers,
          }),
          axios.get("http://localhost:8080/api/inventory/organizations", {
            headers,
          }),
          axios.get("http://localhost:8080/api/inventory/all", { headers }),
          axios.get("http://localhost:8080/api/inventory/recent", { headers }),
        ]);

      console.log("Donor Res : ", donorsRes);
      console.log("Hos Res : ", hospitalsRes);
      console.log("Org Res : ", orgsRes);
      console.log("Inventory Res : ", inventoryRes);
      console.log("Recent Res : ", recentRes);
      // Set statistics
      setStats({
        donors: donorsRes?.data?.donors?.length || 0,
        hospitals: hospitalsRes?.data?.hospitals?.length || 0,
        organizations: orgsRes?.data?.organizations?.length || 0,
        inventoryCount: inventoryRes?.data?.inventory?.length || 0,
      });

      console.log("Recent Act : ", recentRes);
      // Set recent inventory data
      setRecentInventories(recentRes?.data?.inventory?.slice(0, 5) || []);

      // Optional: Prepare data for monthly chart (You can enhance this later)
      const monthMap = {};
      const months = [...Array(6)]
        .map((_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          return d.toLocaleString("default", { month: "short" });
        })
        .reverse();

      months.forEach((month) => {
        monthMap[month] = 0;
      });
      recentRes?.data?.inventory?.forEach((item) => {
        const month = new Date(item.createdAt).toLocaleString("default", {
          month: "short",
        });
        if (month in monthMap) {
          monthMap[month]++;
        }
      });

      const formattedChartData = Object.entries(monthMap).map(
        ([name, requests]) => ({
          name,
          requests,
        })
      );
      setChartData(formattedChartData);
    } catch (error) {
      console.error("Failed to fetch admin dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Donors" value={stats.donors} color="red" />
        <Card title="Hospitals" value={stats.hospitals} color="blue" />
        <Card title="Organizations" value={stats.organizations} color="green" />
        <Card
          title="Total Inventories"
          value={stats.inventoryCount}
          color="yellow"
        />
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <h4 className="text-xl font-semibold mb-4">
          Monthly Inventory Activity
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="requests" fill="#4299e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Inventory Activity */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="text-xl font-semibold mb-4">
          Recent Inventory Activity
        </h4>
        <ul className="space-y-3">
          {recentInventories.map((item, index) => (
            <li key={item._id || index} className="border-b pb-2">
              <div className="flex justify-between">
                <span>
                  <strong>{item.inventoryType.toUpperCase()}</strong> from{" "}
                  {item?.email || "N/A"} ({item.bloodGroup})
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Card = ({ title, value, color, tooltip }) => {
  const colorMap = {
    red: "text-red-600 bg-red-100",
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colorMap[color]}`} title={tooltip}>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default AdminDashboard;
