import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin/Admin";

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/disclaimer"
            element={<Disclaimer />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
  path="/services/website-development"
  element={<WebsiteDevelopment />}
/>

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
            <Analytics />

    </>
  );
}