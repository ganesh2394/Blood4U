import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in some environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mock Data - Replace with real API later
const donationCenters = [
  {
    id: 1,
    name: "Red Cross Delhi",
    city: "Delhi",
    lat: 28.6139,
    lon: 77.209,
    openHours: "9 AM - 5 PM",
    contact: "+91 12345 67890",
  },
  {
    id: 2,
    name: "Blood Bank Mumbai",
    city: "Mumbai",
    lat: 19.076,
    lon: 72.8777,
    openHours: "10 AM - 6 PM",
    contact: "+91 99887 11223",
  },
  {
    id: 3,
    name: "Chennai Life Center",
    city: "Chennai",
    lat: 13.0827,
    lon: 80.2707,
    openHours: "8 AM - 4 PM",
    contact: "+91 88990 44332",
  },
];

const FlyToUser = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lon], 10);
    }
  }, [location]);
  return null;
};

const DonationCenters = () => {
  const [search, setSearch] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(donationCenters);
  const [userLocation, setUserLocation] = useState(null);

  // Filter centers based on search input
  useEffect(() => {
    const results = donationCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(search.toLowerCase()) ||
        center.city.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCenters(results);
  }, [search]);

  // Get user's geolocation
  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => alert("Location access denied or unavailable.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        🩸 Find a Blood Donation Center Near You
      </h1>

      {/* Search & Location Button */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or city..."
          className="border border-gray-300 p-2 w-full md:w-2/3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleFindMyLocation}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow-md transition-all"
        >
          📍 Find My Location
        </button>
      </div>

      {/* Leaflet Map */}
      <div className="h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
        <MapContainer
          center={[22.9734, 78.6569]} // Center of India
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToUser location={userLocation} />

          {/* User Marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lon]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {/* Centers Marker */}
          {filteredCenters.map((center) => (
            <Marker key={center.id} position={[center.lat, center.lon]}>
              <Popup>
                <strong>{center.name}</strong>
                <br />
                City: {center.city}
                <br />⏰ {center.openHours}
                <br />
                📞 {center.contact}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* List View */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">
          📋 Available Donation Centers
        </h2>
        {filteredCenters.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCenters.map((center) => (
              <div
                key={center.id}
                className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-bold text-red-600">
                  {center.name}
                </h3>
                <p className="text-gray-700">📍 {center.city}</p>
                <p className="text-gray-700">⏰ {center.openHours}</p>
                <p className="text-gray-700">📞 {center.contact}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center">No centers found.</p>
        )}
      </div>
    </div>
  );
};

export default DonationCenters;
