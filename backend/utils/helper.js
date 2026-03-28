// ── SUCCESS RESPONSE WRAPPER ──
// Standardizes all success responses across the API
// Returns: { success: true, message, data }
const successResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// ── ERROR RESPONSE WRAPPER ──
// Standardizes all error responses across the API
// Returns: { success: false, message, error }
const errorResponse = (res, message, error = null, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error || null,
    });
};

// ── PAGINATION HELPER ──
// Calculates offset and total pages for paginated DB queries
// Returns: { limit, offset, totalPages }
const paginate = (page = 1, limit = 10, total = 0) => {
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);
    return { limit, offset, totalPages };
};

// ── VALIDATE REQUIRED FIELDS ──
// Checks if all required fields are present in the request body
// Returns: array of missing field names, empty array if all present
const validateFields = (body, requiredFields) => {
    return requiredFields.filter((field) => !body[field]);
};

// ── SANITIZE USER OUTPUT ──
// Strips sensitive fields (password) before sending user data to client
// Returns: user object without password field
const sanitizeUser = (user) => {
    const { password, ...sanitized } = user;
    return sanitized;
};

// ── FORMAT CURRENCY ──
// Formats a number into a readable CAD dollar string
// Example: 24500 → "$24,500.00 CAD"
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(amount);
};

// ── ASYNC HANDLER WRAPPER ──
// Wraps async route handlers to catch errors automatically
// Eliminates the need for try/catch in every controller
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    successResponse,
    errorResponse,
    paginate,
    validateFields,
    sanitizeUser,
    formatCurrency,
    asyncHandler,
};