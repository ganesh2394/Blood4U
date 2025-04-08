import React, { useEffect, useState } from "react";
import { Button, Table, Select, Modal, Input, message } from "antd";

const { Option } = Select;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/users");
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
    setCurrentUser({
      ...user,
      name:
        user.role === "organization"
          ? user.organizationName
          : user.role === "hospital"
          ? user.hospitalName
          : user.name,
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/users/delete/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        message.success("User deleted successfully");
        fetchUsers();
      } else {
        message.error("Failed to delete user");
      }
    } catch (error) {
      message.error("Error deleting user");
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
        fetchUsers();
      } else {
        message.error(data.message || "Update failed");
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Users
      </h2>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <Select defaultValue="all" className="w-48" onChange={handleRoleChange}>
          <Option value="all">All Roles</Option>
          <Option value="admin">Admin</Option>
          <Option value="hospital">Hospital</Option>
          <Option value="organization">Organization</Option>
          <Option value="donor">Donor</Option>
        </Select>

        <Input
          placeholder="Search by name or email"
          className="w-72"
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <Table
          dataSource={filteredUsers}
          rowKey="_id"
          pagination={{ pageSize: 7 }}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (_, record) =>
                record.role === "organization"
                  ? record.organizationName
                  : record.role === "hospital"
                  ? record.hospitalName
                  : record.name || "N/A",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
              render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
            },
            {
              title: "Phone",
              dataIndex: "phone",
              key: "phone",
              render: (phone) => phone || "N/A",
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => {
                const isSelf = record._id === loggedInUserId;
                const isAdmin = record.role === "admin";
                const canEditDelete = !isSelf && !isAdmin;

                return (
                  <div className="flex gap-2">
                    <Button
                      type="primary"
                      disabled={!canEditDelete}
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleEditUser(record)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="primary"
                      danger
                      disabled={!canEditDelete}
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleDeleteUser(record._id)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </div>

      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleSaveUser}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={currentUser?.name || ""}
            onChange={(e) => {
              const updatedName = e.target.value;
              setCurrentUser({
                ...currentUser,
                name: updatedName,
                ...(currentUser.role === "organization" && {
                  organizationName: updatedName,
                }),
                ...(currentUser.role === "hospital" && {
                  hospitalName: updatedName,
                }),
              });
            }}
          />
          <Input
            placeholder="Email"
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <Select className="w-full" value={currentUser?.role || ""} disabled>
            <Option value="admin">Admin</Option>
            <Option value="hospital">Hospital</Option>
            <Option value="organization">Organization</Option>
            <Option value="donor">Donor</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
