import { useEffect, useState } from "react";
import axios from "axios";

export default function AlumniBelt() {
  const [alumni, setAlumni] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/alumni`)
      .then((res) => setAlumni(res.data.alumni || []))
      .catch((err) => console.error("Error fetching alumni:", err));
    console.log(alumni);
  }, []);

  return (
    <div className="w-full bg-orange-100 py-8 px-8 overflow-hidden">
      <h2 className="text-center text-2xl font-bold text-green-700 mb-6">
        🎓 Our Alumni
      </h2>

      <div className="relative flex overflow-x-hidden">
        {/* duplicated row for infinite loop */}
        <div className="flex animate-belt space-x-60">
          {alumni.concat(alumni).map((a, i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0 ">
              <img
                src={`${a.image_path}`}
                alt={a.name}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <p className="text-3xl mt-2 text-black font-serif">{a.name}</p>
              <p className="text-xl mt-2 text-black font-sans">
                {a.current_title}
              </p>
              <p className="text-xl mt-2 text-black font-sans">
                {a.year_of_completion}
              </p>
              <p className="text-xl mt-2 text-black font-sans">{a.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
