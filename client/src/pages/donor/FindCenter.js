import React, { useState } from "react";

const FindCenter = () => {
  // Dummy blood donation centers (Replace with API data)

  const [centers, setCenters] = useState([
    {
      id: 1,
      name: "City Blood Bank",
      location: "Delhi",
      available: true,
      mapLink: "https://goo.gl/maps/Xd6uP",
    },
    {
      id: 2,
      name: "Red Cross Center",
      location: "Mumbai",
      available: false,
      mapLink: "https://goo.gl/maps/Yz7uV",
    },
    {
      id: 3,
      name: "Local Hospital Blood Bank",
      location: "Bangalore",
      available: true,
      mapLink: "https://goo.gl/maps/Zt1gX",
    },
    {
      id: 4,
      name: "Universal Blood Center",
      location: "Kolkata",
      available: true,
      mapLink: "https://goo.gl/maps/Ko9uT",
    },
    {
      id: 5,
      name: "Lifeline Blood Donors",
      location: "Hyderabad",
      available: false,
      mapLink: "https://goo.gl/maps/Bi8vM",
    },
    {
      id: 6,
      name: "Hope Blood Bank",
      location: "Chennai",
      available: true,
      mapLink: "https://goo.gl/maps/Cm9hW",
    },
    {
      id: 7,
      name: "National Blood Service",
      location: "Pune",
      available: true,
      mapLink: "https://goo.gl/maps/Ns7yP",
    },
    {
      id: 8,
      name: "Metro Blood Center",
      location: "Ahmedabad",
      available: false,
      mapLink: "https://goo.gl/maps/Vb2rG",
    },
    {
      id: 9,
      name: "New Life Blood Bank",
      location: "Jaipur",
      available: true,
      mapLink: "https://goo.gl/maps/Pq6uL",
    },
    {
      id: 10,
      name: "Global Blood Donation",
      location: "Lucknow",
      available: true,
      mapLink: "https://goo.gl/maps/Xj4sB",
    },
    {
      id: 11,
      name: "Civic Health Blood Bank",
      location: "Bhopal",
      available: false,
      mapLink: "https://goo.gl/maps/Tn8wM",
    },
    {
      id: 12,
      name: "Sunrise Blood Center",
      location: "Chandigarh",
      available: true,
      mapLink: "https://goo.gl/maps/Yu3zP",
    },
    {
      id: 13,
      name: "People’s Blood Donors",
      location: "Nagpur",
      available: false,
      mapLink: "https://goo.gl/maps/Rs5tJ",
    },
  ]);

  const [search, setSearch] = useState("");

  // Filter centers based on search input
  const filteredCenters = centers.filter((center) =>
    center.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2 ">
      <h2 className="text-2xl font-bold text-red-600">
        Find a Blood Donation Center
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mt-4 border rounded-md"
      />

      {/* Center List */}
      <div className="mt-6 space-y-4">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <div
              key={center.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{center.name}</h3>
              <p className="text-gray-700">Location: {center.location}</p>
              <p
                className={`text-sm font-medium ${
                  center.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {center.available
                  ? "Available for Donation"
                  : "Currently Unavailable"}
              </p>
              <a
                href={center.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No centers found for the searched location.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindCenter;
