import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router";
import {
  FaSearch,
  FaCalendarAlt,
  FaKey,
  FaHandshake,
  FaUserCheck,
  FaShieldAlt,
  FaCar,
  FaDollarSign,
} from "react-icons/fa";

const HowItWorks = () => {
  const renterSteps = [
    {
      icon: FaSearch,
      title: "Browse & Search",
      description:
        "Find the perfect car for your needs using our advanced search filters. Browse by location, price, car type, and more.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaCalendarAlt,
      title: "Book Your Car",
      description:
        "Select your dates, review the details, and book instantly. Our secure payment system ensures your transaction is safe.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FaKey,
      title: "Pick Up & Drive",
      description:
        "Meet the car owner at the agreed location, complete the handover process, and start your journey.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: FaHandshake,
      title: "Return & Review",
      description:
        "Return the car in the same condition, complete the return process, and leave a review for future renters.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const ownerSteps = [
    {
      icon: FaCar,
      title: "List Your Car",
      description:
        "Create a detailed listing with photos, description, and pricing. Our team verifies all listings for quality.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaUserCheck,
      title: "Get Verified",
      description:
        "Complete our verification process including identity verification and car documentation review.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FaCalendarAlt,
      title: "Receive Bookings",
      description:
        "Accept or decline booking requests based on your availability. Set your own schedule and pricing.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: FaDollarSign,
      title: "Earn Money",
      description:
        "Get paid automatically after each successful rental. Track your earnings through our dashboard.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Insurance Coverage",
      description:
        "All rentals are covered by comprehensive insurance for peace of mind.",
    },
    {
      icon: FaUserCheck,
      title: "Verified Users",
      description:
        "All users go through our verification process for safety and security.",
    },
    {
      icon: FaHandshake,
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to help you.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6 animate-fade-in">
            How <span className="text-primary">RentWheels</span> Works
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto animate-fade-in-delay">
            Whether you're looking to rent a car or earn money by sharing yours,
            RentWheels makes it simple, safe, and rewarding.
          </p>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              For Renters
            </h2>
            <p className="text-text-secondary">
              Get on the road in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {renterSteps.map((step, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <step.icon className={`text-2xl ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button variant="primary" size="lg">
                Start Browsing Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Car Owners Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              For Car Owners
            </h2>
            <p className="text-text-secondary">
              Turn your car into a money-making asset
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ownerSteps.map((step, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <step.icon className={`text-2xl ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/addcar">
              <Button variant="primary" size="lg">
                List Your Car
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why Choose RentWheels?
            </h2>
            <p className="text-text-secondary">
              We've got you covered with these key features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <feature.icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and car owners on RentWheels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button
                variant="surface"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Browse Cars
              </Button>
            </Link>
            <Link to="/addcar">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                List Your Car
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
