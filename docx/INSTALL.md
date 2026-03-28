Installation Guide: Wise Web Warriors

This document outlines the steps required to deploy the CarDeals platform on a fresh server or local environment.

1. System Requirements
Before starting, ensure you have the following installed:
* **Node.js** (LTS version recommended)
* **MySQL Server** (8.0+)
* **npm** (comes with Node.js)

### 2. Database Initialization
1. Open your MySQL client (Workbench, Terminal, etc.).
2. Execute the script found in `/database/schema.sql` to build the required table structures.
3. (Optional) Run `/database/seed.sql` to populate the platform with initial vehicle data and test users.

### 3. Backend Configuration
1. Navigate to the `/backend` directory.
2. Run `npm install` to pull in dependencies like Express, JWT, and Bcrypt.
3. Create a file named `development.env` in the backend root.
4. Configure your environment variables:
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=cardeals_db
   JWT_SECRET=a_secure_random_string