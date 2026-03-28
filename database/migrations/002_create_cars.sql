USE cardeals_db;

CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  mileage INT NOT NULL,
  category ENUM('sedan', 'suv', 'truck', 'electric', 'coupe', 'van') NOT NULL,
  tag ENUM('new', 'used', 'featured') DEFAULT 'used',
  color VARCHAR(50),
  transmission ENUM('automatic', 'manual') DEFAULT 'automatic',
  fuel_type ENUM('gasoline', 'diesel', 'electric', 'hybrid') DEFAULT 'gasoline',
  engine VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  is_available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);