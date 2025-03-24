import React, { useEffect, useState } from "react";
import { Button, Table, Select, Modal, Input, message } from "antd";

const { Option } = Select;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("User deleted successfully");
        fetchUsers(); // Refresh the list after deletion
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/users/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      );

      const data = await response.json();
      if (data.success) {
        message.success("User updated successfully");
        setIsModalOpen(false);
        fetchUsers(); // Refresh user list
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user &&
      typeof user.name === "string" &&
      typeof user.email === "string" &&
      (selectedRole === "all" || user.role === selectedRole) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.includes(searchQuery))
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="flex gap-4 mb-4">
        <Select defaultValue="all" className="w-40" onChange={handleRoleChange}>
          <Option value="all">All</Option>
          <Option value="admin">Admin</Option>
          <Option value="hospital">Hospital</Option>
          <Option value="organization">Organization</Option>
          <Option value="donor">Donor</Option>
        </Select>
        <Input
          placeholder="Search by name or email"
          className="w-64 px-2 py-1 border rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table
        className="shadow-lg rounded-lg"
        dataSource={filteredUsers}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => {
              if (record.role === "organization")
                return record.organizationName;
              if (record.role === "hospital") return record.hospitalName;
              return record.name;
            },
          },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Role", dataIndex: "role", key: "role" },
          { title: "Phone", dataIndex: "phone", key: "phone" },
          {
            title: "Actions",
            render: (text, record) => (
              <div className="flex gap-2">
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleEditUser(record)}
                >
                  Edit
                </Button>
                <Button
                  type="danger"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteUser(record._id)}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        rowKey="_id"
      />

      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleSaveUser}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          className="mb-2"
          placeholder="Name"
          value={currentUser?.name || ""}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, name: e.target.value })
          }
        />
        <Input
          className="mb-2"
          placeholder="Email"
          value={currentUser?.email || ""}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, email: e.target.value })
          }
        />
        <Select
          className="w-full"
          value={currentUser?.role || ""}
          onChange={(value) => setCurrentUser({ ...currentUser, role: value })}
        >
          <Option value="admin">Admin</Option>
          <Option value="hospital">Hospital</Option>
          <Option value="organization">Organization</Option>
          <Option value="donor">Donor</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ManageUsers;
