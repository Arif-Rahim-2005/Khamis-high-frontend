import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:5000

export default function AdminDepartmentsPanel() {
  const [departments, setDepartments] = useState([]);
  const [systems, setSystems] = useState([]);
  const [formData, setFormData] = useState({ name: "", system_id: "" });
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "", system_id: "" });
  const [loading, setLoading] = useState(false);

  const DEPARTMENTS_URL = `${BASE_URL}/departments`;
  const SYSTEMS_URL = `${BASE_URL}/systems`;

  useEffect(() => {
    fetchDepartments();
    fetchSystems();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(DEPARTMENTS_URL);
      const data = await res.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching departments:", err);
      alert("⚠️ Failed to load departments.");
    }
  };

  const fetchSystems = async () => {
    try {
      const res = await fetch(SYSTEMS_URL);
      const data = await res.json();
      setSystems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching systems:", err);
      alert("⚠️ Failed to load systems.");
    }
  };

  // Add department
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.system_id) {
      alert("⚠️ Please enter a department name and select a system.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(DEPARTMENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          system_id: parseInt(formData.system_id, 10),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Department added!");
        setFormData({ name: "", system_id: "" });
        fetchDepartments();
      } else {
        alert(`❌ ${data.message || "Failed to add department."}`);
      }
    } catch (err) {
      console.error("Error adding department:", err);
      alert("❌ Server error while adding department.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare edit
  const startEdit = (dept) => {
    setIsEditing(dept.id);
    setEditData({
      name: dept.name || "",
      system_id: dept.system?.id ? String(dept.system.id) : "",
    });
  };

  // Save edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editData.name.trim() || !editData.system_id) {
      alert("⚠️ Please fill in all fields for edit.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${DEPARTMENTS_URL}/${isEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name.trim(),
          system_id: parseInt(editData.system_id, 10),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✏️ Department updated!");
        setIsEditing(null);
        setEditData({ name: "", system_id: "" });
        fetchDepartments();
      } else {
        alert(`❌ ${data.message || "Failed to update department."}`);
      }
    } catch (err) {
      console.error("Error updating department:", err);
      alert("❌ Server error while updating department.");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      const res = await fetch(`${DEPARTMENTS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("🗑️ Department deleted!");
        fetchDepartments();
      } else {
        alert(`❌ ${data.message || "Failed to delete department."}`);
      }
    } catch (err) {
      console.error("Error deleting department:", err);
      alert("❌ Server error while deleting department.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🏛 Manage Departments
      </h2>

      {/* Form: Add or Edit */}
      <form
        onSubmit={isEditing ? handleSaveEdit : handleAdd}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={isEditing ? editData.name : formData.name}
            onChange={(e) =>
              isEditing
                ? setEditData((p) => ({ ...p, name: e.target.value }))
                : setFormData((p) => ({ ...p, name: e.target.value }))
            }
            className="border rounded p-2 w-full"
            required
          />

          <select
            name="system_id"
            value={isEditing ? editData.system_id : formData.system_id}
            onChange={(e) =>
              isEditing
                ? setEditData((p) => ({ ...p, system_id: e.target.value }))
                : setFormData((p) => ({ ...p, system_id: e.target.value }))
            }
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select System</option>
            {systems.map((sys) => (
              <option key={sys.id} value={sys.id}>
                {sys.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              {isEditing ? "Update Department" : "Add Department"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setEditData({ name: "", system_id: "" });
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Departments table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">System</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept.id} className="odd:bg-green-50">
                  <td className="p-2 border">{dept.name}</td>
                  <td className="p-2 border">{dept.system?.name || "-"}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(dept)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
