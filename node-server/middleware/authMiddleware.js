import { SECRET_PHRASE } from "../config/serverConfig.js";
import jwt from 'jsonwebtoken';

// Middleware to protect routes
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid authorization header',
    });
  }

  const token = authHeader.substring(7);
  const result = verifyAccessToken(token);

  if (!result.valid) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: result.error,
    });
  }

  req.user = {
    id: result.decoded.sub,
    email: result.decoded.email,
    roles: result.decoded.roles,
  };

  next();
}

function verifyAccessToken(token) {
  try {
    /*const decoded = jwt.verify(token, SECRET_PHRASE, {
      algorithms: ['HS256'], // CRITICAL: prevents algorithm substitution attacks
      //issuer: 'type-app',    // Verify token was issued by us
      //audience: 'type-api',  // Verify token was meant for us
    });*/
    const decoded = jwt.verify(token, SECRET_PHRASE);

    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Role-based authorization
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const hasRole = roles.some(role => req.user.roles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}