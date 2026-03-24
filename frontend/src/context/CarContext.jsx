import React, { createContext, useState } from "react";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [savedCars, setSavedCars] = useState([]);
  const [compareList, setCompareList] = useState([]);

  return (
    <CarContext.Provider value={{ savedCars, setSavedCars, compareList, setCompareList }}>
      {children}
    </CarContext.Provider>
  );
};