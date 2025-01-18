const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Extract token and remove any whitespace
        const token = authHeader.split(' ')[1]?.trim();

        if (!token) {
            return res.status(401).json({ error: 'Access denied. Invalid token format.' });
        }

        const verified = jwt.verify(token, JWT_SECRET);
        
        if (!verified) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        req.admin = verified;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = adminAuth;
