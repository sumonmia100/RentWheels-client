import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  FaCar,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeRentals: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch user's listings from API
  const fetchMyListings = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) return [];

      const response = await fetch(
        `https://rent-wheel-server-side-api.vercel.app/my-listings?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching listings:", error);
      return [];
    }
  };

  // Fetch user's bookings from API
  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) return [];

      const response = await fetch(
        "https://rent-wheel-server-side-api.vercel.app/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };

  // Calculate stats from real data
  const calculateStats = (listings, bookings) => {
    const totalCars = listings.length;
    const totalBookings = bookings.length;
    const activeRentals = bookings.filter(
      (booking) => booking.status === "Active" || booking.status === "Booked"
    ).length;

    // Calculate revenue (assuming each booking has an amount field)
    const totalRevenue = bookings.reduce((sum, booking) => {
      return sum + (booking.amount || booking.totalPrice || 0);
    }, 0);

    return {
      totalCars,
      totalBookings,
      totalRevenue,
      activeRentals,
    };
  };

  // Fetch dashboard data
  const fetchDashboardData = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) setRefreshing(true);

      const [listings, bookings] = await Promise.all([
        fetchMyListings(),
        fetchMyBookings(),
      ]);

      // Calculate stats
      const calculatedStats = calculateStats(listings, bookings);
      setStats(calculatedStats);

      // Set recent listings (last 3)
      setRecentListings(
        listings.slice(0, 3).map((car) => ({
          id: car._id,
          name: car.name || car.model || "Unknown Car",
          price: car.price || car.dailyRate || 0,
          status: car.status || "Available",
          bookings: car.totalBookings || 0,
          image: car.image || car.images?.[0],
        }))
      );

      // Set recent bookings (last 3)
      setRecentBookings(
        bookings.slice(0, 3).map((booking) => ({
          id: booking._id,
          carName: booking.carName || booking.carModel || "Unknown Car",
          customerName:
            booking.customerName || booking.userName || "Unknown Customer",
          startDate: booking.startDate || booking.pickupDate,
          endDate: booking.endDate || booking.returnDate,
          amount: booking.amount || booking.totalPrice || 0,
          status: booking.status || "Pending",
        }))
      );

      if (showRefreshToast) {
        toast.success("Dashboard refreshed!");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user]);

  const handleRefresh = () => {
    fetchDashboardData(true);
  };

  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const token = localStorage.getItem("access-token");
      const response = await fetch(
        `https://rent-wheel-server-side-api.vercel.app/cars/${carId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Car deleted successfully!");
        fetchDashboardData(); // Refresh data
      } else {
        toast.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car");
    }
  };

  const statCards = [
    {
      title: "My Cars",
      value: stats.totalCars,
      icon: FaCar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+2 this month",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: FaCalendarAlt,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+5 this week",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+12% this month",
    },
    {
      title: "Active Rentals",
      value: stats.activeRentals,
      icon: FaUsers,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: `${stats.activeRentals} ongoing`,
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "booked":
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "booked":
        return <FaCheckCircle className="w-3 h-3" />;
      case "pending":
        return <FaClock className="w-3 h-3" />;
      case "cancelled":
        return <FaTimesCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, {user?.displayName || "User"}!
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your RentWheels account today.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            loading={refreshing}
            className="flex items-center"
          >
            <FaChartLine className="mr-2" />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="animate-fade-in" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                    <stat.icon className={`text-2xl ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 animate-fade-in-delay">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/addcar">
              <Button variant="primary">
                <FaPlus className="mr-2" /> Add New Car
              </Button>
            </Link>
            <Link to="/mylistings">
              <Button variant="outline">
                <FaCar className="mr-2" /> Manage Cars
              </Button>
            </Link>
            <Link to="/my-bookings">
              <Button variant="outline">
                <FaCalendarAlt className="mr-2" /> View Bookings
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline">
                <FaEye className="mr-2" /> Browse Cars
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card className="animate-fade-in-delay-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Recent Bookings
              </h2>
              <Link to="/my-bookings">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">
                        {booking.carName}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Customer: {booking.customerName}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {booking.startDate &&
                          new Date(booking.startDate).toLocaleDateString()}{" "}
                        -{" "}
                        {booking.endDate &&
                          new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">
                        ${booking.amount}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaCalendarAlt className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
                  <p className="text-text-secondary">No bookings yet</p>
                  <p className="text-sm text-text-secondary mt-2">
                    Your bookings will appear here
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* My Car Listings */}
          <Card className="animate-fade-in-delay-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                My Car Listings
              </h2>
              <Link to="/mylistings">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentListings.length > 0 ? (
                recentListings.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center flex-1">
                      {car.image && (
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">
                          {car.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          ${car.price}/day
                        </p>
                        <p className="text-sm text-text-secondary">
                          {car.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          car.status
                        )}`}
                      >
                        {car.status}
                      </span>
                      <div className="flex space-x-1">
                        <Link to={`/cars/${car.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="View Details"
                          >
                            <FaEye className="w-3 h-3" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete Car"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          <FaTrash className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaCar className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
                  <p className="text-text-secondary mb-4">No cars listed yet</p>
                  <Link to="/addcar">
                    <Button variant="primary" size="sm">
                      <FaPlus className="mr-2" /> Add Your First Car
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="mt-8 animate-fade-in-delay-2">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Performance Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {stats.totalCars > 0
                  ? Math.round((stats.totalBookings / stats.totalCars) * 100) /
                    100
                  : 0}
              </div>
              <p className="text-sm text-text-secondary">
                Avg Bookings per Car
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {stats.totalBookings > 0
                  ? Math.round(stats.totalRevenue / stats.totalBookings)
                  : 0}
              </div>
              <p className="text-sm text-text-secondary">
                Avg Revenue per Booking
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {stats.totalBookings > 0
                  ? Math.round(
                      (stats.activeRentals / stats.totalBookings) * 100
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-text-secondary">Active Rental Rate</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
