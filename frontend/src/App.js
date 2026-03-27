import React from "react";
import AppRouter from "./routes/AppRouter";
import { CarProvider } from "./context/CarContext";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <CarProvider>
      <Header />

      <main>
        <AppRouter />
      </main>

      <Footer />
    </CarProvider>
  );
}

export default App;