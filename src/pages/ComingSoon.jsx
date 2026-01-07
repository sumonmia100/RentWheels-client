import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router";
import { FaRocket, FaEnvelope, FaBell } from "react-icons/fa";

const ComingSoon = ({
  title = "Coming Soon",
  description = "This page is under development",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="animate-fade-in">
          <div className="py-12">
            <FaRocket className="text-6xl text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {title}
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-md mx-auto">
              {description}. We're working hard to bring you something amazing!
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-text-secondary">In the meantime, you can:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="primary">Go to Homepage</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline">
                    <FaEnvelope className="mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex items-center justify-center text-text-secondary">
                <FaBell className="mr-2" />
                <span className="text-sm">
                  Want to be notified when this page is ready?
                  <Link
                    to="/contact"
                    className="text-primary hover:underline ml-1"
                  >
                    Let us know!
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;
