import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:5000/api

export default function AlumniManager() {
  const [alumni, setAlumni] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    current_title: "",
    year_of_completion: "",
    comment: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Endpoints
  const ALUMNI_URL = `${BASE_URL}/alumni`;

  // ✅ Fetch Alumni
  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await fetch(ALUMNI_URL);
      const data = await res.json();
      setAlumni(data.alumni || []);
    } catch (err) {
      alert("⚠️ Failed to fetch alumni");
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Add or Update Alumni
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.comment) {
      alert("⚠️ Name and Comment are required!");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("current_title", formData.current_title);
    form.append("year_of_completion", formData.year_of_completion);
    form.append("comment", formData.comment);
    if (formData.image) form.append("image", formData.image);

    const url = isEditing ? `${ALUMNI_URL}/${isEditing}` : ALUMNI_URL;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        alert(isEditing ? "✅ Alumni updated!" : "✅ Alumni added!");
        resetForm();
        fetchAlumni();
      } else {
        alert(`❌ ${data.message || "Failed to save alumni"}`);
      }
    } catch (err) {
      alert("❌ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Alumni
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alumni?")) return;

    try {
      const res = await fetch(`${ALUMNI_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("🗑️ Alumni deleted!");
        fetchAlumni();
      } else {
        alert(`❌ ${data.message || "Failed to delete."}`);
      }
    } catch (err) {
      alert("❌ Server error while deleting.");
    }
  };

  // ✅ Start Editing
  const startEdit = (item) => {
    setIsEditing(item.id);
    setFormData({
      name: item.name,
      current_title: item.current_title || "",
      year_of_completion: item.year_of_completion || "",
      comment: item.comment || "",
      image: null,
    });
  };

  // ✅ Reset Form
  const resetForm = () => {
    setIsEditing(null);
    setFormData({
      name: "",
      current_title: "",
      year_of_completion: "",
      comment: "",
      image: null,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🎓 Manage Alumni
      </h2>

      {/* ✅ Add/Edit Alumni Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
            required
          />

          <input
            type="text"
            name="current_title"
            placeholder="Current Title (e.g., Engineer at X)"
            value={formData.current_title}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          />

          <input
            type="text"
            name="year_of_completion"
            placeholder="Year of Completion"
            value={formData.year_of_completion}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          />
        </div>

        <textarea
          name="comment"
          placeholder="Comment about the school"
          value={formData.comment}
          onChange={handleChange}
          className="border border-green-300 rounded p-2 w-full mt-3"
          rows="3"
          required
        />

        <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-green-300 p-2 rounded w-full md:w-1/2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            {isEditing ? "Update Alumni" : "Add Alumni"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ Alumni Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Current Title</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.length > 0 ? (
              alumni.map((item) => (
                <tr key={item.id} className="odd:bg-green-50">
                  <td className="p-2 border text-center">
                    {item.image_path ? (
                      <img
                        src={`${item.image_path}`}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.current_title || "-"}</td>
                  <td className="p-2 border">
                    {item.year_of_completion || "-"}
                  </td>
                  <td className="p-2 border text-sm text-gray-700 max-w-xs">
                    {item.comment}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-3 text-center text-gray-500 italic"
                >
                  No alumni found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
