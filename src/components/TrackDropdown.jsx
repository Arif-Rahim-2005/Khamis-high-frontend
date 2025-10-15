import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function TracksDropdown() {
  const [tracks, setTracks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newTrack, setNewTrack] = useState({ name: "", department_id: "" });
  const [isEditing, setIsEditing] = useState(null);
  const [editTrack, setEditTrack] = useState({});
  const [message, setMessage] = useState("");

  const TRACKS_URL = `${BASE_URL}/tracks`;
  const DEPARTMENTS_URL = `${BASE_URL}/departments`;

  // Fetch all tracks + departments
  const fetchTracks = async () => {
    try {
      const res = await fetch(TRACKS_URL);
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(DEPARTMENTS_URL);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchTracks();
    fetchDepartments();
  }, []);

  // Add Track
  const handleAddTrack = async (e) => {
    e.preventDefault();
    if (!newTrack.name.trim() || !newTrack.department_id) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(TRACKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTrack.name,
          department_id: parseInt(newTrack.department_id),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Track added successfully!");
        setNewTrack({ name: "", department_id: "" });
        fetchTracks();
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding track:", err);
      setMessage("❌ Error adding track.");
    }
  };

  // Update Track
  const handleUpdateTrack = async (e) => {
    e.preventDefault();
    if (!editTrack.name.trim() || !editTrack.department_id) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`${TRACKS_URL}/${isEditing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editTrack.name,
          department_id: parseInt(editTrack.department_id),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Track updated successfully!");
        setIsEditing(null);
        fetchTracks();
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating track:", err);
      setMessage("❌ Error updating track.");
    }
  };

  // Delete Track
  const handleDeleteTrack = async (id) => {
    if (!window.confirm("Are you sure you want to delete this track?")) return;

    try {
      const res = await fetch(`${TRACKS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        setMessage("🗑️ Track deleted successfully!");
        fetchTracks();
      } else {
        setMessage(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting track:", err);
      setMessage("❌ Error deleting track.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🎯 Manage Tracks
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded text-green-800 text-sm">
          {message}
        </div>
      )}

      {/* Add / Edit Track Form */}
      <form
        onSubmit={isEditing ? handleUpdateTrack : handleAddTrack}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Track Name"
            value={isEditing ? editTrack.name : newTrack.name}
            onChange={(e) =>
              isEditing
                ? setEditTrack({ ...editTrack, name: e.target.value })
                : setNewTrack({ ...newTrack, name: e.target.value })
            }
            className="border rounded p-2 w-full"
            required
          />

          <select
            value={isEditing ? editTrack.department_id : newTrack.department_id}
            onChange={(e) =>
              isEditing
                ? setEditTrack({
                    ...editTrack,
                    department_id: e.target.value,
                  })
                : setNewTrack({
                    ...newTrack,
                    department_id: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            {isEditing ? "Update Track" : "Add Track"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="ml-3 text-gray-600 hover:underline"
              onClick={() => setIsEditing(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Tracks Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.length > 0 ? (
              tracks.map((track) => (
                <tr key={track.id} className="odd:bg-green-50">
                  <td className="p-2 border">{track.name}</td>
                  <td className="p-2 border">{track.department}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => {
                        setIsEditing(track.id);
                        const dept = departments.find(
                          (d) => d.name === track.department
                        );
                        setEditTrack({
                          name: track.name,
                          department_id: dept ? dept.id : "",
                        });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTrack(track.id)}
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
                  No tracks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
