
import {  useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../hook/useAuth";
import Swal from "sweetalert2";


const MyListings = () => {
  // Loader
   const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
const token = localStorage.getItem("access-token");
  useEffect(() => {
    if (user?.email) {
      fetch(`https://rent-wheel-server-side.vercel.app/my-listings?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCars(data));
        setLoading(false);
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://rent-wheel-server-side.vercel.app/cars/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        const data = await res.json();

        if (data.deletedCount > 0) {
          setCars((prevCars) => prevCars.filter((car) => car._id !== id));
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
        }
      }
    });
    setLoading(false);
  };

  // Update Car (submit form)
  const [editingCar, setEditingCar] = useState(null);
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      name: form.name.value,
      category: form.category.value,
      pricePerDay: form.pricePerDay.value,
      status: form.status.value,
    };

    const res = await fetch(`https://rent-wheel-server-side.vercel.app/cars/${editingCar._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(updatedCar),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      Swal.fire("Updated!", "Car information updated successfully.", "success");
      
      setCars((prev) =>
        prev.map((car) =>
          car._id === editingCar._id ? { ...car, ...updatedCar } : car
        )
      );
      setEditingCar(null);
    }
  };
   if (loading) {
     return (
       <div className="flex justify-center items-center h-[60vh]">
         <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
       </div>
     );
   }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Listings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border shadow-lg rounded-xl">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>Car Name</th>
              <th>Category</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="hover:bg-gray-100 transition">
                <td className="font-semibold">{car.name}</td>
                <td>{car.category}</td>
                <td>${car.pricePerDay}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      car.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="space-x-3 text-lg">
                  <button
                    onClick={() => setEditingCar(car)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*  Update Modal UI */}
        {editingCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
              <h3 className="text-xl font-bold mb-4 text-center">Update Car</h3>

              <form onSubmit={handleUpdateSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  defaultValue={editingCar.name}
                  className="w-full border p-2 rounded"
                  placeholder="Car Name"
                />
                <input
                  type="text"
                  name="category"
                  defaultValue={editingCar.category}
                  className="w-full border p-2 rounded"
                  placeholder="Category"
                />
                <input
                  type="number"
                  name="pricePerDay"
                  defaultValue={editingCar.pricePerDay}
                  className="w-full border p-2 rounded"
                  placeholder="Price Per Day"
                />

                <input
                  type="text"
                  name="image"
                  className="w-full border p-2 rounded"
                  placeholder="New Image URL (optional)"
                />

                <input
                  type="text"
                  value={editingCar.providerName}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />
                <input
                  type="email"
                  value={editingCar.providerEmail}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100"
                />

                <select
                  name="status"
                  defaultValue={editingCar.status}
                  className="w-full border p-2 rounded"
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                </select>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingCar(null)}
                    className="bg-gray-400 px-4 py-2 rounded text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
