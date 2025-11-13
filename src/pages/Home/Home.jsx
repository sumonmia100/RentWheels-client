import React from 'react';
import HeroSlider from './HeroSlider';
import FeaturedCars from './FeaturedCars';
import WhyRentWithUs from './WhyRentWithUs';
import TopRatedCars from './TopRatedCars';
import Testimonials from './Testimonials';
import CarSearch from '../../components/CarSearch';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <WhyRentWithUs></WhyRentWithUs>
            <CarSearch></CarSearch>
            <FeaturedCars></FeaturedCars>
            <TopRatedCars></TopRatedCars>

            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;