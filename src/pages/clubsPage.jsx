import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_URL;

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/clubs`);
      const data = await res.json();
      console.log(data)
      setClubs(data);
    } catch (err) {
      console.error("Error fetching clubs:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src="./Photos/clubs.jpg"
          alt="Clubs and Societies"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Clubs & Societies
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-center">
            Where passions come alive — leadership, creativity, and teamwork.
          </p>
        </div>
      </div>

      <section className="py-12 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          Our Clubs and Societies
        </h2>

        <div className="space-y-10">
          {clubs.length > 0 ? (
            clubs.map((club, index) => {
              const isImageLeft = index % 2 === 0;
              return (
                <div
                  key={club.id}
                  className={`flex flex-col md:flex-row items-center gap-6  overflow-hidden ${
                    !isImageLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  {club.image_path ? (
                    <img
                      src={`${BASE_URL}${club.image_path}`}
                      alt={club.name}
                      className="w-full md:w-1/2 h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* Text */}
                  <div className="md:w-1/2 p-6 text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-3 border-b-2 border-green-700">
                      {club.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {club.description || "No description available."}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 italic">
              No clubs available yet.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Clubs;
