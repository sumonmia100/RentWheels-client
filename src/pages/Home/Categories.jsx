import { motion } from "framer-motion";
import { Link } from "react-router";
import Card from "../../components/Card";

const Categories = () => {
  const categories = [
    {
      name: "Economy",
      description: "Budget-friendly cars perfect for city driving",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80",
      count: "150+ cars",
      startingPrice: "$25",
    },
    {
      name: "Luxury",
      description: "Premium vehicles for special occasions",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80",
      count: "80+ cars",
      startingPrice: "$120",
    },
    {
      name: "SUV",
      description: "Spacious and comfortable for family trips",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80",
      count: "200+ cars",
      startingPrice: "$65",
    },
    {
      name: "Sports",
      description: "High-performance cars for thrill seekers",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&q=80",
      count: "45+ cars",
      startingPrice: "$180",
    },
    {
      name: "Electric",
      description: "Eco-friendly vehicles for sustainable travel",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80",
      count: "90+ cars",
      startingPrice: "$55",
    },
    {
      name: "Van",
      description: "Perfect for group travel and moving",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      count: "60+ cars",
      startingPrice: "$85",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find the perfect vehicle for your needs from our diverse fleet of
            cars across multiple categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/browse?category=${category.name.toLowerCase()}`}>
                <Card hover className="group overflow-hidden">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium">
                        {category.count}
                      </div>
                      <div className="text-xs opacity-90">Available</div>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      From {category.startingPrice}/day
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
