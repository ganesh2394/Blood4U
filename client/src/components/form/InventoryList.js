import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Input,
  Select,
  Table,
  Button,
  message,
  Popconfirm,
} from "antd";

const InventoryList = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchInventory = async (token) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/inventory/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        setInventoryData(data.inventory);
      } else {
        message.error("Failed to fetch inventory");
      }
    } catch (err) {
      console.error("Fetch Inventory Error:", err);
      message.error("Something went wrong while fetching inventory.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/api/inventory/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        message.success("Inventory deleted successfully");
        fetchInventory(token);
      } else {
        message.error("Failed to delete inventory");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Something went wrong while deleting.");
    }
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      bloodGroup: record.bloodGroup,
      inventoryType: record.inventoryType,
      quantity: record.quantity,
    });
    setIsEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const values = await form.validateFields();

      const res = await axios.put(
        process.env.REACT_APP_API_URL +
          `/api/inventory/update/${currentRecord._id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success) {
        message.success("Inventory updated successfully");
        setIsEditModalVisible(false);
        fetchInventory(token);
      } else {
        message.error("Failed to update inventory");
      }
    } catch (error) {
      console.error("Update Error:", error);
      message.error("Something went wrong while updating.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("role");
    setUserRole(userRole);
    fetchInventory(token);
  }, []);

  const columns = [
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
    },
    {
      title: "Type",
      dataIndex: "inventoryType",
      key: "inventoryType",
    },
    {
      title: "Quantity (ml)",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Donor",
      dataIndex: ["donor", "name"],
      key: "donor",
      render: (_, record) => record?.donor?.name || "N/A",
    },
    {
      title: "Hospital",
      dataIndex: ["hospital", "name"],
      key: "hospital",
      render: (_, record) => record?.hospital?.hospitalName || "N/A",
    },
    {
      title: "Organization",
      dataIndex: ["organization", "organizationName"],
      key: "organization",
      render: (_, record) => record?.organization?.organizationName || "N/A",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  // Show edit/delete only for authorized roles
  if (["admin", "hospital", "organization"].includes(userRole)) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this inventory?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    });
  }

  return (
    <div className="mt-8 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          📦 Inventory Records
        </h2>

        <Table
          dataSource={inventoryData}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
          bordered
        />
      </div>

      {/* Edit Inventory Modal */}
      <Modal
        title="Edit Inventory"
        open={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
        className="rounded-xl"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="bloodGroup"
            label="Blood Group"
            rules={[{ required: true, message: "Please enter blood group" }]}
          >
            <Input placeholder="Enter blood group" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="inventoryType"
            label="Inventory Type"
            rules={[
              { required: true, message: "Please select inventory type" },
            ]}
          >
            <Select placeholder="Select inventory type" className="rounded-md">
              <Select.Option value="in">IN</Select.Option>
              <Select.Option value="out">OUT</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity (ml)"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input
              type="number"
              placeholder="Enter quantity in ml"
              className="rounded-md"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryList;
