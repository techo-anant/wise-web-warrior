import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={search}
        placeholder="Search cars..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;