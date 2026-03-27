// import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { CarContext } from "../../context/CarContext";
// import "./CarDetail.css";

// function CarDetail() {
//   const { id } = useParams();
//   const { cars } = useContext(CarContext);

//   const car = cars.find((c) => c.id === parseInt(id));

//   if (!car) {
//     return <h2>Car not found</h2>;
//   }

//   return (
//     <div>
//       <h2>{car.year} {car.name}</h2>
//       <p>Price: ${car.price}</p>
//       <p>Mileage: {car.mileage} km</p>
//       <p>Type: {car.category}</p>
//     </div>
//   );
// }

// export default CarDetail;

//older version above^^^^^^^^^^^^^^^^^^^^^^^^^
//new version[ INDER ]

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CarDetail.css';

const CAR_DATA = [
  { 
    id: 1, 
    model: "Sleek Sedan", 
    price: 35000, 
    category: "sedan", 
    make: "Toyota", 
    condition: "Brand New", 
    year: 2024, 
    mileage: 0, 
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800",
    engine: "2.5L I4", transmission: "Automatic", fuel: "Hybrid"
  },
  { 
    id: 2, 
    model: "Mountain Crusher SUV", 
    price: 52000, 
    category: "suv", 
    make: "Ford", 
    condition: "Used", 
    year: 2022, 
    mileage: 1200, 
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    engine: "3.5L V6", transmission: "Automatic", fuel: "Gasoline"
  },
  { 
    id: 3, 
    model: "Night Rider Coupe", 
    price: 89000, 
    category: "coupe", 
    make: "Porsche", 
    condition: "Brand New", 
    year: 2024, 
    mileage: 0, 
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    engine: "3.0L Flat-6", transmission: "PDK", fuel: "Premium"
  },
  { 
    id: 4, 
    model: "Workhorse 1500", 
    price: 44500, 
    category: "truck", 
    make: "RAM", 
    condition: "Used", 
    year: 2021, 
    mileage: 1800, 
    image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800",
    engine: "5.7L V8 HEMI", transmission: "Automatic", fuel: "Gasoline"
  }
];

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const car = CAR_DATA.find(c => c.id === parseInt(id));

  const handleFinancingClick = () => {
    navigate('/financing', { 
      state: { 
        price: car.price, 
        model: car.model,
        make: car.make 
      } 
    });
  };

  const handleInquiryClick = () => {
    alert(`Inquiry sent for the ${car.year} ${car.make} ${car.model}!`);
  };

  if (!car) {
    return (
      <div className="error-msg">
        <h2>Car not found!</h2>
        <Link to="/inventory">Back to Showroom</Link>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <div className="detail-container">
        <Link to="/inventory" className="back-btn">← Back to Inventory</Link>
        
        <div className="detail-main">
          <div className="detail-image">
            <img src={car.image_url} alt={car.model} /> 
            <span className="detail-tag">{car.condition}</span>
          </div>

          <div className="detail-info">
            <span className="detail-brand">{car.make}</span>
            <h1>{car.model}</h1>
            <p className="detail-price">${car.price.toLocaleString()}</p>
            
            <div className="specs-grid">
              <div className="spec-item"><strong>Year:</strong> {car.year}</div>
              <div className="spec-item"><strong>Type:</strong> {car.category}</div>
              <div className="spec-item"><strong>KMs:</strong> {car.mileage.toLocaleString()}</div> 
              <div className="spec-item"><strong>Engine:</strong> {car.engine}</div>
              <div className="spec-item"><strong>Trans:</strong> {car.transmission}</div>
              <div className="spec-item"><strong>Fuel:</strong> {car.fuel}</div>
            </div>

            <div className="detail-actions">
              <button className="inquiry-btn" onClick={handleInquiryClick}>
                Inquire Now
              </button>
              
              <button className="finance-btn-secondary" onClick={handleFinancingClick}>
                Financing Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
