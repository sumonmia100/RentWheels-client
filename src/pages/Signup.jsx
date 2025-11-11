import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase.init";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const validatePassword = (password) => {
//     const upper = /[A-Z]/.test(password);
//     const lower = /[a-z]/.test(password);
//     const length = password.length >= 6;
//     return upper && lower && length;
//   };
const validatePassword = (password) =>
  /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;


  const handleSignup = (e) => {
    e.preventDefault();
    const { name, photoURL, email, password } = formData;

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain at least 1 uppercase, 1 lowercase and be 6+ characters long.",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          toast.success("Account created successfully!");
          navigate("/");
        });
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: err.message.split(":")[1] || "Please try again later",
        })
      );
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signed up with Google!");
        navigate("/");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: "Something went wrong with Google signup",
        })
      );
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] md:w-[420px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account on <span className="text-blue-600">RentWheels</span>
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              required
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              name="photoURL"
              onChange={handleChange}
              required
              type="text"
              placeholder="Profile photo URL"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              required
              type="password"
              placeholder="Create a strong password"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">— or —</div>

        <button
          onClick={handleGoogleSignup}
          className="flex justify-center items-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
