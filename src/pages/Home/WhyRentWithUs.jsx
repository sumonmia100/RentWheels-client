import React from "react";
import { Clock, Wallet, ThumbsUp, Headphones } from "lucide-react";

const WhyRentWithUs = () => {
  const benefits = [
    {
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: "Easy Booking",
      desc: "Book your favorite car in just a few clicks. Hassle-free and convenient experience every time.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-indigo-600" />,
      title: "Affordable Rates",
      desc: "Get the best prices with no hidden fees. Drive your dream car within your budget.",
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-indigo-600" />,
      title: "Trusted Providers",
      desc: "All our cars are from verified and trusted providers ensuring quality and safety.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-indigo-600" />,
      title: "24/7 Support",
      desc: "Our support team is available round the clock to assist you with any queries.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-indigo-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Rent <span className="text-indigo-600">With Us</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Experience convenience, affordability, and reliability — all in one
          place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyRentWithUs;
