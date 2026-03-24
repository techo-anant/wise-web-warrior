import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/static/Home";

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>About our business.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact Page</h2>
      <p>Contact us here.</p>
    </div>
  );
}

function FAQ() {
  return (
    <div>
      <h2>FAQ Page</h2>
      <p>Frequently Asked Questions.</p>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;