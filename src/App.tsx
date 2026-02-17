import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./sections/Footer";

const HomePage         = lazy(() => import("./pages/HomePage"));
const AboutPage        = lazy(() => import("./pages/AboutPage"));
const ServicesPage     = lazy(() => import("./pages/ServicesPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage      = lazy(() => import("./pages/ContactPage"));
const PropertyPage     = lazy(() => import("./pages/PropertyPage"));

function App() {
  return (
    <>
      <Menu />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact"           element={<ContactPage />} />
          <Route path="/properties/:id"   element={<PropertyPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
