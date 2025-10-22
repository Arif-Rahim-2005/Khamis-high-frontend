import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import emailjs from "emailjs-com";

const Contacts = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          formRef.current.reset();
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          console.error(error.text);
          setStatus("error");
          setTimeout(() => setStatus(""), 4000);
        }
      );
  };
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] bg-black/90 flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img
            src="./Photos/contact-bg.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Whether you’re a student, parent, or guest — we’d love to hear from
            you.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          Contact Us
        </h2>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300"
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "✅ Message Sent!"
                : status === "error"
                ? "❌ Try Again"
                : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-16 text-center text-gray-700">
          <p className="font-semibold text-lg">Khamis High School</p>
          <button
            className="text-sm hover:underline"
            onClick={() => {
              window.open(
                "https://www.google.com/maps/place/Khamis+High+School/@-4.0367878,39.6655004,21z/data=!4m14!1m7!3m6!1s0x184012bb606b45f9:0x7005df7c181e532c!2sKhamis+High+School!8m2!3d-4.0366647!4d39.6656861!16s%2Fg%2F1pyqsnm54!3m5!1s0x184012bb606b45f9:0x7005df7c181e532c!8m2!3d-4.0366647!4d39.6656861!16s%2Fg%2F1pyqsnm54?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              );
            }}
          >
            <p>Along Mombasa Road, Kenya (Click to view in maps)</p>
          </button>
          <p>Email: Khamishigh@yahoo.com</p>
          <p>Phone: +254 0203590180</p>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Contacts;
