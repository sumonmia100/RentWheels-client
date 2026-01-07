import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Spinner = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-500">
      <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
