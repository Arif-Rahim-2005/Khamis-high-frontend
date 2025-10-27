import "./App.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  EffectCube,
  EffectFlip,
} from "swiper/modules";
import { useState, useEffect } from "react";
import Footer from "./components/Footer.jsx";
import { User } from "lucide-react";
import LoginModal from "./components/loginform.jsx";
import SignUpModal from "./components/Signupform.jsx";
import AdminBelt from "./components/AlumniBelt.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.user || data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-green-700 text-white shadow-md relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="./Photos/image.png"
            alt="Khamis High badge"
            className="w-12 h-12"
          />
          <Link
            to="/"
            className="text-xl md:text-2xl font-semibold tracking-wide"
          >
            Khamis High School
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-light items-center">
          {user && user.role === "Admin" && (
            <Link to="/adminpanel" className="hover:underline">
              Admin Panel
            </Link>
          )}
          <Link to="/academics" className="hover:underline">
            Academics
          </Link>
          <Link to="/fee" className="hover:underline">
            Fee Structure
          </Link>
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link to="/contacts" className="hover:underline">
            Contacts
          </Link>
          <Link to="/clubs" className="hover:underline">
            Clubs and Societies
          </Link>
          {/* Profile Icon */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="ml-2 hover:scale-110 transition-transform duration-300 focus:outline-none"
            >
              <User className="w-8 h-8 text-white hover:text-yellow-300 transition-colors duration-300 pt-2" />
            </button>
          {/* dropdown menu */}
            {isDropdownOpen && (
              <>
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowSignup(true)}
                  >
                    Signup
                  </button>
                </div>

                {showLogin && (
                  <LoginModal onClose={() => setShowLogin(false)} />
                )}
                {showSignup && (
                  <SignUpModal onClose={() => setShowSignup(false)} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Profile Icon */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="ml-2 hover:scale-110 transition-transform duration-300 focus:outline-none"
            >
              <User className="w-10 h-10 text-white hover:text-yellow-300 transition-colors duration-300 pt-2" />
            </button>

             {/* Dropdown Menu  */}
            {isDropdownOpen && (
              <>
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowSignup(true)}
                  >
                    Signup
                  </button>
                </div>

                {showLogin && (
                  <LoginModal onClose={() => setShowLogin(false)} />
                )}
                {showSignup && (
                  <SignUpModal onClose={() => setShowSignup(false)} />
                )}
              </>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute right-0 top-full  bg-green-700 border-t border-white shadow-lg z-50">
            {user && user.role === "Admin" && (
              <Link to="/adminpanel" className="hover:underline">
                Admin Panel
              </Link>
            )}
            <Link
              to="/academics"
              className="block px-6 py-3 hover:bg-green-600 border-b border-white"
            >
              Academics
            </Link>
            <Link
              to="/fee"
              className="hover:underline block px-6 py-3 hover:bg-green-600 border-b border-white"
            >
              Fee Structure
            </Link>
            <Link
              to="/about-us"
              className="block px-6 py-3 hover:bg-green-600 border-b border-white"
            >
              About Us
            </Link>
            <Link
              to="/contacts"
              className="block px-6 py-3 hover:bg-green-600 border-b border-white"
            >
              Contacts
            </Link>
            <Link to="/clubs" className="block px-6 py-3 hover:bg-green-600">
              Clubs and Societies
            </Link>
          </div>
        )}
      </nav>

      {/* HERO */}

      {/* Main */}
      <main>
        <div>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            effect="fade"
            autoplay={{ delay: 5000 }}
            loop
            pagination={{ clickable: true }}
            navigation
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="h-100 md:h-170 w-full mx-auto mb-4 rounded-lg shadow-lg"
          >
            <SwiperSlide>
              <img
                className="h-full w-full object-cover"
                src="./Photos/Slideshow/image1.png"
                alt={`Slideshow image`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover"
                src="./Photos/Slideshow/image2.png"
                alt={`Slideshow image`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover"
                src="./Photos/Slideshow/image3.png"
                alt={`Slideshow image`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover"
                src="./Photos/Slideshow/image4.png"
                alt={`Slideshow image`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover"
                src="./Photos/Slideshow/image5.png"
                alt={`Slideshow image`}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <section className="relative bg-green-700 h-[70vh] md:h-[80vh] flex items-center justify-center text-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[url('./Photos/logo.png')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-green-800/60"></div>

          {/* Content */}
          <div className="relative z-10 px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to{" "}
              <span className="text-[#e0dac8]">Khamis High School</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              Nurturing bright minds with excellence, discipline, and a vision
              for the future.
            </p>
          </div>
        </section>

        {/* cards */}
        <div className="bg-gradient-to-b from-white to-gray-200">
          <div>
            {/* Info Cards Section */}
            <section className=" py-16 px-6 md:px-12 text-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-6xl mx-auto ">
                {/* Card 1 */}
                <div className="flex flex-col md:flex-col items-center shadow-lg overflow-hidden max-h-fit transition-all hover:scale-[1.02] duration-300 ease-in-out">
                  <div className="flex flex-col md:flex-column items-center shadow-lg overflow-hidden">
                    <img
                      src="./Photos/academics.jpg"
                      alt="Academics"
                      className="w-full md:max-w-fit h-64 object-cover"
                    />
                    <div className="p-6 md:max-w-fit ">
                      <h3 className="text-2xl font-semibold text-green-700 mb-4">
                        Academic Excellence
                      </h3>
                      <p className="leading-relaxed">
                        We focus on discipline, mentorship, and modern learning
                        methods to empower students for top performance in KCSE
                        and beyond.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col md:flex-column items-center shadow-lg overflow-hidden max-h-fit transition-all hover:scale-[1.02] duration-300 ease-in-out ">
                  <img
                    src="./Photos/equipment.jpg"
                    alt="Facilities"
                    className="w-full md:w-max-fit h-64 object-cover"
                  />
                  <div className="p-6 md:w-max-fit">
                    <h3 className="text-2xl font-semibold text-green-700 mb-4">
                      Modern Facilities
                    </h3>
                    <p className="leading-relaxed">
                      Our labs, library, and ICT center provide an environment
                      that supports hands-on learning and innovation.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col md:flex-col items-center shadow-lg overflow-hidden max-h-fit transition-all hover:scale-[1.02] duration-300 ease-in-out">
                  <img
                    src="./Photos/Slideshow/image3.png"
                    alt="Mentorship"
                    className="w-full md:w-max-fit h-64 object-cover"
                  />
                  <div className="p-6 md:w-max-fit">
                    <h3 className="text-2xl font-semibold text-green-700 mb-4">
                      Strong Mentorship
                    </h3>
                    <p className=" leading-relaxed">
                      Students benefit from guidance programs that nurture
                      leadership, personal growth, and career readiness.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <AdminBelt />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
