# 🚗 CarDeals — Installation Guide

This document outlines the steps required to deploy the CarDeals platform on a fresh server or local environment.

---

## 1. System Requirements

Before starting, ensure you have the following installed:

- [Node.js LTS](https://nodejs.org/) (v18 or higher recommended)
- [MySQL Server](https://dev.mysql.com/downloads/) (8.0+)
- npm (comes with Node.js)
- Git

Verify installations:
```bash
node -v
npm -v
mysql --version
git --version
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/techo-anant/wise-web-warrior.git
cd wise-web-warrior
```

---

## 3. Database Initialization

1. Open your MySQL client (Workbench, Terminal, etc.)
2. Create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

3. _(Optional)_ Seed the database with sample car listings and a default admin account:

```bash
mysql -u root -p < database/seed.sql
```

> **Default admin credentials after seeding:**
> - Email: `admin@cardeals.com`
> - Password: `Admin@123`

---

## 4. Backend Setup

### Navigate to backend:
```bash
cd backend
```

### Install dependencies:
```bash
npm install
```

### Create environment file:
```bash
touch development.env
```

### Configure environment variables in `development.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cardeals_db
DB_PORT=3306
JWT_SECRET=a_secure_random_string
```

> To generate a secure JWT secret run:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### Start the backend server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend will be running at:
```
http://localhost:5000
http://localhost:5000/api
```

---

## 5. Frontend Setup

### Navigate to frontend:
```bash
cd ../frontend
```

### Install dependencies:
```bash
npm install
npm install react-scripts axios
```

### Create environment file:
```bash
touch .env
```

### Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start the frontend:
```bash
npm start
```

Frontend will be running at:
```
http://localhost:3000
```

---

## 6. Project Structure

```
wise-web-warrior/
├── backend/          # Node.js + Express REST API
├── frontend/         # React (CRA) frontend
├── database/
│   ├── schema.sql    # Table definitions
│   ├── seed.sql      # Sample data + admin user
│   └── migrations/   # Incremental DB changes
├── docs/             # Documentation
├── .gitignore
├── README.md
└── INSTALL.md
```

---

## 7. API Endpoints Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| GET | `/api/cars` | Get all car listings | Public |
| GET | `/api/cars/:id` | Get single car | Public |
| POST | `/api/cars` | Create car listing | Admin |
| PUT | `/api/cars/:id` | Update car listing | Admin |
| DELETE | `/api/cars/:id` | Remove car listing | Admin |
| GET | `/api/users` | Get all users | Admin |
| PUT | `/api/users/:id/disable` | Disable user | Admin |
| PUT | `/api/users/:id/promote` | Promote to admin | Admin |
| GET | `/api/dealers` | Get all dealers | Public |
| GET | `/api/monitor/status` | System health check | Admin |

---

## 8. Environment Variables Reference

### Backend (`development.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `yourpassword` |
| `DB_NAME` | Database name | `cardeals_db` |
| `DB_PORT` | MySQL port | `3306` |
| `JWT_SECRET` | JWT signing secret | `random_string` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | _(from Google Console)_ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | _(from Google Console)_ |
| `FRONTEND_URL` | Frontend URL for redirects | `http://localhost:3000` |

### Frontend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## 9. Deploying to Production

### Backend (Railway)
1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set root directory to `backend`
4. Add all environment variables in Railway Variables tab
5. Railway will auto-deploy on every push to `main`

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Set root directory to `frontend`
3. Add `REACT_APP_API_URL` pointing to your Railway backend URL
4. Vercel will auto-deploy on every push to `main`

### Database (Railway MySQL)
1. Add MySQL service in Railway
2. Use `${{MySQL.MYSQLHOST}}` style references in backend Variables
3. Run `schema.sql` and `seed.sql` via Railway's Data tab

---

## 10. Troubleshooting

| Issue | Fix |
|-------|-----|
| `Cannot find module` | Run `npm install` in the affected directory |
| `ECONNREFUSED` on DB | Check MySQL is running and credentials are correct |
| `JWT malformed` | Make sure `JWT_SECRET` is set in `.env` |
| Frontend blank page | Check `REACT_APP_API_URL` points to correct backend |
| `npm start` freezing | Run `export NODE_OPTIONS=--max_old_space_size=4096` first |

---

## 11. Default Admin Account

After running `seed.sql`:

| Field | Value |
|-------|-------|
| Email | `admin@cardeals.com` |
| Password | `Admin@123` |
| Role | `admin` |

> ⚠️ Change the admin password immediately after first login in production.