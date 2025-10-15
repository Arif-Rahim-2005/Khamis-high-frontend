import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. "http://127.0.0.1:5000"

export default function AdminSystemsPanel() {
  const [systems, setSystems] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const SYSTEMS_URL = `${BASE_URL}/systems`;

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    try {
      const res = await fetch(SYSTEMS_URL);
      const data = await res.json();
      setSystems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching systems:", err);
      setMessage("⚠️ Failed to load systems.");
    }
  };

  // Add system
  const handleAdd = async (e) => {
    e?.preventDefault?.();
    setMessage("");
    if (!formData.name.trim()) {
      setMessage("⚠️ Please enter a system name.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(SYSTEMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ System added!");
        setFormData({ name: "" });
        fetchSystems();
      } else {
        setMessage(`❌ ${data.message || "Failed to add system."}`);
      }
    } catch (err) {
      console.error("Error adding system:", err);
      setMessage("❌ Server error while adding system.");
    } finally {
      setLoading(false);
    }
  };

  // Start edit
  const startEdit = (sys) => {
    setIsEditing(sys.id);
    setEditData({ name: sys.name || "" });
    setMessage("");
  };

  // Save edit (PATCH)
  const handleSaveEdit = async (e) => {
    e?.preventDefault?.();
    setMessage("");
    if (!editData.name.trim()) {
      setMessage("⚠️ Please enter a name.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${SYSTEMS_URL}/${isEditing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editData.name.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✏️ System updated!");
        setIsEditing(null);
        setEditData({ name: "" });
        fetchSystems();
      } else {
        setMessage(`❌ ${data.message || "Failed to update system."}`);
      }
    } catch (err) {
      console.error("Error updating system:", err);
      setMessage("❌ Server error while updating system.");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this system?")) return;
    setMessage("");
    try {
      const res = await fetch(`${SYSTEMS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage("🗑️ System deleted!");
        fetchSystems();
      } else {
        setMessage(`❌ ${data.message || "Failed to delete system."}`);
      }
    } catch (err) {
      console.error("Error deleting system:", err);
      setMessage("❌ Server error while deleting system.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🧭 Manage Systems
      </h2>

      {message && (
        <div className="mb-3 bg-gray-100 text-center text-sm py-2 rounded-md text-gray-700">
          {message}
        </div>
      )}

      {/* Add / Edit Form */}
      <form
        onSubmit={isEditing ? handleSaveEdit : handleAdd}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="System Name"
            value={isEditing ? editData.name : formData.name}
            onChange={(e) =>
              isEditing
                ? setEditData((p) => ({ ...p, name: e.target.value }))
                : setFormData((p) => ({ ...p, name: e.target.value }))
            }
            className="border rounded p-2 w-full"
            required
          />

          <div className="flex items-center gap-2 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              {isEditing ? "Update System" : "Add System"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setEditData({ name: "" });
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Systems table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {systems.length > 0 ? (
              systems.map((sys) => (
                <tr key={sys.id} className="odd:bg-green-50">
                  <td className="p-2 border">{sys.name}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(sys)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sys.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">
                  No systems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
