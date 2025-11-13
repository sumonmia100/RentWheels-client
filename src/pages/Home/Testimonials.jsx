import React from "react";
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
    <section className="py-16 bg-gradient-to from-indigo-50 to-white px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Our <span className="text-indigo-600">Customers Say</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Real experiences from real users who loved our service.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative"
          >
            <Quote className="w-10 h-10 text-indigo-200 absolute top-4 right-4" />
            <div className="flex flex-col items-center text-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-50 h-50 rounded-full object-cover mb-4 border-4 border-indigo-100"
              />
              <h3 className="font-semibold text-gray-800">{review.name}</h3>
              <p className="text-gray-600 text-sm mt-3">{review.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
