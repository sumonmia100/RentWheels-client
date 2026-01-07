import { Toaster } from "react-hot-toast";
import "./App.css";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

function App() {
  const location = useLocation();

  const hideLayout = location.pathname === "/404" || location.pathname === "*";

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      {!hideLayout && <Navbar />}

      <Spinner />

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
          },
        }}
      />
    </div>
  );
}

export default App;
