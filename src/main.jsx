import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from "react-router/dom";
import App from './App';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthProvider from './contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';
import BrowesCars from './pages/BrowesCars';
import AddCar from './pages/AddCar';
import MyListings from './pages/MyListings';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home/Home';
import FeaturedCars from './pages/Home/FeaturedCars';
import WhyRentWithUs from './pages/Home/WhyRentWithUs';
import CarDetails from './pages/CarDetails';
import CarSearch from './components/CarSearch';
import PrivateRoute from './routes/PrivateRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        loader: async () => {
          const res = await fetch("http://localhost:3000/cars");
          return res.json();
        },
        Component: Home,
      },
      {
        path: "/",
        Component: WhyRentWithUs,
      },
      {
        path: "/",
        loader: async () => {
          const res = await fetch("http://localhost:3000/cars");
          return res.json();
        },
        Component: CarSearch,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/browse",
        Component: BrowesCars,
      },
      {
        path: "/addcar",
        Component: AddCar,
      },
      {
        path: "/mylistings",
        Component: () => (
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybookings",
        Component: () => (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/featurecard",
        loader: async () => {
          const res = await fetch("http://localhost:3000/cars");
          return res.json();
        },
        Component: FeaturedCars,
      },
      {
        path: "/cars/:id",
        Component: () => (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
      },
      
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </AuthProvider>
  </StrictMode>
);
