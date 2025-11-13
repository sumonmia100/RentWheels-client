import { Toaster } from "react-hot-toast";
import "./App.css";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Spinner from "./components/spinner";

function App() {
  const location = useLocation();

  
  const hideLayout = location.pathname === "/404" || location.pathname === "*";

  return (
    <div className="flex flex-col min-h-screen">
    
      {!hideLayout && <Navbar />}

      <Spinner />

      <main className="">
        <Outlet />
      </main>

      
      {!hideLayout && <Footer />}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
