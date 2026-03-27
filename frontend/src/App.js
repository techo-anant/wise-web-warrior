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
//new commit [INDER] below


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './themes/theme-default.css';
import './themes/theme-dark.css';
import './themes/theme-sport.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';

function App() {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

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
        {/* ADD user={user} HERE */}
        <AppRouter setUser={setUser} user={user} /> 
      </main>

      <Footer />
    </div>
  );
}
export default App;
