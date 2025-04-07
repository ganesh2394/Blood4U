import React, { useEffect, useState } from "react";
import axios from "axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RequestBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [reason, setReason] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available organizations
  const getOrganizations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/inventory/organizations/hospital",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setOrganizations(res.data.organizations || []);
    } catch (error) {
      console.error("Error fetching organizations", error);
    }
  };

  // Fetch previous blood requests (optional)
  const getMyRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/inventory/hospital-requests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("res pre blood : ", res);
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Error fetching hospital requests", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !quantity || !organizationId || !reason) {
      return alert("Please fill in all fields");
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/inventory/create",
        {
          inventoryType: "out",
          bloodGroup,
          quantity,
          organization: organizationId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert("Blood request sent successfully!");
      setBloodGroup("");
      setQuantity("");
      setOrganizationId("");
      setReason("");
      getMyRequests();
    } catch (error) {
      console.error("Error requesting blood", error);
      alert("Failed to request blood");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
    getMyRequests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Request Blood</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow-md"
      >
        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity (ml)</label>
          <input
            type="number"
            min="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Select Organization
          </label>
          <select
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.organizationName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Emergency, surgery, accident..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Requesting..." : "Submit Request"}
        </button>
      </form>

      {/* History Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">My Previous Requests</h3>
        {requests.length === 0 ? (
          <p>No previous requests found.</p>
        ) : (
          <table className="w-full table-auto border-collapse border shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Organization</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{req.bloodGroup}</td>
                  <td className="p-2 border">{req.quantity} ml</td>
                  <td className="p-2 border">
                    {req.organization?.organizationName || "N/A"}
                  </td>
                  <td className="p-2 border">{req.reason || "N/A"}</td>
                  <td className="p-2 border">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RequestBlood;
