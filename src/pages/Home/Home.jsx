import React from 'react';
import HeroSlider from './HeroSlider';
import FeaturedCars from './FeaturedCars';
import WhyRentWithUs from './WhyRentWithUs';
import TopRatedCars from './TopRatedCars';
import Testimonials from './Testimonials';
const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedCars></FeaturedCars>
            <WhyRentWithUs></WhyRentWithUs>
            <TopRatedCars></TopRatedCars>

            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;