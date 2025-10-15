import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. "http://127.0.0.1:5000"

export default function AdminUsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const USERS_URL = `${BASE_URL}/users`;

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(USERS_URL, { headers: getAuthHeaders() });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("⚠️ Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingUser({
      id: user.id,
      username: user.username || "",
      email: user.email || "",
      role: user.role || "",
    });
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setMessage("");
  };

  const saveEdit = async (e) => {
    e?.preventDefault?.();
    if (!editingUser) return;
    setMessage("");
    if (!editingUser.username.trim() || !editingUser.email.trim()) {
      setMessage("⚠️ Please fill required fields.");
      return;
    }

    try {
      const res = await fetch(`${USERS_URL}/${editingUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          username: editingUser.username.trim(),
          email: editingUser.email.trim(),
          role: editingUser.role?.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ User updated successfully.");
        setEditingUser(null);
        fetchUsers();
      } else {
        setMessage(`❌ ${data.message || "Failed to update user."}`);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("❌ Server error while updating user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setMessage("");
    try {
      const res = await fetch(`${USERS_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("🗑️ User deleted.");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        setMessage(`❌ ${data.message || "Failed to delete user."}`);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("❌ Server error while deleting user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        👥 Manage Users
      </h2>

      {message && (
        <div className="mb-3 bg-gray-100 text-center text-sm py-2 rounded-md text-gray-700">
          {message}
        </div>
      )}

      {/* Inline Edit Form */}
      {editingUser && (
        <form
          onSubmit={saveEdit}
          className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
        >
          <h3 className="font-semibold mb-3">Edit User</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser((p) => ({ ...p, username: e.target.value }))
              }
              placeholder="Username"
              className="border rounded p-2 w-full"
              required
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="Email"
              className="border rounded p-2 w-full"
              required
            />
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser((p) => ({ ...p, role: e.target.value }))
              }
              placeholder="Role (e.g. Admin)"
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, idx) => (
                <tr key={user.id} className="odd:bg-green-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
