import "./App.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";

function App() {
  return (
    <>
      <nav className="flex flex-row bg-green-700 text-white p-4 justify-between items-center">
        <div className="flex-1/3 flex flex-row gap-1.5">
          <div className="w-16 h-16 flex justify-center items-center">
            <img src="./Photos/image.png" alt="Khamis High badge" />
          </div>
          <div className="flex flex-col justify-center items-start text-3xl font-bold">
            <h3>Khamis High School</h3>
          </div>
        </div>
        <div className="flex flex-row gap-12 text-2xl font-semibold">
          <div>
            <Link to="/academics">
              <p>Academics</p>
            </Link>
          </div>
          <div>
            <Link to="/about-us">
              <p>About us</p>
            </Link>
          </div>
          <div>
            <Link to="/contacts">
              <p>Contacts</p>
            </Link>
          </div>
          {/* <div>
            <p>more...</p>
          </div> */}
        </div>
      </nav>
      <main>
        <div>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop
            pagination={{ clickable: true }}
            navigation
            modules={[Autoplay, Pagination, Navigation]}
            className="h-100 md:h-196 w-full mx-auto my-4 rounded-lg shadow-lg"
          >
            <SwiperSlide>
              <img className="h-full w-full object-cover"
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
      </main>
      <footer></footer>
    </>
  );
}

export default App;
