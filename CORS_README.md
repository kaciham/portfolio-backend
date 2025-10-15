# CORS Configuration Guide

## Overview
This portfolio backend uses an optimized CORS (Cross-Origin Resource Sharing) configuration that automatically adapts between development and production environments.

## Features

### 🔄 Environment-Aware Configuration
- **Development**: Permissive settings for easy local development
- **Production**: Strict settings for security

### 🌍 Smart Origin Matching
- Exact string matching for specific domains
- RegExp pattern matching for subdomains and dynamic URLs
- Automatic support for common development ports

### 🛠️ Development-Friendly
- Automatic detection of local development servers
- Support for mobile app protocols (Capacitor, Ionic)
- Helpful logging and debugging information

## Configuration

### Adding New Allowed Origins

#### For Production Domains
Edit `configs/cors.config.js` and add to the `productionOrigins` array:

```javascript
const productionOrigins = [
    'https://kacihamroun.com',
    'https://yournewdomain.com',  // Add new domain
    /^https:\/\/.*\.yournewdomain\.com$/,  // Pattern for subdomains
];
```

#### For Development
Development patterns are already comprehensive, but you can add specific patterns to `developmentPatterns` if needed.

### Dynamic Origin Addition
You can also add origins programmatically:

```javascript
const { addAllowedOrigin } = require('./configs/cors.config.js');

// Add a specific domain
addAllowedOrigin('https://newclient.com');

// Add a pattern for subdomains
addAllowedOrigin(/^https:\/\/.*\.newclient\.com$/);
```

## Debugging CORS Issues

### Development Mode
In development, the server will log blocked origins and provide hints:

```
❌ CORS blocked request from origin: https://unauthorized-site.com
💡 To allow this origin, add it to the allowedOrigins in configs/cors.config.js
```

### Check if Origin is Allowed
Use the helper function to test origins:

```javascript
const { isOriginAllowed } = require('./configs/cors.config.js');

console.log(isOriginAllowed('https://kacihamroun.com')); // true
console.log(isOriginAllowed('https://unauthorized.com')); // false
```

## Environment Variables

Set `NODE_ENV=production` for production deployment to enable strict CORS policies:

```bash
NODE_ENV=production npm start
```

## Common Development Origins Supported

The configuration automatically supports:
- `http://localhost:*` (any port)
- `http://127.0.0.1:*` (any port)
- `capacitor://localhost` (Capacitor apps)
- `ionic://localhost` (Ionic apps)
- `file://` (local file access)
- `tauri://localhost` (Tauri apps)

## Security Features

- Credentials support for authenticated requests
- Comprehensive allowed headers for modern web apps
- Proper preflight handling
- Error logging without exposing sensitive information in production

## Troubleshooting

### Common Issues

1. **"CORS policy violation" error**
   - Check if your frontend origin is in the allowed list
   - Verify the exact URL format (including protocol and port)

2. **Preflight requests failing**
   - Ensure your frontend sends proper preflight OPTIONS requests
   - Check that required headers are in the `allowedHeaders` list

3. **Credentials not working**
   - Verify both frontend and backend have `credentials: true`
   - Ensure origin is explicitly allowed (not wildcard)

### Testing CORS

Test your CORS configuration with curl:

```bash
# Test preflight request
curl -X OPTIONS \
  -H "Origin: https://kacihamroun.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  http://localhost:3000/api/test

# Test actual request
curl -X GET \
  -H "Origin: https://kacihamroun.com" \
  http://localhost:3000/api/test
```