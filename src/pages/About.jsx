import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  FaCar,
  FaUsers,
  FaMapMarkerAlt,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { icon: FaCar, number: "10,000+", label: "Cars Available" },
    { icon: FaUsers, number: "50,000+", label: "Happy Customers" },
    { icon: FaMapMarkerAlt, number: "100+", label: "Cities Covered" },
    { icon: FaAward, number: "5+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      description:
        "We prioritize your safety with verified vehicles and comprehensive insurance coverage.",
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you whenever you need help.",
    },
    {
      icon: FaCar,
      title: "Quality Fleet",
      description:
        "Well-maintained, modern vehicles that meet the highest standards of comfort and reliability.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "10+ years in automotive industry, passionate about sustainable transportation.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech innovator focused on creating seamless user experiences.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert ensuring smooth service delivery across all locations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6 animate-fade-in">
            About <span className="text-primary">RentWheels</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto animate-fade-in-delay">
            We're revolutionizing car rental with technology, trust, and
            exceptional service. Your journey matters to us, and we're here to
            make it extraordinary.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <stat.icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-text-secondary">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="flex bg-surface rounded-lg p-1 shadow-sm">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Mission & Vision" },
                { id: "team", label: "Our Team" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "primary" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-2"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Our Story Tab */}
          {activeTab === "story" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-text-primary mb-6">
                    How RentWheels Started
                  </h2>
                  <div className="space-y-4 text-text-secondary">
                    <p>
                      Founded in 2019, RentWheels began with a simple vision:
                      make car rental accessible, affordable, and hassle-free
                      for everyone. What started as a small startup with just 10
                      vehicles has grown into a trusted platform serving
                      thousands of customers across multiple cities.
                    </p>
                    <p>
                      Our founders, frustrated with the traditional car rental
                      experience, decided to build something better. They
                      envisioned a platform where technology meets hospitality,
                      where every interaction is smooth, transparent, and
                      customer-focused.
                    </p>
                    <p>
                      Today, we're proud to be at the forefront of the
                      car-sharing revolution, connecting car owners with renters
                      through our innovative platform while maintaining the
                      highest standards of safety and service.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
                    alt="RentWheels Story"
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mission & Vision Tab */}
          {activeTab === "mission" && (
            <div className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-12">
                <Card className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Our Mission
                  </h3>
                  <p className="text-text-secondary">
                    To democratize mobility by providing accessible, reliable,
                    and sustainable transportation solutions that empower people
                    to explore, connect, and thrive in their communities.
                  </p>
                </Card>
                <Card className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Our Vision
                  </h3>
                  <p className="text-text-secondary">
                    To become the world's most trusted mobility platform, where
                    every journey is seamless, every vehicle is accessible, and
                    every community is connected through shared transportation.
                  </p>
                </Card>
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
                  Our Values
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <Card key={index} className="text-center" hover>
                      <value.icon className="text-4xl text-primary mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-text-primary mb-3">
                        {value.title}
                      </h4>
                      <p className="text-text-secondary">{value.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
                Meet Our Leadership Team
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="text-center" hover>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-xl font-semibold text-text-primary mb-2">
                      {member.name}
                    </h4>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-text-secondary text-sm">{member.bio}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Get In Touch
          </h2>
          <p className="text-text-secondary mb-12">
            Have questions or want to learn more about RentWheels? We'd love to
            hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <FaPhone className="text-2xl text-primary mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Phone</h4>
              <p className="text-text-secondary">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-2xl text-primary mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Email</h4>
              <p className="text-text-secondary">hello@rentwheels.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-2xl text-primary mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">Address</h4>
              <p className="text-text-secondary">
                123 Innovation Drive
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              <FaLinkedin className="mr-2" /> LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <FaTwitter className="mr-2" /> Twitter
            </Button>
            <Button variant="outline" size="sm">
              <FaFacebook className="mr-2" /> Facebook
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
