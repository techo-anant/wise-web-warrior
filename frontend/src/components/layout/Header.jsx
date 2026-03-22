import React from "react";
import NavMenu from "./NavMenu";
import ThemeSwitcher from "../ui/ThemeSwitcher";

function Header() {
  return (
    <header className="header">
      <h1>Wise Web Motors</h1>

      {/* Navigation menu */}
      <NavMenu />

      {/* Theme switcher */}
      <ThemeSwitcher />
    </header>
  );
}

export default Header;