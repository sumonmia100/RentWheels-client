import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { updateProfile, updatePassword, updateEmail } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaBell,
  FaShieldAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const ProfileSettings = () => {
  const { user, logOut } = useContext(AuthContext);
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
    bio: "",
    location: "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPromotions: false,
    pushBookings: true,
    pushMessages: true,
    smsBookings: false,
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (profileData.photoURL && !isValidUrl(profileData.photoURL)) {
      newErrors.photoURL = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) return;

    setLoading(true);
    try {
      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // Update email if changed
      if (profileData.email !== user.email) {
        await updateEmail(auth.currentUser, profileData.email);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setLoading(true);
    try {
      await updatePassword(auth.currentUser, passwordData.newPassword);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Password update error:", error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please log out and log back in to change your password.");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await auth.currentUser.delete();
        toast.success("Account deleted successfully");
        logOut();
      } catch (error) {
        console.error("Account deletion error:", error);
        if (error.code === "auth/requires-recent-login") {
          toast.error("Please log out and log back in to delete your account.");
        } else {
          toast.error("Failed to delete account. Please try again.");
        }
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "danger", label: "Danger Zone", icon: FaTrash },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Profile Settings
          </h1>
          <p className="text-text-secondary">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <tab.icon className="mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">
                  Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={
                          profileData.photoURL ||
                          "https://via.placeholder.com/100"
                        }
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4 border-border"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition-colors"
                      >
                        <FaCamera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">
                        Profile Photo
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Update your profile picture
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Display Name"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleProfileChange}
                      error={errors.displayName}
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Profile Photo URL"
                    name="photoURL"
                    type="url"
                    value={profileData.photoURL}
                    onChange={handleProfileChange}
                    error={errors.photoURL}
                    placeholder="https://example.com/your-photo.jpg"
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="+1 (555) 123-4567"
                    />

                    <Input
                      label="Location"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full md:w-auto"
                  >
                    <FaEdit className="mr-2" />
                    Update Profile
                  </Button>
                </form>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">
                  Security Settings
                </h2>

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    error={errors.currentPassword}
                    required
                  />

                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    error={errors.newPassword}
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={errors.confirmPassword}
                    required
                  />

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full md:w-auto"
                  >
                    <FaLock className="mr-2" />
                    Update Password
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Add an extra layer of security to your account by enabling
                    two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="animate-fade-in">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "emailBookings",
                          label: "Booking confirmations and updates",
                        },
                        {
                          key: "emailPromotions",
                          label: "Promotional offers and news",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-text-primary">
                            {item.label}
                          </span>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key]
                                ? "bg-primary"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: "pushBookings", label: "Booking updates" },
                        { key: "pushMessages", label: "New messages" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-text-primary">
                            {item.label}
                          </span>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key]
                                ? "bg-primary"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full md:w-auto">
                    <FaBell className="mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </Card>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "danger" && (
              <Card className="animate-fade-in border-red-200">
                <h2 className="text-2xl font-semibold text-red-600 mb-6">
                  Danger Zone
                </h2>

                <div className="space-y-6">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Delete Account
                    </h3>
                    <p className="text-red-700 mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <FaTrash className="mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
