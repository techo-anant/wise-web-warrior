import React, { createContext } from "react";

export const CarContext = createContext();

export function CarProvider({ children }) {

  const cars = [
    { id: 1, name: "Honda Civic", year: 2022, price: 24000, mileage: 15000, category: "Sedan" },
    { id: 2, name: "Toyota Corolla", year: 2021, price: 22500, mileage: 20000, category: "Sedan" },
    { id: 3, name: "Ford Mustang", year: 2023, price: 35000, mileage: 5000, category: "Sports" },
    { id: 4, name: "BMW 3 Series", year: 2020, price: 28000, mileage: 30000, category: "Sedan" },
    { id: 5, name: "Audi A4", year: 2019, price: 27000, mileage: 40000, category: "Sedan" },
    { id: 6, name: "Chevy Silverado", year: 2021, price: 42000, mileage: 25000, category: "Truck" }
  ];

  return (
    <CarContext.Provider value={{ cars }}>
      {children}
    </CarContext.Provider>
  );
}