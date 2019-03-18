const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const secure = require('express-secure-only');

module.exports = (app) => {
    app.enable('trust proxy');

    app.use(secure());

    app.use(helmet({
        cacheControl: false,
        frameguard: false
    }));

    app.use('/api/', rateLimit({
        windowMs: 30 * 1000, // seconds
        delayMs: 0,
        max: 6,
        message: JSON.stringify({
            error: 'Too many requests, please try again in 30 seconds.',
            code: 429
        })
    }));
};