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
    {
      id: 5,
      name: "Elon Musk",
      image: "https://i.postimg.cc/BbrC4BHV/download.jpg",
      feedback:
        "Impressive service! If every rental company worked this efficiently, transportation would be revolutionized.",
    },
    {
      id: 6,
      name: "Mark Zuckerberg",
      image: "https://i.postimg.cc/MZC4W76S/download-1.jpg",
      feedback:
        "Smooth experience from start to finish. The UI and overall service quality are absolutely top-notch.",
    },
    {
      id: 7,
      name: "Dr. Muhammad Yunus",
      image: "https://i.postimg.cc/gkbS9Gsy/download-2.jpg",
      feedback:
        "A reliable service that focuses on customer satisfaction. Great example of entrepreneurship with purpose.",
    },
    {
      id: 8,
      name: "Bill Gates",
      image: "https://i.postimg.cc/HnwtW7z1/download-3.jpg",
      feedback:
        "Very efficient and well-organized. The service quality reflects careful planning and innovation.",
    },
    {
      id: 9,
      name: "Sundar Pichai",
      image: "https://i.postimg.cc/DfrQXLQ3/images.jpg",
      feedback:
        "Clean interface, easy booking, and reliable cars. A premium and modern rental experience.",
    },
  ];

  return (
    <section className="py-16 bg-background px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">
          What Our Clients <span className="text-primary">Says</span>
        </h2>
        <div className="flex justify-center mt-3">
          <span className="w-16 h-0.5 bg-secondary"></span>
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
            <div className="bg-surface p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative text-center border border-border">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-text-secondary mb-6">{review.feedback}</p>
              <div className="flex flex-col items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-border mb-3"
                />
                <h3 className="font-semibold text-text-primary">
                  {review.name}
                </h3>
                <p className="text-secondary text-sm font-medium">Customer</p>
              </div>
              <Quote className="w-10 h-10 text-text-secondary opacity-20 absolute bottom-4 right-6" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
