import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:5000/api

export default function SubjectsDropdown() {
  const [subjects, setSubjects] = useState([]);
  const [systems, setSystems] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tracks, setTracks] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    system_id: "",
    department_id: "",
    track_id: "",
  });

  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Endpoints
  const SUBJECTS_URL = `${BASE_URL}/subjects`;
  const SYSTEMS_URL = `${BASE_URL}/systems`;
  const DEPARTMENTS_URL = `${BASE_URL}/departments`;
  const TRACKS_URL = `${BASE_URL}/tracks`;

  // ✅ Fetch all required data
  useEffect(() => {
    fetchSubjects();
    fetchSystems();
    fetchDepartments();
    fetchTracks();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(SUBJECTS_URL);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      alert("⚠️ Failed to fetch subjects");
    }
  };

  const fetchSystems = async () => {
    try {
      const res = await fetch(SYSTEMS_URL);
      const data = await res.json();
      setSystems(data);
    } catch (err) {
      alert("⚠️ Failed to fetch systems");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch(DEPARTMENTS_URL);
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      alert("⚠️ Failed to fetch departments");
    }
  };

  const fetchTracks = async () => {
    try {
      const res = await fetch(TRACKS_URL);
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      alert("⚠️ Failed to fetch tracks");
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Add / Update Subject
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.department_id) {
      alert("⚠️ Name and Department are required!");
      return;
    }

    setLoading(true);

    const url = isEditing ? `${SUBJECTS_URL}/${isEditing}` : SUBJECTS_URL;
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          system_id: formData.system_id ? parseInt(formData.system_id) : null,
          department_id: parseInt(formData.department_id),
          track_id: formData.track_id ? parseInt(formData.track_id) : null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(isEditing ? "✅ Subject updated!" : "✅ Subject added!");
        setFormData({
          name: "",
          system_id: "",
          department_id: "",
          track_id: "",
        });
        setIsEditing(null);
        fetchSubjects();
      } else {
        alert(`❌ ${data.message || "Error saving subject."}`);
      }
    } catch (err) {
      alert("❌ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Subject
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?"))
      return;

    try {
      const res = await fetch(`${SUBJECTS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("🗑️ Subject deleted!");
        fetchSubjects();
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("❌ Server error while deleting.");
    }
  };

  // ✅ Start Editing
  const startEdit = (subject) => {
    setIsEditing(subject.id);
    setFormData({
      name: subject.name,
      system_id: subject.system?.id || "",
      department_id: subject.department?.id || "",
      track_id: subject.track?.id || "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📘 Manage Subjects
      </h2>

      {/* ✅ Add/Edit Subject Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Subject Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-green-300 focus:ring-2 focus:ring-green-400 rounded p-2 w-full"
            required
          />

          <select
            name="system_id"
            value={formData.system_id}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          >
            <option value="">Select System</option>
            {systems.map((sys) => (
              <option key={sys.id} value={sys.id}>
                {sys.name}
              </option>
            ))}
          </select>

          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* <select
            name="track_id"
            value={formData.track_id}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          >
            <option value="">Select Track (optional)</option>
            {tracks.map((trk) => (
              <option key={trk.id} value={trk.id}>
                {trk.name}
              </option>
            ))}
          </select> */}
        </div>

        <div className="mt-3 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            {isEditing ? "Update Subject" : "Add Subject"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(null);
                setFormData({
                  name: "",
                  system_id: "",
                  department_id: "",
                  track_id: "",
                });
              }}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ Subject List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">System</th>
              <th className="p-2 border">Department</th>
              {/* <th className="p-2 border">Track</th> */}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr key={subject.id} className="odd:bg-green-50">
                  <td className="p-2 border">{subject.name}</td>
                  <td className="p-2 border">{subject.system?.name || "-"}</td>
                  <td className="p-2 border">{subject.department?.name}</td>
                  {/* <td className="p-2 border">{subject.track?.name || "-"}</td> */}
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(subject)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
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
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
