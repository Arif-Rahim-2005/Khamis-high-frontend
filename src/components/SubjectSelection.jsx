import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function SubjectSelectionTable() {
  const [selections, setSelections] = useState([]);
  const [systems, setSystems] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [newSelection, setNewSelection] = useState({
    name: "",
    subjects: "",
    system_id: "",
    department_id: "",
    track_id: "",
  });
  const [isEditing, setIsEditing] = useState(null);
  const [editSelection, setEditSelection] = useState({});

  const SELECTIONS_URL = `${BASE_URL}/subject-selections`;
  const SYSTEMS_URL = `${BASE_URL}/systems`;
  const DEPARTMENTS_URL = `${BASE_URL}/departments`;
  const TRACKS_URL = `${BASE_URL}/tracks`;

  // -----------------------------
  // Fetch data
  // -----------------------------
  const fetchSelections = async () => {
    try {
      const res = await fetch(SELECTIONS_URL);
      const data = await res.json();
      setSelections(data);
    } catch (err) {
      console.error("Error fetching selections:", err);
      alert("⚠️ Failed to load selections.");
    }
  };

  const fetchSystems = async () => {
    try {
      const res = await fetch(SYSTEMS_URL);
      const data = await res.json();
      setSystems(data);
    } catch (err) {
      console.error("Error fetching systems:", err);
      alert("⚠️ Failed to load systems.");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(DEPARTMENTS_URL);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      alert("⚠️ Failed to load departments.");
    }
  };

  const fetchTracks = async () => {
    try {
      const res = await fetch(TRACKS_URL);
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      alert("⚠️ Failed to load tracks.");
    }
  };

  useEffect(() => {
    fetchSelections();
    fetchSystems();
    fetchDepartments();
    fetchTracks();
  }, []);

  // -----------------------------
  // Add new selection
  // -----------------------------
  const handleAddSelection = async (e) => {
    e.preventDefault();
    if (
      !newSelection.name.trim() ||
      !newSelection.subjects.trim() ||
      !newSelection.system_id ||
      !newSelection.department_id
    ) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        ...newSelection,
        subjects: newSelection.subjects
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const res = await fetch(SELECTIONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
console.log(payload)
      const data = await res.json();
      if (res.ok) {
        alert("✅ Subject selection added successfully!");
        setNewSelection({
          name: "",
          subjects: "",
          system_id: "",
          department_id: "",
          track_id: "",
        });
        fetchSelections();
      } else {
        alert(`⚠️ ${data.message || "Failed to add selection."}`);
      }
    } catch (err) {
      console.error("Error adding selection:", err);
      alert("❌ Error adding selection.");
    }
  };

  // -----------------------------
  // Update selection
  // -----------------------------
  const handleUpdateSelection = async (e) => {
    e.preventDefault();
    if (
      !editSelection.name.trim() ||
      !editSelection.subjects.trim() ||
      !editSelection.system_id ||
      !editSelection.department_id
    ) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        ...editSelection,
        subjects: editSelection.subjects
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const res = await fetch(`${SELECTIONS_URL}/${isEditing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Subject selection updated successfully!");
        setIsEditing(null);
        fetchSelections();
      } else {
        alert(`⚠️ ${data.message || "Failed to update selection."}`);
      }
    } catch (err) {
      console.error("Error updating selection:", err);
      alert("❌ Error updating selection.");
    }
  };

  // -----------------------------
  // Delete selection
  // -----------------------------
  const handleDeleteSelection = async (id) => {
    if (!window.confirm("Are you sure you want to delete this selection?"))
      return;

    try {
      const res = await fetch(`${SELECTIONS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("🗑️ Selection deleted successfully!");
        fetchSelections();
      } else {
        alert(`⚠️ ${data.message || "Failed to delete selection."}`);
      }
    } catch (err) {
      console.error("Error deleting selection:", err);
      alert("❌ Error deleting selection.");
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📚 Manage Subject Selections
      </h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={isEditing ? handleUpdateSelection : handleAddSelection}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Selection Name"
            value={isEditing ? editSelection.name : newSelection.name}
            onChange={(e) =>
              isEditing
                ? setEditSelection({
                    ...editSelection,
                    name: e.target.value,
                  })
                : setNewSelection({
                    ...newSelection,
                    name: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="Subjects (comma separated)"
            value={isEditing ? editSelection.subjects : newSelection.subjects}
            onChange={(e) =>
              isEditing
                ? setEditSelection({
                    ...editSelection,
                    subjects: e.target.value,
                  })
                : setNewSelection({
                    ...newSelection,
                    subjects: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
            required
          />

          <select
            value={isEditing ? editSelection.system_id : newSelection.system_id}
            onChange={(e) =>
              isEditing
                ? setEditSelection({
                    ...editSelection,
                    system_id: e.target.value,
                  })
                : setNewSelection({
                    ...newSelection,
                    system_id: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select System</option>
            {Array.isArray(systems) &&
              systems.map((sys) => (
                <option key={sys.id} value={sys.id}>
                  {sys.name}
                </option>
              ))}
          </select>

          <select
            value={
              isEditing
                ? editSelection.department_id
                : newSelection.department_id
            }
            onChange={(e) =>
              isEditing
                ? setEditSelection({
                    ...editSelection,
                    department_id: e.target.value,
                  })
                : setNewSelection({
                    ...newSelection,
                    department_id: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Department</option>
            {Array.isArray(departments) &&
              departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
          </select>

          <select
            value={isEditing ? editSelection.track_id : newSelection.track_id}
            onChange={(e) =>
              isEditing
                ? setEditSelection({
                    ...editSelection,
                    track_id: e.target.value,
                  })
                : setNewSelection({
                    ...newSelection,
                    track_id: e.target.value,
                  })
            }
            className="border rounded p-2 w-full"
          >
            <option value="">Select Track (optional)</option>
            {Array.isArray(tracks) &&
              tracks.map((trk) => (
                <option key={trk.id} value={trk.id}>
                  {trk.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            {isEditing ? "Update Selection" : "Add Selection"}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Subjects</th>
              <th className="p-2 border">System</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Track</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selections.length > 0 ? (
              selections.map((sel) => (
                <tr key={sel.id} className="odd:bg-green-50">
                  <td className="p-2 border">{sel.name}</td>
                  <td className="p-2 border">
                    {Array.isArray(sel.subjects)
                      ? sel.subjects.join(", ")
                      : sel.subjects || "-"}
                  </td>
                  <td className="p-2 border">
                    {systems.find((sys) => sys.id === sel.system.id)?.name ||
                      "-"}
                  </td>
                  <td className="p-2 border">
                    {departments.find((dep) => dep.id === sel.department.id)
                      ?.name || "-"}
                  </td>
                  <td className="p-2 border">
                    {tracks.find((trk) => trk.id === sel.track.id)?.name || "-"}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => {
                        setIsEditing(sel.id);
                        setEditSelection({
                          name: sel.name,
                          subjects: Array.isArray(sel.subjects)
                            ? sel.subjects.join(", ")
                            : sel.subjects,
                          system_id: sel.system_id || "",
                          department_id: sel.department_id || "",
                          track_id: sel.track_id || "",
                        });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSelection(sel.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No subject selections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
