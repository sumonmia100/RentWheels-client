import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Card from "./Card";
import Button from "./Button";

const CarCard = ({ car, loading = false }) => {
  const { user } = useContext(AuthContext);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="aspect-w-16 aspect-h-9 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-4 h-48" />
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
        </div>
      </Card>
    );
  }

  const handleViewDetails = () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
  };

  return (
    <Card hover className="group h-full flex flex-col">
      {/* Car Image */}
      <div className="relative aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
          ${car.pricePerDay || car.price}/day
        </div>
        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${
            car.status === "Available"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {car.status || "Available"}
        </div>
      </div>

      {/* Car Details */}
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
            {car.name}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-neutral-400"
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
            <span>{car.category}</span>
          </div>

          {car.providerName && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-neutral-400"
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
              <span>{car.providerName}</span>
            </div>
          )}

          {car.location && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-neutral-400"
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
              <span>{car.location}</span>
            </div>
          )}

          {car.rating && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-yellow-600 font-medium">{car.rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {car.description && (
          <p className="text-text-secondary text-sm line-clamp-2">
            {car.description}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-border">
        {user ? (
          <Link to={`/cars/${car._id}`} className="block">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
        ) : (
          <Link to="/login" className="block">
            <Button variant="outline" className="w-full">
              Login to View
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default CarCard;
