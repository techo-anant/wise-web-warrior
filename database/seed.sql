USE cardeals_db;

-- ── ADMIN USER ──
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@cardeals.com', '$2b$10$Qzv0ozzVgnICYFTPBIlXeeAj9UeCe9mVtw7dbTy4nrLMIgotc1LAy', 'admin');

-- ── 20+ CAR RECORDS ──
INSERT INTO cars (make, model, year, price, mileage, category, tag, color, transmission, fuel_type, engine, description) VALUES
('Toyota',     'Camry',        2022, 28999.00,  15000, 'sedan',    'used',     'White',   'automatic', 'gasoline', '2.5L 4-Cylinder', 'Well maintained Toyota Camry with low mileage.'),
('Honda',      'Civic',        2023, 24999.00,   8000, 'sedan',    'used',     'Black',   'automatic', 'gasoline', '1.5L Turbocharged','Sporty and fuel efficient Honda Civic.'),
('Ford',       'F-150',        2022, 45999.00,  20000, 'truck',    'used',     'Blue',    'automatic', 'gasoline', '3.5L EcoBoost V6', 'Powerful Ford F-150 ready for any job.'),
('Chevrolet',  'Equinox',      2023, 32999.00,  12000, 'suv',      'used',     'Silver',  'automatic', 'gasoline', '1.5L Turbocharged','Spacious and comfortable family SUV.'),
('Tesla',      'Model 3',      2023, 52999.00,   5000, 'electric', 'featured', 'Red',     'automatic', 'electric', 'Dual Motor AWD',   'Long range Tesla Model 3 with autopilot.'),
('BMW',        '3 Series',     2022, 49999.00,  18000, 'sedan',    'used',     'Grey',    'automatic', 'gasoline', '2.0L TwinPower',   'Luxury BMW 3 Series in excellent condition.'),
('Mercedes',   'GLC 300',      2023, 58999.00,   9000, 'suv',      'featured', 'Black',   'automatic', 'gasoline', '2.0L Turbocharged','Premium Mercedes GLC 300 with full options.'),
('Hyundai',    'Tucson',       2023, 31999.00,  11000, 'suv',      'used',     'White',   'automatic', 'gasoline', '2.5L 4-Cylinder', 'Reliable Hyundai Tucson with great features.'),
('Kia',        'Sorento',      2022, 34999.00,  22000, 'suv',      'used',     'Blue',    'automatic', 'gasoline', '2.5L 4-Cylinder', 'Family-friendly Kia Sorento with 3rd row.'),
('Nissan',     'Altima',       2022, 26999.00,  19000, 'sedan',    'used',     'Silver',  'automatic', 'gasoline', '2.5L 4-Cylinder', 'Comfortable Nissan Altima with tech package.'),
('Ford',       'Mustang',      2023, 42999.00,   6000, 'coupe',    'featured', 'Red',     'manual',    'gasoline', '5.0L V8',          'Iconic Ford Mustang GT with V8 engine.'),
('Toyota',     'RAV4',         2023, 36999.00,  10000, 'suv',      'used',     'Green',   'automatic', 'gasoline', '2.5L 4-Cylinder', 'Popular Toyota RAV4 with AWD and safety suite.'),
('Honda',      'CR-V',         2022, 33999.00,  16000, 'suv',      'used',     'Brown',   'automatic', 'gasoline', '1.5L Turbocharged','Versatile Honda CR-V with spacious interior.'),
('Volkswagen', 'Golf GTI',     2023, 38999.00,   7000, 'sedan',    'new',      'White',   'manual',    'gasoline', '2.0L Turbocharged','Hot hatch Volkswagen Golf GTI performance.'),
('Audi',       'Q5',           2022, 54999.00,  14000, 'suv',      'used',     'Grey',    'automatic', 'gasoline', '2.0L TFSI',        'Sophisticated Audi Q5 with Quattro AWD.'),
('Tesla',      'Model Y',      2023, 61999.00,   3000, 'suv',      'new',      'White',   'automatic', 'electric', 'Long Range AWD',   'Tesla Model Y with maximum range and autopilot.'),
('Dodge',      'Challenger',   2022, 41999.00,  17000, 'coupe',    'used',     'Black',   'automatic', 'gasoline', '5.7L HEMI V8',     'Muscle car Dodge Challenger with HEMI V8.'),
('Subaru',     'Outback',      2023, 35999.00,   8000, 'suv',      'new',      'Blue',    'automatic', 'gasoline', '2.5L 4-Cylinder', 'Adventure-ready Subaru Outback with AWD.'),
('Jeep',       'Wrangler',     2022, 48999.00,  21000, 'suv',      'used',     'Orange',  'manual',    'gasoline', '3.6L Pentastar V6','Iconic Jeep Wrangler ready for off-road.'),
('Mazda',      'CX-5',         2023, 33499.00,   9500, 'suv',      'used',     'Red',     'automatic', 'gasoline', '2.5L 4-Cylinder', 'Elegant Mazda CX-5 with premium interior.'),
('Chevrolet',  'Silverado',    2022, 47999.00,  23000, 'truck',    'used',     'Black',   'automatic', 'gasoline', '5.3L V8',          'Heavy-duty Chevrolet Silverado work truck.'),
('Hyundai',    'Ioniq 5',      2023, 55999.00,   4000, 'electric', 'new',      'Silver',  'automatic', 'electric', 'Dual Motor AWD',   'Next-gen Hyundai Ioniq 5 electric SUV.');

-- ── DEALER RECORDS ──
INSERT INTO dealers (name, address, city, province, postal_code, phone, email, latitude, longitude, hours) VALUES
('CarDeals Windsor',     '100 Ouellette Ave',  'Windsor',     'Ontario', 'N9A 1A1', '519-555-0101', 'windsor@cardeals.com',     42.31490000, -83.03640000, 'Mon-Sat 9am-7pm'),
('CarDeals Toronto',     '200 King St W',       'Toronto',     'Ontario', 'M5H 1J8', '416-555-0102', 'toronto@cardeals.com',     43.64810000, -79.38320000, 'Mon-Sat 9am-8pm'),
('CarDeals Ottawa',      '300 Rideau St',       'Ottawa',      'Ontario', 'K1N 5Y1', '613-555-0103', 'ottawa@cardeals.com',      45.42150000, -75.69720000, 'Mon-Sat 9am-7pm'),
('CarDeals Mississauga', '400 Hurontario St',   'Mississauga', 'Ontario', 'L5B 1M4', '905-555-0104', 'miss@cardeals.com',        43.58900000, -79.64410000, 'Mon-Sun 9am-8pm'),
('CarDeals Hamilton',    '500 Main St E',       'Hamilton',    'Ontario', 'L8M 1H6', '905-555-0105', 'hamilton@cardeals.com',    43.25570000, -79.87110000, 'Mon-Sat 9am-6pm');