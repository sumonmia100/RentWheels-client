import React from 'react';
import { Link, useLoaderData } from 'react-router';

const FeaturedCars = () => {
    const cars = useLoaderData();
 

    return (
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-gray-600">Type: {car.category}</p>
            <p className="text-gray-800 font-medium">
              ${car.pricePerDay} / day
            </p>
            <p className="text-gray-500 text-sm">
              Provider: {car.providerName}
            </p>
            <Link
              to={`/cars/${car._id}`}
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    );
};

export default FeaturedCars;