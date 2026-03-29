# 🔐 CarDeals — Admin Documentation

A complete reference for all admin-facing functionality, covering what admins can do, which frontend components power each feature, and how the backend processes each action.

---

## 1. Admin Access & Authentication

### How It Works
Admin access is role-based. When a user logs in via `POST /api/auth/login`, the `authController.js` verifies their credentials, hashes passwords using bcrypt, and returns a signed JWT token. That token contains the user's role.

Every protected admin route passes through two middleware layers:

| Middleware | File | Purpose |
|---|---|---|
| JWT Verification | `authMiddleware.js` | Decodes and validates the JWT token, attaches `req.user` |
| Role Check | `adminMiddleware.js` | Checks `req.user.role === 'admin'`, returns 403 if not |

If either check fails, the request is blocked before it reaches the controller.

### Frontend Entry Point
- **`Login.jsx`** — Admin logs in here using email + password; JWT is stored and attached to all future requests via `api.js` (Axios instance with auth headers)
- **`PrivateRoute.jsx`** — Wraps all admin pages; redirects to login if no valid token is present
- **`AuthContext.jsx`** — Stores logged-in user state globally, including their role

---

## 2. Admin Dashboard Overview

**Frontend:** `AdminDashboard.jsx`  
**Backend:** Pulls from `/api/cars`, `/api/users`, `/api/monitor/status`

The dashboard is the admin's home screen. It shows high-level stats and live service health at a glance.

### What's Displayed
| Widget | Data Source | Description |
|---|---|---|
| Total Cars in Inventory | `GET /api/cars` | Count of all car records in the database |
| Total Registered Users | `GET /api/users` | Count of all user accounts |
| Recent Activity | User + Car models | Latest additions, edits, or signups |
| Service Health Panel | `GET /api/monitor/status` | Live status of DB, API, and other services |

### Backend Flow — Monitor
```
GET /api/monitor/status
  → monitorRoutes.js
  → monitorController.js
    → Pings MySQL connection pool (db.js)
    → Checks API process health
    → Returns { db: "online", api: "online", ... }
```

The `Monitor.jsx` page (linked from the dashboard) shows this in real time with color-coded indicators per service.

---

## 3. Car Listing Management

**Frontend:** `CarListingEditor.jsx`, `CarCard.jsx`, `CarBadge.jsx`  
**Backend Route Base:** `/api/cars`  
**Controller:** `carController.js`  
**Model:** `Car.js`

Admins have full CRUD control over car inventory. Regular users can only read (`GET`). All write operations require the admin JWT.

### 3a. View All Cars
```
GET /api/cars
  → carRoutes.js
  → carController.js → Car.js (findAll)
  → Returns paginated list of car records
```
- Supports pagination (page, limit query params)
- Displayed in `CarListingEditor.jsx` as an editable table, and in `CarGrid.jsx` / `Inventory.jsx` for public users

### 3b. Add a New Car
```
POST /api/cars                  ← Admin only (adminMiddleware)
  → carRoutes.js
  → carController.js → Car.js (insert)
  → Inserts new row into cars table
```
**Fields accepted:** make, model, year, price, mileage, category (SUV/Sedan/Truck/Electric), transmission, engine, condition (New/Used/Featured), images, video URL, description

The `CarListingEditor.jsx` form submits this payload. On success, the new car appears in inventory with the appropriate `CarBadge.jsx` label (New, Used, Featured).

### 3c. Edit an Existing Car
```
PUT /api/cars/:id               ← Admin only
  → carRoutes.js
  → carController.js → Car.js (update)
  → Updates matching row by car ID
```
- Admin clicks "Edit" in `CarListingEditor.jsx`, which pre-fills the form with the car's current data
- On submit, a `PUT` request is sent with updated fields
- Only changed fields need to be included; unchanged fields are preserved

### 3d. Delete a Car
```
DELETE /api/cars/:id            ← Admin only
  → carRoutes.js
  → carController.js → Car.js (delete)
  → Removes row from cars table
```
- Triggered by the "Delete" button in `CarListingEditor.jsx`
- A confirmation `Modal.jsx` appears before the request is sent
- Once deleted, the car is removed from all public listings

---

## 4. User Account Management

**Frontend:** `UserManager.jsx`  
**Backend Route Base:** `/api/users`  
**Controller:** `userController.js`  
**Model:** `User.js`

Admins can view all users and perform account-level actions such as disabling accounts or promoting users to admin.

### 4a. View All Users
```
GET /api/users                  ← Admin only
  → userRoutes.js
  → userController.js → User.js (findAll)
  → Returns list of all user accounts
```
Displayed in `UserManager.jsx` as a sortable/searchable table with columns: ID, Name, Email, Role, Status (active/disabled), Join Date.

### 4b. Disable a User Account
```
PUT /api/users/:id/disable      ← Admin only
  → userRoutes.js
  → userController.js → User.js (update: { status: 'disabled' })
  → Sets user status to disabled in DB
```
- Disabled users cannot log in; their JWT will be rejected since `authMiddleware.js` checks active status
- Useful for handling abuse, fraudulent accounts, or policy violations
- The action is reversible — the same update flow can re-enable the account

### 4c. Promote a User to Admin
```
PUT /api/users/:id/promote      ← Admin only
  → userRoutes.js
  → userController.js → User.js (update: { role: 'admin' })
  → Sets user role to 'admin' in DB
```
- On the user's next login, their JWT will contain `role: 'admin'`
- They immediately gain access to all admin-only routes and frontend admin pages
- The `adminMiddleware.js` reads role from the decoded JWT on every request

---

## 5. Theme Management

**Frontend:** `ThemeManager.jsx`, `ThemeSwitcher.jsx`  
**Context:** `ThemeContext.jsx`  
**Theme Files:** `theme-default.css`, `theme-dark.css`, `theme-sport.css`

Admins can change the active site-wide theme, which affects all users.

### How It Works
1. Admin opens `ThemeManager.jsx` and previews available themes: Default, Dark, Sport
2. On selecting a theme, `ThemeContext.jsx` updates the active theme name
3. The root `App.jsx` applies the corresponding CSS file (`theme-*.css`) to the entire app
4. The `useTheme.js` hook is used throughout all components to reactively apply theme-aware styling

> **Note:** Theme selection is currently a frontend/context-level operation. For persistence across sessions/users, the active theme can be stored in the database and fetched on app load.

---

## 6. Service Health Monitoring

**Frontend:** `Monitor.jsx`  
**Backend Route:** `GET /api/monitor/status`  
**Controller:** `monitorController.js`

Admins can view real-time status of all critical services.

### Services Monitored
| Service | How It's Checked |
|---|---|
| MySQL Database | Runs a lightweight test query via `db.js` connection pool |
| Express API | Checks if the API process is responding |
| Additional services | Extensible — any external service can be added to `monitorController.js` |

### Response Shape
```json
{
  "db": "online",
  "api": "online",
  "timestamp": "2025-06-10T14:32:00Z"
}
```

`Monitor.jsx` polls this endpoint and renders color-coded indicators (green = online, red = offline) for each service. This is the admin's first signal if something goes wrong in production.

---

## 7. Admin Route Protection Summary

Every admin action is protected by this middleware chain:

```
Request
  → authMiddleware.js     (Is there a valid JWT? Who is this user?)
  → adminMiddleware.js    (Is this user an admin?)
  → Controller function   (Execute the action)
  → Response
```

If `authMiddleware.js` fails → `401 Unauthorized`  
If `adminMiddleware.js` fails → `403 Forbidden`  
If both pass → action proceeds normally

---

## 8. Admin Functionality Quick Reference

| Feature | Frontend File | Route | Method | Middleware |
|---|---|---|---|---|
| View dashboard stats | `AdminDashboard.jsx` | `/api/cars`, `/api/users` | GET | auth + admin |
| Monitor service health | `Monitor.jsx` | `/api/monitor/status` | GET | auth + admin |
| View all car listings | `CarListingEditor.jsx` | `/api/cars` | GET | auth + admin |
| Add a car listing | `CarListingEditor.jsx` | `/api/cars` | POST | auth + admin |
| Edit a car listing | `CarListingEditor.jsx` | `/api/cars/:id` | PUT | auth + admin |
| Delete a car listing | `CarListingEditor.jsx` | `/api/cars/:id` | DELETE | auth + admin |
| View all users | `UserManager.jsx` | `/api/users` | GET | auth + admin |
| Disable a user | `UserManager.jsx` | `/api/users/:id/disable` | PUT | auth + admin |
| Promote a user to admin | `UserManager.jsx` | `/api/users/:id/promote` | PUT | auth + admin |
| Switch site theme | `ThemeManager.jsx` | (context-based) | — | Frontend only |
