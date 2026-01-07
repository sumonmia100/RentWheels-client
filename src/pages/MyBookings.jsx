"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { FaCarSide, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const token = localStorage.getItem("access-token");

    fetch(`https://rent-wheel-server-side-api.vercel.app/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your bookings");
      });
  }, [user]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access-token");

    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#3182ce",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl shadow-lg",
      },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://rent-wheel-server-side-api.vercel.app/bookings/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been successfully cancelled.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Unable to cancel booking. Please try again.",
          icon: "error",
          confirmButtonColor: "#3182ce",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Server error while cancelling booking.",
        icon: "error",
        confirmButtonColor: "#3182ce",
      });
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-20">
        <FaCarSide className="text-5xl text-text-secondary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-text-primary">
          No Bookings Found
        </h2>
        <p className="text-text-secondary mt-2">
          You haven’t booked any cars yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
        My Bookings
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking, i) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={booking.imageURL}
              alt={booking.carName}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {booking.carName}
              </h3>
              <p className="text-gray-500 text-sm">Type: {booking.category}</p>
              <p className="text-gray-600 font-medium">
                Rent:{" "}
                <span className="text-blue-600">${booking.rentPrice}/day</span>
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "Booked"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaTrashAlt /> Cancel
                </button>
                <span className="text-sm text-text-secondary">
                  {booking.date || "No date info"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
