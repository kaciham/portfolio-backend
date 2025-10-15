/**
 * CORS Configuration
 * Centralized configuration for Cross-Origin Resource Sharing
 */

const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

// Production domains - Add your production domains here
const productionOrigins = [
    'https://kacihamroun.com',
    'https://kacihamroun.website',
    // Add regex patterns for subdomains
    /^https:\/\/.*\.kacihamroun\.com$/,
    /^https:\/\/.*\.kacihamroun\.website$/,
    // Common deployment platforms
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.netlify\.app$/,
    /^https:\/\/.*\.herokuapp\.com$/,
    /^https:\/\/.*\.railway\.app$/,
];

// Development patterns - Automatically allows common local development setups
const developmentPatterns = [
    // Local development servers
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/,
    /^http:\/\/0\.0\.0\.0:\d+$/,
    /^http:\/\/.*\.local:\d+$/,
    // Mobile and desktop app protocols
    'capacitor://localhost',
    'ionic://localhost',
    'file://',
    'tauri://localhost',
    'app://',
    // VS Code Live Server
    /^http:\/\/127\.0\.0\.1:5500$/,
    // Common React/Vue/Angular dev servers
    /^http:\/\/localhost:(3000|3001|5173|4200|8080)$/,
];

// Combined origins based on environment
const allowedOrigins = isDevelopment 
    ? [...productionOrigins, ...developmentPatterns]
    : productionOrigins;

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, curl, etc.)
        if (!origin) {
            return callback(null, true);
        }

        // Check against allowed origins
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') {
                return origin === allowed;
            }
            // RegExp pattern matching
            return allowed.test(origin);
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            if (isDevelopment) {
                console.warn(`❌ CORS blocked request from origin: ${origin}`);
                console.log('💡 To allow this origin, add it to the allowedOrigins in configs/cors.config.js');
            }
            callback(new Error(`CORS policy violation: Origin '${origin}' is not allowed`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Origin', 
        'Accept', 
        'X-Requested-With',
        'X-HTTP-Method-Override',
        'Cache-Control',
        'Pragma',
        'X-API-Key'
    ],
    exposedHeaders: [
        'Content-Range', 
        'X-Content-Range', 
        'X-Total-Count',
        'Location'
    ],
    credentials: true,
    // Shorter cache in development for easier testing
    maxAge: isDevelopment ? 600 : 86400, // 10 minutes in dev, 24 hours in prod
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Helper function to add new allowed origins dynamically
const addAllowedOrigin = (origin) => {
    if (typeof origin === 'string' || origin instanceof RegExp) {
        allowedOrigins.push(origin);
        console.log(`✅ Added new allowed origin: ${origin}`);
    }
};

// Helper function to check if an origin is allowed (for debugging)
const isOriginAllowed = (origin) => {
    if (!origin) return true;
    return allowedOrigins.some(allowed => {
        if (typeof allowed === 'string') {
            return origin === allowed;
        }
        return allowed.test(origin);
    });
};

module.exports = {
    corsOptions,
    addAllowedOrigin,
    isOriginAllowed,
    isDevelopment,
    allowedOrigins
};