import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const FeaturedCarSearch = () => {
  const cars = useLoaderData(); // loaded from server
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //  Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //  Filter cars by name, category, or providerName
  const filteredCars = cars.filter((car) =>
    [car.name, car.category, car.providerName]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Navigate to details or login
  const handleClick = (id) => {
    if (user) {
      navigate(`/cars/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Find Your Perfect Car
        </h2>
        <input
          type="text"
          placeholder="Search by name, category, or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/*  Featured / Filtered Cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition-all duration-300"
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

              <h3 className="text-xl font-semibold text-gray-800">
                {car.name}
              </h3>
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
                View Details 
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cars found matching your search 
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCarSearch;
