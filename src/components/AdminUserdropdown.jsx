import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUsersDropdown = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        alert("User deleted successfully");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editingUser.username,
          email: editingUser.email,
          role: editingUser.role,
        }),
      });

      if (res.ok) {
        alert("User updated successfully");
        setEditingUser(null);
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update user");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="mb-6">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 bg-green-700 text-white rounded-md"
      >
        {dropdownOpen ? "Hide Users" : "Show Users"}
      </button>

      {dropdownOpen && (
        <div className="mt-4 border rounded-md p-4 bg-white shadow-md">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between mb-2 border-b pb-1"
            >
              <div>
                <p>
                  <strong>{user.username}</strong> ({user.email}) - {user.role}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {editingUser && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="font-semibold mb-2">Edit User</h3>
              <input
                type="text"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
              />
              <input
                type="email"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
              <input
                type="text"
                className="border rounded px-2 py-1 mb-2 w-full"
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsersDropdown;
