import { useLoaderData, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

const FeaturedCars = () => {
  const cars = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (id) => {
    if (user) {
      navigate(`/cars/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <span className="absolute top-3 right-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
              ${car.pricePerDay}/day
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
          <p className="text-gray-600 mt-1">Type: {car.category}</p>
          <p className="text-gray-800 font-medium mt-1">
            Provider: {car.providerName}
          </p>
          <p
            className={`text-sm font-semibold mt-2 ${
              car.status === "Available" ? "text-green-600" : "text-red-500"
            }`}
          >
            Status: {car.status || "Available"}
          </p>

          <button
            onClick={() => handleClick(car._id)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
          >
            View Details 🚗
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCars;
