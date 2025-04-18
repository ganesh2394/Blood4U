import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ScheduleDonation = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    date: "",
    organization: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserAndOrganizations = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const userRes = await axios.get(
          process.env.REACT_APP_API_URL + "/api/auth/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userRes.data.user);

        const orgRes = await axios.get(
          process.env.REACT_APP_API_URL + "/api/inventory/organizations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrganizations(orgRes.data.organizations || []);
      } catch (error) {
        console.error("Error fetching user or organizations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrganizations();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.bloodGroup ||
      !formData.quantity ||
      !formData.date ||
      !formData.organization
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const payload = {
        inventoryType: "in",
        bloodGroup: formData.bloodGroup,
        quantity: parseFloat(formData.quantity) / 100, // assuming backend uses liters
        organization: formData.organization,
        email: user.email,
        createdAt: formData.date,
      };

      await axios.post(
        process.env.REACT_APP_API_URL + "/api/inventory/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Donation scheduled successfully!");
      setFormData({
        bloodGroup: "",
        quantity: "",
        date: "",
        organization: "",
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error scheduling donation", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Schedule Donation
      </h2>

      {successMessage && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity (in ml)</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={100}
            step={100}
            placeholder="Enter quantity e.g. 500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={moment().format("YYYY-MM-DD")}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Organization</label>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.organizationName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Schedule Donation
        </button>
      </form>
    </div>
  );
};

export default ScheduleDonation;
