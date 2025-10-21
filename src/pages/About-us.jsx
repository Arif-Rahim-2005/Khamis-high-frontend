import React, { useEffect, useState } from "react";
import aboutData from "../../about.json";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AboutUs() {
  const [data, setData] = useState(aboutData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newParagraph, setNewParagraph] = useState(data.paragraph);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/about/images`);
        setImages(res.data.images);
      } catch (err) {
        console.error("Error loading images:", err);
        alert("⚠️ Failed to load images.");
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const userData = await res.json();
        if (res.ok && userData.role?.toLowerCase() === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("User role check failed:", err);
      }
    };

    fetchImages();
    fetchUser();
  }, []);

  // ✅ Upload new image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/about/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await axios.get(`${BASE_URL}/about/images`);
      setImages(res.data.images);
      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload image.");
    }
  };

  // ✅ Delete image
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${BASE_URL}/about/image/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setImages((prev) => prev.filter((img) => img.id !== id));
      alert("🗑️ Image deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete image.");
    }
  };

  // ✅ Replace existing image
  const handleReplace = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.put(`${BASE_URL}/about/image/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await axios.get(`${BASE_URL}/about/images`);
      setImages(res.data.images);
      alert("🔁 Image replaced successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to replace image.");
    }
  };

  // ✅ Save About Us paragraph
  const handleSave = () => {
    setData({ ...data, paragraph: newParagraph });
    setEditing(false);
    alert("✅ About Us text updated!");
  };

  return (
    <>
      <Header />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>

        {editing ? (
          <textarea
            value={newParagraph}
            onChange={(e) => setNewParagraph(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows="6"
          />
        ) : (
          <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">
            {data.paragraph}
          </p>
        )}

        {/* ✅ Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images?.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={`${BASE_URL}${img.filepath || img}`}
                alt={`About ${i}`}
                className="rounded-lg shadow-md w-full object-cover"
              />

              {isAdmin && (
                <div className="flex justify-center gap-3 mt-2">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    🗑 Delete
                  </button>

                  <label className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer">
                    🔁 Replace
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleReplace(e, img.id)}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ Admin Controls */}
        {isAdmin && (
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Edit Text
              </button>
            )}

            <label className="bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer">
              Upload New Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
