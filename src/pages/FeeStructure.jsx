import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function FeeStructure() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null); // logged-in user

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      alert("❌ Could not verify user role.");
    }
  };

  // Fetch the current fee structure PDF
  const fetchFeeStructure = async () => {
    try {
      const res = await fetch(`${BASE_URL}/fee-structure`);
      const data = await res.json();
      if (res.ok || res.status === 200) {
        // Append timestamp to avoid iframe caching
        setPdfUrl(`${data.file_url}`);
      } else {
        setPdfUrl("");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to load fee structure.");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchFeeStructure();
  }, []);

  // Upload / replace PDF
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/fee-structure`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Fee structure updated!");
        fetchFeeStructure(); // refresh the iframe
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error uploading file.");
    }
  };

  return (
    <div className="p-6">
      <Header />
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📄 Fee Structure
      </h2>

      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          style={{
            maxWidth: "100%",
            overflow: "auto",
          }}
          className="w-full h-[70vh] md:h-[80vh] border rounded-md mb-4"
        />
      ) : (
        <p>No fee structure uploaded yet.</p>
      )}

      {/* Only show upload form if logged-in user is admin */}
      {user?.role === "Admin" && (
        <form onSubmit={handleUpload} className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded p-2 mr-2"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Replace PDF
          </button>
        </form>
      )}

      <Footer />
    </div>
  );
}
