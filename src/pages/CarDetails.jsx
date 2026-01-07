import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Card from "../components/Card";
import CarCard from "../components/CarCard";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rent-wheel-server-side-api.vercel.app/cars/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCar(data);

        // Fetch related cars (same category)
        if (data.category) {
          try {
            const allCarsResponse = await fetch(
              "https://rent-wheel-server-side-api.vercel.app/cars"
            );
            if (allCarsResponse.ok) {
              const allCars = await allCarsResponse.json();
              const related = allCars
                .filter(
                  (c) => c._id !== data._id && c.category === data.category
                )
                .slice(0, 4);
              setRelatedCars(related);
            }
          } catch (error) {
            console.error("Failed to fetch related cars:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch car:", error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Please login to book a car.");
      return navigate("/login");
    }

    try {
      setBookingLoading(true);
      const booking = {
        carId: car._id,
        carName: car.name,
        imageURL: car.image,
        rentPrice: car.rentPrice || car.pricePerDay || car.price,
        providerName: car.providerName,
        providerEmail: car.providerEmail,
        status: "Booked",
        date: new Date().toISOString(),
      };

      const res = await fetch(
        "https://rent-wheel-server-side-api.vercel.app/my-bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(booking),
        }
      );

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
    } finally {
      setBookingLoading(false);
    }
  };

  // Create multiple images array (simulate multiple images)
  const carImages = car
    ? [
        car.image,
        // Add more placeholder images for demo
        car.image,
        car.image,
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-neutral-200 dark:bg-neutral-700 rounded-xl h-96" />
              <div className="space-y-4">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-neutral-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.109M15 3H9a2 2 0 00-2 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 000 1.414l6.414 6.414a1 1 0 01.293.707V20a2 2 0 002 2h6a2 2 0 002-2v-1.586a1 1 0 01.293-.707l6.414-6.414a1 1 0 000-1.414L16.707 5.293A1 1 0 0016 4.586V3a2 2 0 00-2-2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Car Not Found
          </h2>
          <p className="text-text-secondary mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse">
            <Button variant="primary">Browse All Cars</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-text-secondary">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link to="/browse" className="hover:text-primary">
                Browse Cars
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="text-text-primary font-medium">{car.name}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card padding="none" className="overflow-hidden">
                {/* Main Image */}
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={carImages[selectedImageIndex]}
                    alt={car.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    ${car.rentPrice || car.pricePerDay || car.price}/day
                  </div>
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      car.status === "Available"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {car.status || "Available"}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {carImages.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {carImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index
                            ? "border-primary"
                            : "border-transparent hover:border-border"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${car.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Car Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h1 className="text-3xl font-bold text-text-primary mb-4">
                  {car.name}
                </h1>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {car.description ||
                    "Experience the perfect blend of comfort, style, and performance with this exceptional vehicle. Ideal for both city driving and long-distance journeys."}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <div className="text-sm font-medium text-text-primary">
                      {car.category}
                    </div>
                    <div className="text-xs text-text-secondary">Category</div>
                  </div>

                  <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="text-sm font-medium text-text-primary">
                      {car.location || "City Center"}
                    </div>
                    <div className="text-xs text-text-secondary">Location</div>
                  </div>

                  <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div className="text-sm font-medium text-text-primary">
                      {car.providerName}
                    </div>
                    <div className="text-xs text-text-secondary">Owner</div>
                  </div>

                  <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div className="text-sm font-medium text-text-primary">
                      Verified
                    </div>
                    <div className="text-xs text-text-secondary">Status</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Specifications & Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-text-primary mb-3">
                      Vehicle Details
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex justify-between">
                        <span>Fuel Type:</span>
                        <span className="text-text-primary">Gasoline</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Transmission:</span>
                        <span className="text-text-primary">Automatic</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Seats:</span>
                        <span className="text-text-primary">5 Passengers</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mileage:</span>
                        <span className="text-text-primary">Unlimited</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-3">
                      Rental Rules
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Minimum age: 21 years</li>
                      <li>• Valid driver's license required</li>
                      <li>• No smoking in vehicle</li>
                      <li>• Return with same fuel level</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-8"
            >
              <Card>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${car.rentPrice || car.pricePerDay || car.price}
                    <span className="text-lg font-normal text-text-secondary">
                      /day
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Best price guaranteed
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Daily Rate:</span>
                    <span className="font-medium text-text-primary">
                      ${car.rentPrice || car.pricePerDay || car.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Insurance:</span>
                    <span className="font-medium text-text-primary">
                      Included
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">24/7 Support:</span>
                    <span className="font-medium text-text-primary">
                      Included
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total (1 day):</span>
                    <span className="text-primary">
                      ${car.rentPrice || car.pricePerDay || car.price}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  loading={bookingLoading}
                  disabled={car.status === "Booked"}
                  className="w-full"
                  size="lg"
                >
                  {car.status === "Booked"
                    ? "Currently Unavailable"
                    : "Book Now"}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-text-secondary">
                    Free cancellation up to 24 hours before pickup
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Similar Cars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar._id} car={relatedCar} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
