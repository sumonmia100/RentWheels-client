import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import app from "../firebase.init";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const auth = getAuth(app);

const Login = () => {
  const { googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Get JWT token and save in localStorage
  const getToken = async (userEmail) => {
    try {
      const res = await fetch(
        "https://rent-wheel-server-side-api.vercel.app/jwt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("access-token", data.token);
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to get token");
      console.error(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setLoading(false);
        getToken(result.user.email);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        let errorMessage = "Invalid credentials";

        if (err.code === "auth/user-not-found") {
          errorMessage = "No account found with this email";
        } else if (err.code === "auth/wrong-password") {
          errorMessage = "Incorrect password";
        } else if (err.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (err.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later";
        }

        setErrors({ general: errorMessage });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        getToken(result.user.email);
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        let errorMessage = "Something went wrong with Google login";
        if (err.code === "auth/popup-closed-by-user") {
          errorMessage = "Login cancelled";
        }
        setErrors({ general: errorMessage });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to your{" "}
              <span className="text-primary font-semibold">RentWheels</span>{" "}
              account
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.general}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-secondary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Button
                variant="surface"
                onClick={handleGoogleLogin}
                className="w-full"
                size="lg"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>

              {/* Facebook and GitHub temporarily disabled - requires Firebase configuration */}
              <div className="text-center">
                <p className="text-xs text-text-secondary">
                  More login options coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
