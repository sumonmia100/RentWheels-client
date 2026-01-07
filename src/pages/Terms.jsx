import Card from "../components/Card";
import { Link } from "react-router";

const Terms = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using RentWheels, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time with notice to users.",
        "Continued use of the platform after changes constitutes acceptance of new terms.",
      ],
    },
    {
      title: "User Accounts",
      content: [
        "You must create an account to use our services and provide accurate information.",
        "You are responsible for maintaining the security of your account credentials.",
        "You must be at least 18 years old to create an account.",
        "One person may not maintain multiple accounts.",
        "We reserve the right to suspend or terminate accounts that violate our terms.",
      ],
    },
    {
      title: "Car Rentals",
      content: [
        "Renters must have a valid driver's license and meet minimum age requirements.",
        "All bookings are subject to car owner approval and availability.",
        "Renters are responsible for the vehicle during the rental period.",
        "Vehicles must be returned in the same condition as received.",
        "Late returns may incur additional fees as specified by the car owner.",
      ],
    },
    {
      title: "Car Owners",
      content: [
        "Car owners must provide accurate information about their vehicles.",
        "All listed vehicles must be properly registered, insured, and roadworthy.",
        "Owners are responsible for maintaining their vehicles in safe condition.",
        "Pricing and availability are set by individual car owners.",
        "Owners must comply with local laws and regulations regarding car sharing.",
      ],
    },
    {
      title: "Payments and Fees",
      content: [
        "All payments are processed through secure third-party payment processors.",
        "RentWheels charges a service fee on each transaction.",
        "Car owners receive payment after successful completion of rentals.",
        "Refunds are subject to our cancellation policy and car owner terms.",
        "Users are responsible for any applicable taxes on their transactions.",
      ],
    },
    {
      title: "Insurance and Liability",
      content: [
        "All rentals include basic insurance coverage through our insurance partners.",
        "Additional coverage options are available for purchase.",
        "Users must report any incidents or damage immediately.",
        "RentWheels is not liable for damages beyond our insurance coverage.",
        "Users may be responsible for deductibles and uncovered damages.",
      ],
    },
    {
      title: "Prohibited Uses",
      content: [
        "Using vehicles for illegal activities or commercial purposes without permission.",
        "Subletting or transferring rental agreements to third parties.",
        "Providing false information or misrepresenting identity.",
        "Attempting to circumvent our platform for direct transactions.",
        "Harassing, threatening, or discriminating against other users.",
      ],
    },
    {
      title: "Platform Rules",
      content: [
        "Users must treat each other with respect and professionalism.",
        "All communications should be conducted through our platform.",
        "Reviews and ratings must be honest and based on actual experiences.",
        "Users may not manipulate ratings or reviews.",
        "Spam, promotional content, and irrelevant communications are prohibited.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-text-secondary">Last updated: {lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Welcome to RentWheels
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of the RentWheels
            platform, including our website, mobile applications, and related
            services. RentWheels connects car owners with people who need to
            rent vehicles.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Please read these Terms carefully before using our services. By
            using RentWheels, you agree to be bound by these Terms. If you don't
            agree to these Terms, you may not use our services.
          </p>
        </Card>

        {/* Main Sections */}
        {sections.map((section, index) => (
          <Card key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.content.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-text-secondary leading-relaxed flex items-start"
                >
                  <span className="text-primary mr-2 mt-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {/* Termination */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Termination
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We may terminate or suspend your account and access to our services
            immediately, without prior notice or liability, for any reason,
            including if you breach these Terms.
          </p>
          <p className="text-text-secondary leading-relaxed">
            You may terminate your account at any time by contacting us. Upon
            termination, your right to use our services will cease immediately,
            but these Terms will remain in effect regarding any prior use of our
            services.
          </p>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Limitation of Liability
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            RentWheels acts as a platform connecting car owners and renters. We
            are not responsible for the condition, safety, or legality of
            vehicles listed on our platform, or the truth or accuracy of
            listings.
          </p>
          <p className="text-text-secondary leading-relaxed">
            To the maximum extent permitted by law, RentWheels shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of our services.
          </p>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="space-y-2 text-text-secondary">
            <p>
              <strong>Email:</strong> legal@rentwheels.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA
              94105
            </p>
          </div>
          <p className="text-text-secondary leading-relaxed mt-4">
            You can also reach us through our{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact form
            </Link>
            .
          </p>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
