import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Simple placeholder components for now
function Header() {
  return <header><h1>Wise Web Warriors</h1></header>;
}

function Footer() {
  return <footer><p>&copy; 2026 Wise Web Warriors</p></footer>;
}

function Home() {
  return <div><h2>Home Page</h2><p>Welcome to our car dealership!</p></div>;
}

function About() {
  return <div><h2>About Page</h2><p>About our business.</p></div>;
}

function Contact() {
  return <div><h2>Contact Page</h2><p>Contact us here.</p></div>;
}

function FAQ() {
  return <div><h2>FAQ Page</h2><p>Frequently Asked Questions.</p></div>;
}

// Main App
function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;