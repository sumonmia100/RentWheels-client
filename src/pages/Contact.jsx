import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call - replace with actual contact form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+88 017 24-789728", "+88 016 26-089815"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["mdsumonmia100sa@gmail.com", "support@rentwheels.com"],
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["123 Innovation Drive", "Sylhet,Bangladesh"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat - Sun: 10:00 AM - 4:00 PM",
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      name: "Facebook",
      url: "https://www.facebook.com/md.sumon.mia.232638",
      color: "text-blue-600",
    },
    { icon: FaTwitter, name: "Twitter", url: "#", color: "text-blue-400" },
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mdsumonmia100",
      color: "text-blue-700",
    },
    { icon: FaInstagram, name: "Instagram", url: "#", color: "text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6 animate-fade-in">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto animate-fade-in-delay">
            Have questions about RentWheels? Need support? Want to partner with
            us? We'd love to hear from you and help you get on the road.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <div
                  className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <info.icon className={`text-2xl ${info.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-text-secondary text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="animate-fade-in">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    error={errors.subject}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="animate-fade-in-delay">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Find Us
                </h3>
                <div className="bg-border rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-4xl text-text-secondary mx-auto mb-2" />
                    <p className="text-text-secondary">Interactive Map</p>
                    <p className="text-sm text-text-secondary">
                      123 Innovation Drive,Sylhet-Bangladesh
                    </p>
                  </div>
                </div>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="animate-fade-in-delay-2">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Quick Help
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">
                      Booking Issues?
                    </h4>
                    <p className="text-sm text-blue-600">
                      Check our booking guide or contact support directly.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">
                      Car Owner?
                    </h4>
                    <p className="text-sm text-green-600">
                      Learn how to list your car and start earning.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">
                      Partnership?
                    </h4>
                    <p className="text-sm text-purple-600">
                      Interested in business partnerships? Let's talk.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="animate-fade-in-delay-2">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-text-secondary mt-4">
                  Stay updated with the latest news, tips, and special offers
                  from RentWheels.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-red-50 border-red-200">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Emergency Support
            </h2>
            <p className="text-red-700 mb-6">
              Need immediate assistance with an active rental? Our 24/7
              emergency support is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                className="bg-red-600 hover:bg-red-700"
              >
                <FaPhone className="mr-2" />
                Call Emergency: +88 01626089815-HELP
              </Button>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <FaEnvelope className="mr-2" />
                emergency@rentwheels.com
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
