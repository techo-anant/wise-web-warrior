// import React from "react";
// import AppRouter from "./routes/AppRouter";
// import { CarProvider } from "./context/CarContext";

// // Layout components
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";

// function App() {
//   return (
//     <CarProvider>
//       <Header />

//       <main>
//         <AppRouter />
//       </main>

//       <Footer />
//     </CarProvider>
//   );
// }

// export default App;


//earlier one above
//new commit below

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './themes/theme-default.css';
import './themes/theme-dark.css';
import './themes/theme-sport.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';


function App() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('saved-theme') || 'default'
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  useEffect(() => {
    localStorage.setItem('saved-theme', currentTheme);
  }, [currentTheme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App" data-theme={currentTheme}>
      <Header 
        currentTheme={currentTheme} 
        setTheme={setCurrentTheme} 
        user={user} 
        onLogout={handleLogout} 
      />

      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <AppRouter 
          setUser={setUser} 
          user={user}
          onLogout={handleLogout}
          currentTheme={currentTheme}
          setTheme={setCurrentTheme}
        />
      </main>

      <Footer />
    </div>
  );
}
export default App;
