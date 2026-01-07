import Card from "../components/Card";
import { Link } from "react-router";

const Privacy = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, we collect your name, email address, phone number, and profile photo.",
        "Vehicle Information: For car owners, we collect details about your vehicle including make, model, year, and photos.",
        "Payment Information: We collect payment details through secure third-party processors to facilitate transactions.",
        "Usage Data: We collect information about how you use our platform, including search queries and booking history.",
        "Location Data: With your permission, we collect location data to help you find nearby vehicles and facilitate pickups.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our car rental platform services",
        "To process bookings and facilitate transactions between users",
        "To verify user identity and ensure platform safety",
        "To communicate with you about your bookings and account",
        "To improve our services and develop new features",
        "To comply with legal obligations and resolve disputes",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "With Other Users: We share necessary information between car owners and renters to facilitate bookings.",
        "With Service Providers: We share data with trusted third parties who help us operate our platform.",
        "For Legal Compliance: We may disclose information when required by law or to protect our rights.",
        "Business Transfers: Information may be transferred in connection with mergers or acquisitions.",
        "We do not sell your personal information to third parties for marketing purposes.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your information",
        "All payment processing is handled by PCI-compliant third-party processors",
        "We use encryption to protect data in transit and at rest",
        "Regular security audits and monitoring help detect potential threats",
        "Access to personal information is restricted to authorized personnel only",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Access: You can request access to the personal information we hold about you",
        "Correction: You can update or correct your personal information through your account settings",
        "Deletion: You can request deletion of your account and associated data",
        "Portability: You can request a copy of your data in a portable format",
        "Marketing: You can opt out of marketing communications at any time",
      ],
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar technologies to enhance your experience",
        "Essential cookies are necessary for the platform to function properly",
        "Analytics cookies help us understand how users interact with our platform",
        "You can control cookie preferences through your browser settings",
        "Some features may not work properly if you disable certain cookies",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">Last updated: {lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Introduction
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            At RentWheels, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, share, and protect your
            information when you use our car rental platform.
          </p>
          <p className="text-text-secondary leading-relaxed">
            By using RentWheels, you agree to the collection and use of
            information in accordance with this policy. If you do not agree with
            our policies and practices, please do not use our services.
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

        {/* Contact Information */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="space-y-2 text-text-secondary">
            <p>
              <strong>Email:</strong> privacy@rentwheels.com
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

        {/* Updates */}
        <Card>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Policy Updates
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the new Privacy Policy on this page and updating the "Last
            updated" date. We encourage you to review this Privacy Policy
            periodically to stay informed about how we protect your information.
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

export default Privacy;
