import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
const auth = getAuth()
const BrowseCars = ({_id}) => {
  const [cars, setCars] = useState([]);
  


  const navigate = useNavigate();
  const user = auth.currentUser;
  const handleClick = () =>{
    if(user){
        navigate(`/cars/${_id}`);
    }
    else{
        navigate("/login")
    };
  };

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
       
      })
      .catch((err) => {
        console.error("Failed to load cars:", err);
       
      })
      
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-14 px-6 md:px-12">
      <div className="text-center mb-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🚘 Browse All Cars
        </motion.h2>
        <p className="text-gray-600 mt-3">
          Discover cars from all providers — available for rent right now!
        </p>
      </div>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {cars.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No cars available right now.
          </div>
        ) : (
          cars.map((car) => (
            <motion.div
              key={car._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-56 w-full object-cover"
                />
                <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 text-sm rounded-full shadow">
                  ${car.rentPrice}/day
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {car.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {car.description?.slice(0, 70)}...
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {car.category}
                  </span>
                  <span>👤 {car.providerName || "Unknown"}</span>
                </div>

                <Link onClick={handleClick}
                  to={`/cars/${car._id}`}
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
};

export default BrowseCars;
