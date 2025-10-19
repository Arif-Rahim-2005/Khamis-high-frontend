import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
const getDeptColor = (deptName = "") => {
  const name = deptName.toLowerCase();
  if (name.includes("science") || name.includes("stem")) return "green";
  if (name.includes("human") || name.includes("social")) return "amber";
  if (name.includes("technical") || name.includes("art")) return "blue";
  return "gray"; // fallback
};
const colorClasses = {
  green: { bg: "bg-green-50", text: "text-green-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-700" },
  gray: { bg: "bg-gray-50", text: "text-gray-700" },
};





const BASE_URL = import.meta.env.VITE_API_URL;

const Academics = () => {
  const [systems, setSystems] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selections, setSelections] = useState([]);
  const [activeSystem, setActiveSystem] = useState(null);

  useEffect(() => {
    fetchSystems();
    fetchSubjects();
    fetchSelections();
  }, []);

  const fetchSystems = async () => {
    try {
      const res = await fetch(`${BASE_URL}/systems`);
      const data = await res.json();
      setSystems(data);
      if (data.length > 0) setActiveSystem(data[0].id);
    } catch (err) {
      console.error("Error fetching systems:", err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/subjects`);
      console.log("Subjects for this system:", subjects);

      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const fetchSelections = async () => {
    try {
      const res = await fetch(`${BASE_URL}/subject-selections`);
      const data = await res.json();
      setSelections(data);
    } catch (err) {
      console.error("Error fetching selections:", err);
    }
  };

  const filteredSubjects = subjects.filter(
    (sub) => sub.system.id === activeSystem
  );
const filteredSelections = selections.filter(
  (sel) => sel.system && sel.system.id === activeSystem
  
);


  return (
    <>
      <Header />
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="./Photos/books2.jpg"
          alt="Khamis High School Campus"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4">
            Academic Excellence
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Building minds, shaping futures — one lesson at a time.
          </p>
        </div>
      </div>
      <section className="py-12 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Academic Overview
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          At Khamis High School, we are committed to nurturing both intellect
          and character. Our academic programs are built upon discipline,
          curiosity, and moral excellence. We believe in empowering every
          learner to reach their fullest potential — in the classroom and
          beyond.
        </p>
      </section>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🎓 Academics</h2>

        {/* System Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {systems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => setActiveSystem(sys.id)}
              className={`px-4 py-2 rounded-md border ${
                activeSystem === sys.id
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-green-100"
              }`}
            >
              {sys.name}
            </button>
          ))}
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto mb-8">
          <h3 className="text-xl font-semibold mb-2 text-green-700">
            Subjects under{" "}
            {systems.find((sub) => sub.id === activeSystem)?.name}
          </h3>
          <table className="min-w-full border border-green-300 rounded-md">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub) => (
                  <tr key={sub.id} className="odd:bg-green-50">
                    <td className="p-2 border">{sub.department.name || "-"}</td>
                    <td className="p-2 border">{sub.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 text-center text-gray-500 italic"
                  >
                    No subjects available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Subject Selections */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-700">
            Available Subject Selections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSelections.length > 0 ? (
              filteredSelections.map((sel) => {
                const colorClasses = {
                  green: { bg: "bg-green-50", text: "text-green-700" },
                  amber: { bg: "bg-amber-50", text: "text-amber-700" },
                  blue: { bg: "bg-blue-50", text: "text-blue-700" },
                  gray: { bg: "bg-gray-50", text: "text-gray-700" },
                };

                const color = getDeptColor(sel.department?.name);
                const classes = colorClasses[color] || colorClasses.gray;

                return (
                  <div key={sel.id}>
                    <h3
                      className={`text-xl font-semibold mb-3 ${classes.text} `}
                    >
                      {sel.department.name}
                    </h3>
                    {(() => {
                      const color = getDeptColor(sel.department?.name);
                      return (
                        <div
                          className={`border rounded-md p-4 shadow-sm ${classes.bg}`}
                        >
                          <h4 className={`font-bold ${classes.text}`}>
                            {sel.name}
                          </h4>
                          <h4 className={`font-bold ${classes.text}`}>
                            {sel.track.name}
                          </h4>
                          <p className="text-gray-700 text-sm mt-1">
                            {Array.isArray(sel.subjects)
                              ? sel.subjects.join(", ")
                              : sel.subjects}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic col-span-full">
                No selections found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Academics;
