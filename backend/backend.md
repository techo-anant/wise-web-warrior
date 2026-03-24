# 🛠️ CarDeals — Backend File Brief

## `/config` 
| File | Description |
|------|-------------|
| `db.js` | MySQL connection pool using mysql2, exports promise-based instance ✅| 
| `app.js` | Express app setup, registers CORS, JSON parsing, and all routes ✅|

---

## `/routes`
| File | Description |
|------|-------------|
| `authRoutes.js` | Endpoints for login, register, logout ✅|
| `carRoutes.js` | Endpoints for car listing CRUD operations ✅|
| `userRoutes.js` | Endpoints for user profile and admin user management ✅|
| `dealerRoutes.js` | Endpoints for fetching dealership locations |
| `monitorRoutes.js` | Endpoints for service and database health checks |

---

## `/controllers`
| File | Description |
|------|-------------|
| `authController.js` | Handles login logic, password hashing, JWT token generation ✅|
| `carController.js` | Handles fetching, creating, updating, and deleting car records ✅|
| `userController.js` | Handles profile updates, account disabling, role management ✅|
| `dealerController.js` | Handles fetching dealer branch data and locations |
| `monitorController.js` | Pings DB and services, returns online/offline status per service |

---

## `/models`
| File | Description |
|------|-------------|
| `User.js` | SQL queries for user table — find, create, update, disable ✅|
| `Car.js` | SQL queries for car table — find all, find one, insert, update, delete ✅|
| `Dealer.js` | SQL queries for dealer table — find all locations, find by city |

---

## `/middleware`
| File | Description |
|------|-------------|
| `authMiddleware.js` | Verifies JWT token on protected routes, attaches user to request ✅|
| `adminMiddleware.js` | Checks if authenticated user has admin role, blocks if not ✅|

---

## `/utils`
| File | Description |
|------|-------------|
| `helpers.js` | Shared utility functions — error formatting, response wrappers |

---

## Root `/backend`
| File | Description |
|------|-------------|
| `server.js` | Entry point — starts Express server, listens on PORT from .env |
| `.env` | Environment variables — DB credentials, JWT secret, PORT ✅|
| `package.json` | Node dependencies and npm scripts (start, dev) |

---

## `/database`
| File | Description |
|------|-------------|
| `schema.sql` | Defines all tables — users, cars, dealers with columns and types |
| `seed.sql` | Inserts 20+ car records and sample users and dealer locations |
| `/migrations/001_create_users.sql` | Creates the users table |
| `/migrations/002_create_cars.sql` | Creates the cars table with all vehicle fields |
| `/migrations/003_create_dealers.sql` | Creates the dealers table with location fields |

---

## API Endpoints Summary

### Auth — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create a new user account |
| POST | `/login` | Authenticate user, return JWT token |
| POST | `/logout` | Invalidate user session |

### Cars — `/api/cars`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetch all car listings (paginated) |
| GET | `/:id` | Fetch a single car by ID |
| POST | `/` | Create a new car listing (admin only) |
| PUT | `/:id` | Update a car listing (admin only) |
| DELETE | `/:id` | Delete a car listing (admin only) |

### Users — `/api/users`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get logged-in user profile |
| PUT | `/profile` | Update logged-in user profile |
| GET | `/` | Get all users (admin only) |
| PUT | `/:id/disable` | Disable a user account (admin only) |
| PUT | `/:id/promote` | Promote user to admin (admin only) |

### Dealers — `/api/dealers`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetch all dealership locations |
| GET | `/:id` | Fetch a single dealership by ID |

### Monitor — `/api/monitor`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/status` | Returns online/offline status of DB and all services |