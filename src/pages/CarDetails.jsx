import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rent-wheel-server-side.vercel.app/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch car:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Please login to book a car.");
      return navigate("/login");
    }

    try {
      const booking = {
        carId: car._id,
        carName: car.name,
        imageURL: car.image,
        // userEmail: localStorage.getItem("user-email"),
        rentPrice: car.rentPrice,
        providerName: car.providerName,
        providerEmail: car.providerEmail,
        status: "Booked",
        date: new Date().toISOString(),
      };

      const res = await fetch("https://rent-wheel-server-side.vercel.app/my-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      if (res.status === 403 || res.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("access-token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success("Car booked successfully!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Failed to book this car.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <span className="text-blue-600 text-lg font-semibold animate-pulse">
          Loading car details...
        </span>
      </div>
    );

  if (!car)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600 text-lg">Car not found.</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full shadow">
              ${car.rentPrice}/day
            </span>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {car.name}
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {car.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-2">
                <div className="bg-gray-100 rounded-lg p-3">
                  <span className="block font-semibold text-gray-800">
                    Category
                  </span>
                  <span>{car.category}</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <span className="block font-semibold text-gray-800">
                    Location
                  </span>
                  <span>{car.location}</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <span className="block font-semibold text-gray-800">
                    Provider
                  </span>
                  <span>{car.providerName}</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <span className="block font-semibold text-gray-800">
                    Provider Email
                  </span>
                  <span>{car.providerEmail}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="mt-4 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Book Now 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
