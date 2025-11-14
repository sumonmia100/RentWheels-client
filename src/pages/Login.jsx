import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import app from "../firebase.init";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const auth = getAuth(app);

const Login = () => {
  const { googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // 🔹 Get JWT token and save in localStorage
  const getToken = async (userEmail) => {
    try {
      const res = await fetch("https://rent-wheel-server-side.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:userEmail}),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("access-token", data.token);
        // toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to get token");
      console.error(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setLoading(false);
        getToken(result.user.email);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message.split(":")[1] || "Invalid credentials",
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        getToken(result.user.email);
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong with Google login",
        })
      );
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] md:w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back to <span className="text-blue-600">RentWheels</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">— or —</div>

        <button
          onClick={handleGoogleLogin}
          className="flex justify-center items-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" /> Login with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
