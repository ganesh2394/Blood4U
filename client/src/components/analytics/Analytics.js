import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const token = localStorage.getItem("authToken");

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/inventory/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnalyticsData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  const chartData = {
    labels: analyticsData.map((item) => item.bloodGroup),
    datasets: [
      {
        label: "Available Stock",
        data: analyticsData.map((item) => item.available),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "In Stock",
        data: analyticsData.map((item) => item.in.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Out of Stock",
        data: analyticsData.map((item) => item.out.total),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: analyticsData.map((item) => item.bloodGroup),
    datasets: [
      {
        label: "Available Stock",
        data: analyticsData.map((item) => item.available),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "In Stock",
        data: analyticsData.map((item) => item.in.total),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
      {
        label: "Out of Stock",
        data: analyticsData.map((item) => item.out.total),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  const totalAvailable = analyticsData.reduce(
    (acc, item) => acc + item.available,
    0
  );
  const totalInStock = analyticsData.reduce(
    (acc, item) => acc + item.in.total,
    0
  );
  const totalOutOfStock = analyticsData.reduce(
    (acc, item) => acc + item.out.total,
    0
  );

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Blood Inventory Analytics
      </h1>
      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 text-lg">{error}</div>
      ) : (
        <div>
          {/* Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Total Available Stock
              </h3>
              <div className="text-2xl font-bold text-gray-800">
                {totalAvailable}
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 ease-in-out">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Total In Stock
              </h3>
              <div className="text-2xl font-bold text-gray-800">
                {totalInStock}
              </div>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 ease-in-out">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Total Out of Stock
              </h3>
              <div className="text-2xl font-bold text-gray-800">
                {totalOutOfStock}
              </div>
            </div>
          </div>

          {/* Chart Type Selection */}
          <div className="mb-6 text-center">
            <label className="text-lg font-semibold mr-4">
              Select Chart Type:
            </label>
            <select
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={chartType}
              onChange={handleChartTypeChange}
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
            </select>
          </div>

          {/* Chart Display Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Blood Group Stock Distribution
            </h2>
            {chartType === "bar" && (
              <Bar data={chartData} options={{ responsive: true }} />
            )}
            {chartType === "line" && (
              <Line data={lineChartData} options={{ responsive: true }} />
            )}
          </div>

          {/* Blood Group Details Table */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Blood Group Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left text-gray-700">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-6">Blood Group</th>
                    <th className="py-3 px-6">In Stock</th>
                    <th className="py-3 px-6">Out of Stock</th>
                    <th className="py-3 px-6">Available</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-100">
                      <td className="py-3 px-6">{item.bloodGroup}</td>
                      <td className="py-3 px-6">{item.in.total}</td>
                      <td className="py-3 px-6">{item.out.total}</td>
                      <td className="py-3 px-6">{item.available}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Display Total Stock Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Total Stock Summary
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="border hover:border-b-blue-400 bg-gray-100 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Total In Stock</h3>
                <p className="text-2xl">{totalInStock}</p>
              </div>
              <div className="border hover:border-b-blue-400 bg-gray-100 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Total Out of Stock</h3>
                <p className="text-2xl">{totalOutOfStock}</p>
              </div>
              <div className="border hover:border-b-blue-400 bg-gray-100 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">Total Available Stock</h3>
                <p className="text-2xl">{totalAvailable}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
