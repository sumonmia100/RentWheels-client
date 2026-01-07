import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../firebase.init";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must contain at least 1 uppercase, 1 lowercase letter and be 6+ characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.photoURL.trim()) {
      newErrors.photoURL = "Profile photo URL is required";
    } else if (!isValidUrl(formData.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password validation
  const validatePassword = (password) =>
    /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;

  // URL validation
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Get JWT token after signup
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
      }
    } catch (err) {
      console.error("Token error:", err);
    }
  };

  // Handle normal signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(result.user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      await getToken(result.user.email);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      let errorMessage = "Please try again later";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      setErrors({ general: errorMessage });
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await getToken(result.user.email);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong with Google signup";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Signup cancelled";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email";
      }
      setErrors({ general: errorMessage });
    }
  };

  // Handle Facebook signup
  const _handleFacebookSignup = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await getToken(result.user.email);
      toast.success("Signed up with Facebook!");
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong with Facebook signup";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Signup cancelled";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email";
      }
      setErrors({ general: errorMessage });
    }
  };

  // Handle GitHub signup
  const _handleGithubSignup = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await getToken(result.user.email);
      toast.success("Signed up with GitHub!");
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong with GitHub signup";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Signup cancelled";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email";
      }
      setErrors({ general: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Create Account
            </h1>
            <p className="text-text-secondary">
              Join{" "}
              <span className="text-primary font-semibold">RentWheels</span> and
              start your journey
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

          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <Input
              label="Profile Photo URL"
              name="photoURL"
              type="url"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/your-photo.jpg"
              error={errors.photoURL}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <div className="text-xs text-text-secondary bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-800 mb-1">
                Password Requirements:
              </p>
              <ul className="space-y-1 text-blue-700">
                <li>• At least 6 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
              </ul>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
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
                onClick={handleGoogleSignup}
                className="w-full"
                size="lg"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>

              {/* Facebook and GitHub temporarily disabled - requires Firebase configuration */}
              <div className="text-center">
                <p className="text-xs text-text-secondary">
                  More signup options coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
