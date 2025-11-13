import { useState } from "react";
import { useLoaderData } from "react-router";

const CarSearch = () => {
  const cars = useLoaderData(); // from server loader
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cars based on name or category
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/*  Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search cars by name , brand or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Display Filtered Cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
              <p className="text-gray-600">Category: {car.category}</p>
              <p className="text-blue-600 font-semibold">
                ${car.pricePerDay} / day
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Provider: {car.providerName}
              </p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cars found matching your search 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
