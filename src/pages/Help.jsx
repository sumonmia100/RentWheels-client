import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router";
import {
  FaSearch,
  FaQuestionCircle,
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
  FaEnvelope,
  FaComments,
  FaCar,
  FaDollarSign,
  FaShieldAlt,
} from "react-icons/fa";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      icon: FaCar,
      title: "Booking & Rentals",
      description: "Everything about booking cars and managing rentals",
      articles: 12,
    },
    {
      icon: FaDollarSign,
      title: "Payments & Pricing",
      description: "Payment methods, pricing, and billing questions",
      articles: 8,
    },
    {
      icon: FaShieldAlt,
      title: "Safety & Insurance",
      description: "Safety guidelines and insurance coverage",
      articles: 6,
    },
    {
      icon: FaCar,
      title: "Car Owners",
      description: "Guide for listing and managing your car",
      articles: 10,
    },
  ];

  const faqs = [
    {
      question: "How do I book a car on RentWheels?",
      answer:
        "To book a car, simply browse our available vehicles, select your preferred dates and location, review the details, and complete the booking process with secure payment. You'll receive instant confirmation.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You'll need a valid driver's license, a credit or debit card for payment, and a government-issued ID. International renters may need an International Driving Permit.",
    },
    {
      question: "Is insurance included with my rental?",
      answer:
        "Yes, all rentals include basic insurance coverage. You can also purchase additional coverage options during the booking process for extra protection.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking up to 24 hours before the rental start time. Cancellation policies may vary depending on the car owner's terms.",
    },
    {
      question: "How do I list my car on RentWheels?",
      answer:
        "To list your car, create an account, complete the verification process, add photos and details of your vehicle, set your pricing and availability, and submit for approval.",
    },
    {
      question: "How much can I earn by renting out my car?",
      answer:
        "Earnings vary based on your car's make, model, location, and demand. On average, car owners earn $200-$500 per month. Use our earnings calculator for estimates.",
    },
    {
      question: "What happens if there's damage to my car?",
      answer:
        "All rentals are covered by insurance. In case of damage, report it immediately through our app. Our claims team will handle the process and ensure you're compensated.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our 24/7 customer support through live chat, email at support@rentwheels.com, or phone at +1 (555) 123-4567. We're here to help!",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6 animate-fade-in">
            Help <span className="text-primary">Center</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8 animate-fade-in-delay">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto animate-fade-in-delay-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center animate-fade-in" hover>
              <FaHeadset className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Live Chat
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Get instant help from our support team
              </p>
              <Button variant="primary" size="sm">
                Start Chat
              </Button>
            </Card>

            <Card className="text-center animate-fade-in-delay" hover>
              <FaPhone className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Call Us
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Speak directly with our support team
              </p>
              <Button variant="outline" size="sm">
                +1 (555) 123-4567
              </Button>
            </Card>

            <Card className="text-center animate-fade-in-delay-2" hover>
              <FaEnvelope className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Email Support
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Send us a detailed message
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  Contact Form
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Browse by Category
            </h2>
            <p className="text-text-secondary">
              Find help articles organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in-delay"
                hover
              >
                <category.icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {category.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {category.description}
                </p>
                <p className="text-xs text-text-secondary">
                  {category.articles} articles
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="animate-fade-in-delay">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <h3 className="text-lg font-medium text-text-primary pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <FaChevronUp className="text-primary flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-text-secondary flex-shrink-0" />
                  )}
                </button>

                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-border pt-4">
                      <p className="text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <FaQuestionCircle className="text-6xl text-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No results found
              </h3>
              <p className="text-text-secondary mb-6">
                We couldn't find any FAQs matching "{searchQuery}". Try a
                different search term.
              </p>
              <Button variant="primary" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="surface"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <FaComments className="mr-2" />
              Start Live Chat
            </Button>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <FaEnvelope className="mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
