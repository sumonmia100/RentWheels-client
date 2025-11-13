import React from "react";
import { Star } from "lucide-react";

const TopRatedCars = () => {
  const cars = [
    {
      id: 1,
      name: "Tesla Model 3",
      image: "https://i.postimg.cc/0Q1tnbH5/download-4.jpg",
      rating: 4.9,
      price: 150,
      type: "Electric",
    },
    {
      id: 2,
      name: "Toyota Corolla X",
      image: "https://i.postimg.cc/j2d43N6x/images.jpg",
      rating: 4.8,
      price: 50,
      type: "Sedan",
    },
    {
      id: 3,
      name: "BMW X5",
      image: "https://i.postimg.cc/RhQ2KcS0/download-3.jpg",
      rating: 4.7,
      price: 120,
      type: "SUV",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Top Rated <span className="text-indigo-600">Cars</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Check out the most popular cars loved by our customers!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {car.name}
              </h3>
              <p className="text-sm text-gray-500">{car.type}</p>
              <div className="flex justify-center items-center gap-1 mt-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{car.rating}</span>
              </div>
              <p className="mt-3 text-indigo-600 font-semibold">
                ${car.price}/day
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedCars;
