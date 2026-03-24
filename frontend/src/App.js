import React from "react";
import AppRouter from "./routes/AppRouter";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div>
      <Header />

      <main>
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}

export default App;