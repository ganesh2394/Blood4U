import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock Data: Replace with real API data
const donationCenters = [
  {
    id: 1,
    name: "Red Cross Center",
    city: "New York",
    lat: 40.7128,
    lon: -74.006,
    openHours: "9 AM - 5 PM",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "City Blood Bank",
    city: "Los Angeles",
    lat: 34.0522,
    lon: -118.2437,
    openHours: "8 AM - 6 PM",
    contact: "987-654-3210",
  },
];
const DonationCenters = () => {
  const [search, setSearch] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(donationCenters);
  const [userLocation, setUserLocation] = useState(null);

  // Search Filter
  useEffect(() => {
    const results = donationCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(search.toLowerCase()) ||
        center.city.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCenters(results);
  }, [search]);

  // Get User Location
  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => alert("Location access denied. Please enable GPS.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold text-center mb-4">
        Find a Blood Donation Center
      </h1>

      {/* Search Bar & Find My Location */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or city..."
          className="border p-2 w-2/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleFindMyLocation}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Find My Location
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={4}
        className="h-96 w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredCenters.map((center) => (
          <Marker key={center.id} position={[center.lat, center.lon]}>
            <Popup>
              <h2 className="text-lg font-bold">{center.name}</h2>
              <p>{center.city}</p>
              <p>Hours: {center.openHours}</p>
              <p>Contact: {center.contact}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* List View */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Available Centers</h2>
        {filteredCenters.length > 0 ? (
          <ul className="mt-2">
            {filteredCenters.map((center) => (
              <li key={center.id} className="border p-2 mb-2 rounded shadow-md">
                <h3 className="font-bold">{center.name}</h3>
                <p>{center.city}</p>
                <p>Hours: {center.openHours}</p>
                <p>Contact: {center.contact}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">No centers found.</p>
        )}
      </div>
    </div>
  );
};

export default DonationCenters;
