import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Academics = () => {
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

      <Footer />
    </>
  );
};
export default Academics;
