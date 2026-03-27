import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: "0.5rem",
        width: "100%",
        marginBottom: "1rem"
      }}
    />
  );
}

export default SearchBar;