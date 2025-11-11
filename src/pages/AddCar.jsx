import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddCar = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newCar = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      rentPrice: parseFloat(form.rentPrice.value),
      location: form.location.value,
      imageURL: form.imageURL.value,
      providerName: user?.displayName || "Anonymous",
      providerEmail: user?.email || "N/A",
      status: "Available",
    };

    console.log("Car Data:", newCar);

    // Dummy success simulation
    setTimeout(() => {
      setLoading(false);
      toast.success("🚗 Car added successfully!");
      form.reset();
    }, 1000);
  };

  return (
    <motion.section
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add a New Car
        </h2>

        <form onSubmit={handleAddCar} className="space-y-5">
          {/* Car Name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Car Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Toyota Corolla"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description..."
              rows="3"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Category & Rent Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Rent Price (per day)
              </label>
              <input
                type="number"
                name="rentPrice"
                placeholder="e.g. 75"
                required
                min="1"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Location & Image */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Dhaka, Bangladesh"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Hosted Image URL
              </label>
              <input
                type="url"
                name="imageURL"
                placeholder="Paste image link"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Provider Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Provider Name
              </label>
              <input
                type="text"
                name="providerName"
                value={user?.displayName || ""}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Provider Email
              </label>
              <input
                type="email"
                name="providerEmail"
                value={user?.email || ""}
                readOnly
                className="w-full border bg-gray-100 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all disabled:opacity-70"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Adding..." : "Add Car"}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default AddCar;
