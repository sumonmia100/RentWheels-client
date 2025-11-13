import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { Fade, Slide } from "react-awesome-reveal";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState({
    name: "",
    description: "",
    category: "",
    rentPrice: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("access-token");

    try {
      const res = await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...carData,
          providerName: user?.displayName,
          providerEmail: user?.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("🚗 Car Added Successfully!");
        e.target.reset();
      } else {
        toast.error(data.message || "Failed to add car");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-10">
      <Fade cascade damping={0.1}>
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 border border-indigo-100">
          <Slide direction="down" triggerOnce>
            <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">
              Add a New Car 🚘
            </h2>
          </Slide>

          <form onSubmit={handleAddCar} className="space-y-5">
            {/* Car Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Car Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Toyota Corolla"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Write a short description..."
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Category & Rent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Truck">Truck</option>
                  <option value="Convertible">Convertible</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Rent Price (per day)
                </label>
                <input
                  type="number"
                  name="rentPrice"
                  placeholder="e.g. 75"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
            </div>

            {/* Location & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Dhaka, Bangladesh"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Hosted Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="Paste image link"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
            </div>

            {/* Provider Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Provider Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Provider Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md"
            >
              {loading ? "Adding..." : "Add Car"}
            </button>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default AddCar;
