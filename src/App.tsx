import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./sections/Footer";
import Preloader from "./components/Preloader";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("loaded", loaded);
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <div>
        <Header ready={loaded} />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage ready={loaded} />} />
            <Route path="/about" element={<AboutPage ready={loaded} />} />
            <Route path="/services" element={<ServicesPage ready={loaded} />} />
            <Route
              path="/testimonials"
              element={<TestimonialsPage ready={loaded} />}
            />
            <Route path="/contact" element={<ContactPage ready={loaded} />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyPage />} />
          </Routes>
        </Suspense>
        <Footer ready={loaded} />
      </div>
    </>
  );
}

export default App;
