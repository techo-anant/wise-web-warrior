import React from "react";

function ThemeSwitcher() {
  const changeTheme = (theme) => {
    document.body.className = theme;
  };

  return (
    <div>
      <button onClick={() => changeTheme("default")}>Default</button>
      <button onClick={() => changeTheme("dark")}>Dark</button>
      <button onClick={() => changeTheme("sport")}>Sport</button>
    </div>
  );
}

export default ThemeSwitcher;