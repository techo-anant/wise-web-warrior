import React, { useState, useRef } from 'react';
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
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    // Store theme in a ref so ThemeManager can read it without causing re-renders
    const themeRef = useRef(currentTheme);

    // Apply theme directly to DOM — no re-render needed
    const handleThemeChange = (theme) => {
        themeRef.current = theme;
        document.getElementById('app-root').setAttribute('data-theme', theme);
        localStorage.setItem('saved-theme', theme);
        setCurrentTheme(theme); // only needed for Header to show active theme
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div id="app-root" className="App" data-theme={currentTheme}>
            <Header
                currentTheme={currentTheme}
                setTheme={handleThemeChange}
                user={user}
                onLogout={handleLogout}
            />

            <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                {/* Only pass user props — NOT currentTheme so theme changes don't re-render router */}
                <AppRouter
                    setUser={setUser}
                    user={user}
                    onLogout={handleLogout}
                    currentTheme={currentTheme}
                    setTheme={handleThemeChange}
                />
            </main>

            <Footer />
        </div>
    );
}

export default App;