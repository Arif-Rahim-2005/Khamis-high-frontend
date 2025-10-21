import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. http://127.0.0.1:5000/api

export default function ClubsDropdown() {
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLUBS_URL = `${BASE_URL}/clubs`;

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await fetch(CLUBS_URL);
      const data = await res.json();
      setClubs(data);
    } catch (err) {
      alert("⚠️ Failed to fetch clubs");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("⚠️ Name is required!");
      return;
    }

    setLoading(true);

    const url = isEditing ? `${CLUBS_URL}/${isEditing}` : CLUBS_URL;
    const method = isEditing ? "PATCH" : "POST";

    const body = new FormData();
    body.append("name", formData.name);
    body.append("description", formData.description || "");
    if (formData.image) body.append("image", formData.image);

    try {
      const res = await fetch(url, { method, body });
      const data = await res.json();

      if (res.ok) {
        alert(isEditing ? "✅ Club updated!" : "✅ Club added!");
        setFormData({ name: "", description: "", image: null });
        setIsEditing(null);
        fetchClubs();
      } else {
        alert(`❌ ${data.message || "Error saving club."}`);
      }
    } catch (err) {
      alert("❌ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    try {
      const res = await fetch(`${CLUBS_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        alert("🗑️ Club deleted!");
        fetchClubs();
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("❌ Server error while deleting.");
    }
  };

  const startEdit = (club) => {
    setIsEditing(club.id);
    setFormData({
      name: club.name,
      description: club.description || "",
      image: null,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🎯 Manage Clubs & Societies
      </h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 border border-green-300 p-4 rounded-md shadow-sm mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Club Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-green-300 focus:ring-2 focus:ring-green-400 rounded p-2 w-full"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-green-300 rounded p-2 w-full"
          />
        </div>

        <div className="mt-3 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            {isEditing ? "Update Club" : "Add Club"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(null);
                setFormData({ name: "", description: "", image: null });
              }}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Club List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-green-300 rounded-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <tr key={club.id} className="odd:bg-green-50">
                  <td className="p-2 border">{club.name}</td>
                  <td className="p-2 border">{club.description || "-"}</td>
                  <td className="p-2 border">
                    {club.image_path ? (
                      <img
                        src={`${BASE_URL}${club.image_path}`}
                        alt={club.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2 border">
                    {club.created_at
                      ? new Date(club.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => startEdit(club)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(club.id)}
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
                  No clubs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
