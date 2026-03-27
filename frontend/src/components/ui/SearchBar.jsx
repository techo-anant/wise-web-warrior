// import React from "react";

// function SearchBar({ searchTerm, setSearchTerm }) {
//   return (
//     <input
//       type="text"
//       placeholder="Search by name..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       style={{
//         padding: "0.5rem",
//         width: "100%",
//         marginBottom: "1rem"
//       }}
//     />
//   );
// }

// export default SearchBar;


// earlier code above ^^^^^^^^^^^
//   NEW CODE BELOW



import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Search by model, make, or year..." 
        className="inventory-search" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
}

export default SearchBar;
