import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import CarCard from "../../components/CarCard";
import Input from "../../components/Input";
import Button from "../../components/Button";

const FeaturedCars = () => {
  const cars = useLoaderData() || []; // loaded from server with fallback
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter cars by name, category, or providerName
  const filteredCars = cars.filter((car) =>
    [car.name, car.category, car.providerName]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Show loading cards when no data
  const showLoadingCards = cars.length === 0;
  const loadingCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Cars
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Discover our handpicked selection of premium vehicles from trusted
            local owners
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search by name, category, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center"
            />
          </div>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {showLoadingCards ? (
            // Show loading skeleton cards
            loadingCards.map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CarCard loading={true} />
              </motion.div>
            ))
          ) : filteredCars.length > 0 ? (
            // Show actual cars
            filteredCars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CarCard car={car} />
              </motion.div>
            ))
          ) : (
            // No results found
            <div className="col-span-full text-center py-12">
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
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No cars found
              </h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search terms or browse all available cars
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </motion.div>

        {/* View All Cars Button */}
        {!showLoadingCards && cars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/browse")}
            >
              View All Cars
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
