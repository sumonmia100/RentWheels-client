import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ComingSoon from "./pages/ComingSoon";
import Dashboard from "./pages/Dashboard";
import ProfileSettings from "./pages/ProfileSettings";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeProvider from "./contexts/DarkModeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import BrowesCars from "./pages/BrowesCars";
import AddCar from "./pages/AddCar";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home/Home";
import FeaturedCars from "./pages/Home/FeaturedCars";
import WhyRentWithUs from "./pages/Home/WhyRentWithUs";
import CarDetails from "./pages/CarDetails";
import PrivateRoute from "./routes/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error404></Error404>,
    hydrateFallback: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    children: [
      {
        path: "/",
        loader: async () => {
          try {
            const res = await fetch(
              "https://rent-wheel-server-side-api.vercel.app/cars"
            );
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          } catch (error) {
            console.warn("API call failed, using fallback data:", error);
            // Return fallback data when API is unavailable
            return [];
          }
        },
        Component: Home,
      },
      {
        path: "/",
        Component: WhyRentWithUs,
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
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/how-it-works",
        Component: HowItWorks,
      },
      {
        path: "/help",
        Component: Help,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/cookies",
        Component: () => (
          <ComingSoon
            title="Cookie Policy"
            description="Our cookie policy page"
          />
        ),
      },
      {
        path: "/refunds",
        Component: () => (
          <ComingSoon
            title="Refund Policy"
            description="Our refund policy page"
          />
        ),
      },
      {
        path: "/careers",
        Component: () => (
          <ComingSoon title="Careers" description="Join our team" />
        ),
      },
      {
        path: "/press",
        Component: () => (
          <ComingSoon
            title="Press"
            description="Press releases and media kit"
          />
        ),
      },
      {
        path: "/business",
        Component: () => (
          <ComingSoon
            title="Business Rentals"
            description="Corporate car rental solutions"
          />
        ),
      },
      {
        path: "/long-term",
        Component: () => (
          <ComingSoon
            title="Long-term Rentals"
            description="Extended rental options"
          />
        ),
      },
      {
        path: "/safety",
        Component: () => (
          <ComingSoon
            title="Safety"
            description="Safety guidelines and policies"
          />
        ),
      },
      {
        path: "/insurance",
        Component: () => (
          <ComingSoon
            title="Insurance"
            description="Insurance coverage information"
          />
        ),
      },
      {
        path: "/dashboard",
        Component: () => (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile-settings",
        Component: () => (
          <PrivateRoute>
            <ProfileSettings></ProfileSettings>
          </PrivateRoute>
        ),
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
        path: "/my-bookings",
        Component: () => (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/featurecard",
        loader: async () => {
          try {
            const res = await fetch(
              "https://rent-wheel-server-side-api.vercel.app/cars"
            );
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          } catch (error) {
            console.warn("API call failed, using fallback data:", error);
            // Return fallback data when API is unavailable
            return [];
          }
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
    <ErrorBoundary>
      <DarkModeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </AuthProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  </StrictMode>
);
