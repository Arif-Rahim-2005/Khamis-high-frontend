import React from "react";
import Header from "../components/Header";


const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-2">
          Welcome to Khamis High School! We are committed to providing quality
          education and fostering a supportive learning environment for our
          students.
        </p>
      </div>
    </>
  );
};
export default AboutUs;
