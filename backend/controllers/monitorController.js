const db = require('../config/db');

// ── CHECK DATABASE STATUS ──
// Tries a simple query to confirm DB is reachable
const checkDatabase = async () => {
  try {
    await db.query('SELECT 1');
    return { service: 'MySQL Database', status: 'online' };
  } catch (error) {
    return { service: 'MySQL Database', status: 'offline', error: error.message };
  }
};

// ── CHECK AUTH SERVICE ──
// Verifies the auth routes are registered and reachable
const checkAuthService = () => {
  try {
    const router = require('../routes/authRoutes');
    const isLoaded = typeof router === 'function';
    return {
      service: 'Auth Service',
      status: isLoaded ? 'online' : 'offline',
    };
  } catch (error) {
    return { service: 'Auth Service', status: 'offline', error: error.message };
  }
};

// ── CHECK CAR SERVICE ──
// Verifies the car routes are registered and reachable
const checkCarService = () => {
  try {
    const router = require('../routes/carRoutes');
    const isLoaded = typeof router === 'function';
    return {
      service: 'Car Listing Service',
      status: isLoaded ? 'online' : 'offline',
    };
  } catch (error) {
    return { service: 'Car Listing Service', status: 'offline', error: error.message };
  }
};

// ── CHECK USER SERVICE ──
// Verifies the user routes are registered and reachable
const checkUserService = () => {
  try {
    const router = require('../routes/userRoutes');
    const isLoaded = typeof router === 'function';
    return {
      service: 'User Service',
      status: isLoaded ? 'online' : 'offline',
    };
  } catch (error) {
    return { service: 'User Service', status: 'offline', error: error.message };
  }
};

// ── CHECK DEALER SERVICE ──
// Verifies the dealer routes are registered and reachable
const checkDealerService = () => {
  try {
    const router = require('../routes/dealerRoutes');
    const isLoaded = typeof router === 'function';
    return {
      service: 'Dealer Service',
      status: isLoaded ? 'online' : 'offline',
    };
  } catch (error) {
    return { service: 'Dealer Service', status: 'offline', error: error.message };
  }
};

// ── CHECK SERVER UPTIME ──
// Returns how long the server has been running in a readable format
const checkUptime = () => {
  const uptimeSeconds = process.uptime();
  const hours   = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  return {
    service: 'Server Uptime',
    status: 'online',
    uptime: `${hours}h ${minutes}m ${seconds}s`,
  };
};

// ── MAIN STATUS ENDPOINT ──
// Runs all checks and returns full system status report
const getStatus = async (req, res) => {
  try {
    // Run all checks — DB is async, rest are sync
    const [dbStatus] = await Promise.all([checkDatabase()]);

    const services = [
      dbStatus,
      checkAuthService(),
      checkCarService(),
      checkUserService(),
      checkDealerService(),
      checkUptime(),
    ];

    // Overall system status — online only if ALL services are online
    const allOnline = services.every((s) => s.status === 'online');

    res.status(200).json({
      system:    allOnline ? 'online' : 'degraded',
      timestamp: new Date().toISOString(),
      services,
    });
  } catch (error) {
    res.status(500).json({
      system:    'offline',
      timestamp: new Date().toISOString(),
      error:     error.message,
    });
  }
};

module.exports = { getStatus };