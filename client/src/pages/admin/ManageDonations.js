import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    bloodGroup: "",
    dateRange: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch donations
  const getAllDonations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/inventory/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Filter only donation entries (inventoryType = "in")
      const donationData = data?.inventory?.filter(
        (item) => item.inventoryType === "in"
      );

      setDonations(donationData);
      setFilteredData(donationData);
    } catch (err) {
      message.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  // Filtering logic
  const handleFilter = () => {
    const { search, bloodGroup, dateRange } = filters;
    let filtered = [...donations];

    if (search) {
      filtered = filtered.filter((d) =>
        d.donor?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (bloodGroup) {
      filtered = filtered.filter((d) => d.bloodGroup === bloodGroup);
    }

    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      filtered = filtered.filter((d) => {
        const date = moment(d.createdAt);
        return date.isBetween(start, end, null, "[]");
      });
    }

    setFilteredData(filtered);
  };

  // Delete entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      message.success("Donation deleted");
      getAllDonations();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "Donor",
      dataIndex: "donor",
      render: (donor) => donor?.name || "N/A",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
    },
    {
      title: "Quantity (ml)",
      dataIndex: "quantity",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      render: (org) => org?.organizationName || "N/A",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id) => (
        <Popconfirm
          title="Are you sure to delete this donation?"
          onConfirm={() => handleDelete(id)}
        >
          <Button danger type="link">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
        🩸 Manage Blood Donations
      </h2>

      {/* Filters */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-4">
        <Input
          placeholder="Search Donor Name"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        <Select
          placeholder="Select Blood Group"
          allowClear
          value={filters.bloodGroup}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, bloodGroup: val }))
          }
        >
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
            <Option key={group} value={group}>
              {group}
            </Option>
          ))}
        </Select>

        <RangePicker
          onChange={(dates) =>
            setFilters((prev) => ({ ...prev, dateRange: dates || [] }))
          }
        />

        <Button type="primary" onClick={handleFilter}>
          Apply Filters
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default ManageDonations;
