import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router";
import CarCard from "../components/CarCard";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [searchParams] = useSearchParams();

  // Get category from URL params if available
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://rent-wheel-server-side-api.vercel.app/cars"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to load cars:", error);
        // Fallback to empty array on error
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter and sort cars
  const filteredAndSortedCars = cars
    .filter((car) => {
      const matchesSearch = [
        car.name,
        car.category,
        car.providerName,
        car.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        car.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPrice =
        !priceRange ||
        (() => {
          const price = car.rentPrice || car.pricePerDay || car.price || 0;
          switch (priceRange) {
            case "0-50":
              return price <= 50;
            case "51-100":
              return price > 50 && price <= 100;
            case "101-200":
              return price > 100 && price <= 200;
            case "200+":
              return price > 200;
            default:
              return true;
          }
        })();

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            (a.rentPrice || a.pricePerDay || a.price || 0) -
            (b.rentPrice || b.pricePerDay || b.price || 0)
          );
        case "price-high":
          return (
            (b.rentPrice || b.pricePerDay || b.price || 0) -
            (a.rentPrice || a.pricePerDay || a.price || 0)
          );
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const categories = ["Economy", "Luxury", "SUV", "Sports", "Electric", "Van"];
  const priceRanges = [
    { value: "", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "51-100", label: "$51 - $100" },
    { value: "101-200", label: "$101 - $200" },
    { value: "200+", label: "$200+" },
  ];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange("");
    setSortBy("name");
  };

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Browse All Cars
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover the perfect vehicle for your journey from our extensive
            collection of verified cars
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div>
                <Input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Summary & Clear */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-text-secondary">
                {loading
                  ? "Loading cars..."
                  : `Showing ${filteredAndSortedCars.length} of ${cars.length} cars`}
              </div>

              {(searchTerm ||
                selectedCategory ||
                priceRange ||
                sortBy !== "name") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <CarCard loading={true} />
                </motion.div>
              ))}
            </div>
          ) : filteredAndSortedCars.length > 0 ? (
            // Cars Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          ) : (
            // No Results State
            <div className="text-center py-16">
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
              <h3 className="text-xl font-medium text-text-primary mb-2">
                No cars found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search criteria or browse all available cars
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseCars;
