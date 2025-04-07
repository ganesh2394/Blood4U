import React, { useEffect, useState } from "react";
import axios from "axios";

const FindCenter = () => {
  const [centers, setCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [search, setSearch] = useState("");

  const getCenters = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        "http://localhost:8080/api/inventory/organizations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCenters(res.data.organizations || []);
      setFilteredCenters(res.data.organizations || []);
    } catch (err) {
      console.error("Error fetching centers", err);
    }
  };

  useEffect(() => {
    getCenters();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = centers.filter(
      (center) =>
        center.organizationName.toLowerCase().includes(value) ||
        center.address.toLowerCase().includes(value) ||
        center.website?.toLowerCase().includes(value)
    );

    setFilteredCenters(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Find Donation Centers
      </h2>

      <input
        type="text"
        placeholder="Search by name, city or state..."
        value={search}
        onChange={handleSearch}
        className="w-full md:w-1/2 border px-4 py-2 mb-6 rounded shadow-sm"
      />

      {filteredCenters.length === 0 ? (
        <p className="text-center text-gray-500">No centers found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCenters.map((center) => (
            <div
              key={center._id}
              className="bg-white p-4 border shadow-md rounded-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {center.organizationName}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Address:</strong> {center.address || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Website:</strong> {center.website || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Contact:</strong> {center.phone || "N/A"}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Email:</strong> {center.email || "N/A"}
              </p>
              {center.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    center.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  📍 View on Map
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindCenter;
