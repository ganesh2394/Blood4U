import React from "react";
import { Download, CalendarDays } from "lucide-react";
import { DatePicker } from "antd"; // optional, if you're using Ant Design
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", donations: 40 },
  { name: "Feb", donations: 30 },
  { name: "Mar", donations: 60 },
  { name: "Apr", donations: 50 },
];

const Reports = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">📊 Admin Reports</h1>
        <p className="text-sm text-gray-500">Get insights and analytics here</p>
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
          <p className="text-2xl font-semibold text-red-600">1,240</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-sm text-gray-500">Blood Units Available</h2>
          <p className="text-2xl font-semibold text-blue-600">6,540 ml</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg border-l-4 border-green-500">
          <h2 className="text-sm text-gray-500">Centers Active</h2>
          <p className="text-2xl font-semibold text-green-600">12</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Donation Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={2} />
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
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">Rahul Verma</td>
                <td className="py-2">B+</td>
                <td className="py-2">500 ml</td>
                <td className="py-2">2025-04-05</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">Anita Singh</td>
                <td className="py-2">O-</td>
                <td className="py-2">450 ml</td>
                <td className="py-2">2025-04-04</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
