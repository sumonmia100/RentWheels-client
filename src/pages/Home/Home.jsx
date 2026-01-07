import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedCars from "./FeaturedCars";
import WhyRentWithUs from "./WhyRentWithUs";
import Categories from "./Categories";
import HowItWorks from "./HowItWorks";
import TopRatedCars from "./TopRatedCars";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Featured Cars Section */}
      <FeaturedCars />

      {/* Categories Section */}
      <Categories />

      {/* Why Choose Us Section */}
      <WhyRentWithUs />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Top Rated Cars Section */}
      <TopRatedCars />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
