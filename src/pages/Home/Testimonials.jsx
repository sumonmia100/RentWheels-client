import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "MD Sumon Mia",
      image:
        "https://i.postimg.cc/C521Zh7c/Whats-App-Image-2025-11-13-at-16-01-22-dc49fb56.jpg",
      feedback:
        "The booking process was super easy and transparent. Loved the Tesla Model 3 ride experience!",
    },
    {
      id: 2,
      name: "Arifa Khatun",
      image:
        "https://i.postimg.cc/HLmL8Pwz/Whats-App-Image-2025-11-13-at-16-01-19-1ea44afd.jpg",
      feedback:
        "Affordable rates and very friendly service. I’ll definitely rent again from here.",
    },
    {
      id: 3,
      name: "Khokon Mia",
      image:
        "https://i.postimg.cc/w3Kz87FQ/Whats-App-Image-2025-11-13-at-16-01-20-169d86e4.jpg",
      feedback:
        "The customer support was excellent. They guided me throughout my first car rental experience.",
    },
    {
      id: 4,
      name: "Shahadat Hossien",
      image:
        "https://i.postimg.cc/Y0F9WcsJ/566316146-1341965524268042-5423080765097913427-n.jpg",
      feedback:
        "The booking process was super easy and quick. The car was clean, well-maintained, and exactly as described. Highly recommend RentWheels!",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-white px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
          What Our Clients <span className="text-indigo-600">Says</span>
        </h2>
        <div className="flex justify-center mt-3">
          <span className="w-16 h-[2px] bg-red-500"></span>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">{review.feedback}</p>
              <div className="flex flex-col items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 mb-3"
                />
                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                <p className="text-red-500 text-sm font-medium">Customer</p>
              </div>
              <Quote className="w-10 h-10 text-red-200 absolute bottom-4 right-6" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
