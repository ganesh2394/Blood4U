import React, { useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import InventoryList from "./InventoryList";
const InventoryForm = ({ userRole }) => {
  const [formData, setFormData] = useState({
    inventoryType: userRole === "hospital" ? "out" : "in",
    bloodGroup: "O+",
    quantity: 1,
    organization: "",
    hospital: "",
    donor: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [donors, setDonors] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (["admin", "donor"].includes(userRole)) {
          const res = await axios.get(
            "http://localhost:8080/api/inventory/organizations",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setOrganizations(res.data.organizations || []);
        }

        if (["admin", "organization"].includes(userRole)) {
          const res = await axios.get(
            "http://localhost:8080/api/inventory/hospitals",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setHospitals(res.data.hospitals || []);
        }

        if (["admin", "organization"].includes(userRole)) {
          const res = await axios.get(
            "http://localhost:8080/api/inventory/donors",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setDonors(res.data.donors || []);
        }
      } catch (error) {
        console.error("Dropdown load error:", error);
        message.error("Failed to load dropdown data.");
      }
    };

    fetchData();
  }, [userRole, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hide = message.loading("Submitting inventory...", 0);

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let apiUrl = "http://localhost:8080/api/inventory";

      if (userRole === "donor") {
        apiUrl += "/create-in";
      } else if (userRole === "hospital") {
        apiUrl += "/create-out";
      } else if (userRole === "organization" || userRole === "admin") {
        apiUrl += "/create";
      }

      const requestData = {
        inventoryType: formData.inventoryType,
        bloodGroup: formData.bloodGroup,
        quantity: formData.quantity,
        organization: formData.organization,
        hospital: formData.hospital || undefined,
        donor: formData.donor || undefined,
      };

      const { data } = await axios.post(apiUrl, requestData, config);

      hide();

      if (data?.success) {
        message.success(data.message || "Inventory created successfully!");

        setFormData({
          inventoryType: userRole === "hospital" ? "out" : "in",
          bloodGroup: "O+",
          quantity: 1,
          organization: "",
          hospital: "",
          donor: "",
        });
      } else {
        message.error(data.message || "Failed to create inventory.");
      }
    } catch (error) {
      hide();
      console.error("Inventory Submission Error:", error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-5 shadow-lg bg-white rounded-md">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-5">
        Manage Inventory
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Inventory Type */}
          <label className="flex flex-col">
            <span className="font-medium text-gray-700 mb-2">
              Inventory Type
            </span>
            <select
              name="inventoryType"
              value={formData.inventoryType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={userRole === "hospital" || userRole === "donor"}
            >
              {(userRole === "admin" || userRole === "organization") && (
                <>
                  <option value="out">Out (Issuance)</option>
                  <option value="in">In (Donation)</option>
                </>
              )}
              {userRole === "hospital" && (
                <option value="out">Out (Issuance)</option>
              )}
              {userRole === "donor" && (
                <option value="in">In (Donation)</option>
              )}
            </select>
          </label>

          {/* Blood Group */}
          <label className="flex flex-col">
            <span className="font-medium text-gray-700 mb-2">Blood Group</span>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        {/* Quantity */}
        <label className="flex flex-col mt-4">
          <span className="font-medium text-gray-700 mb-2">Quantity (ml)</span>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </label>

        {/* Organization */}
        <label className="flex flex-col mt-4">
          <span className="font-medium text-gray-700 mb-2">Organization</span>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.organizationName}
              </option>
            ))}
          </select>
        </label>

        {/* Hospital (for Outgoing) */}
        {formData.inventoryType === "out" && userRole !== "donor" && (
          <label className="flex flex-col mt-4">
            <span className="font-medium text-gray-700 mb-2">Hospital</span>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hosp) => (
                <option key={hosp._id} value={hosp._id}>
                  {hosp.hospitalName}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Donor (for Incoming) */}
        {formData.inventoryType === "in" && userRole !== "hospital" && (
          <label className="flex flex-col mt-4">
            <span className="font-medium text-gray-700 mb-2">Donor</span>
            <select
              name="donor"
              value={formData.donor}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Donor</option>
              {donors.map((donor) => (
                <option key={donor._id} value={donor._id}>
                  {donor.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Inventory
        </button>
      </form>
      {/* ✅ Show Inventory List below the form */}
      <InventoryList />
    </div>
  );
};

export default InventoryForm;
