import {createRequire} from 'node:module';
//import crypto  from 'node:crypto';
//import jwt from 'jsonwebtoken';

//import { jwtConfig } from './config/serverConfig.js';

const require = createRequire(import.meta.url);
const readJSON = (path) => require(path);

export default readJSON;

/*export function checkJWTTokensExistenceForServer(){
    if (!jwtConfig.accessToken.secret || jwtConfig.accessToken.secret.length < 32) {
        throw new Error('JWT_ACCESS_SECRET must be at least 32 characters');
    }
}

export function generateTokens(user){

    const accessToken = jwt.sign(
    {
      sub: user.id,           // Subject: user identifier
      email: user.email,      // Include for convenience
      roles: user.roles,      // For role-based access control
      type: 'access',         // Token type for validation
    },
    jwtConfig.accessToken.secret,
    {
      expiresIn: jwtConfig.accessToken.expiresIn,
      algorithm: 'HS256',     // Explicit algorithm prevents substitution
      issuer: 'your-app',     // Validates token origin
      audience: 'your-api',   // Validates intended recipient
    }
  );

  // Generate unique ID for refresh token revocation tracking
  const refreshTokenId = crypto.randomUUID();

  // Refresh token: used only to get new access tokens
  // Minimal payload - just enough to identify user and token
  const refreshToken = jwt.sign(
    {
      sub: user.id,
      jti: refreshTokenId,    // JWT ID: unique identifier for revocation
      type: 'refresh',        // Token type for validation
    },
    jwtConfig.refreshToken.secret,
    {
      expiresIn: jwtConfig.refreshToken.expiresIn,
      algorithm: 'HS256',
      issuer: 'your-app',
    }
  );

  return {
    accessToken,
    refreshToken,
    refreshTokenId,  // Store this for revocation tracking
  };
}

// Verify and decode an access token
function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, jwtConfig.accessToken.secret, {
      algorithms: ['HS256'], // CRITICAL: prevents algorithm substitution attacks
      issuer: 'type-app',    // Verify token was issued by us
      audience: 'type-api',  // Verify token was meant for us
    });

    // Ensure this is actually an access token, not a refresh token
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}*/

//********************************************** */

// In-memory store for development (use Redis in production)
/*const refreshTokenStore = new Map();

// Store a refresh token with metadata for security tracking
export async function storeRefreshToken(userId, tokenId, metadata) {
  const key = `refresh:${userId}`;
  let userTokens = refreshTokenStore.get(key) || [];

  // Limit active sessions per user (e.g., max 5 devices)
  // Prevents unlimited token accumulation
  if (userTokens.length >= 5) {
    userTokens = userTokens.slice(-4); // Remove oldest, keep last 4
  }

  userTokens.push({
    tokenId,
    createdAt: Date.now(),
    ...metadata,  // Store IP, user agent for session management UI
  });

  refreshTokenStore.set(key, userTokens);
}

// Revoke a specific refresh token (used after rotation or logout)
async function revokeRefreshToken(userId, tokenId) {
  const key = `refresh:${userId}`;
  const userTokens = refreshTokenStore.get(key) || [];
  // Filter out the revoked token
  refreshTokenStore.set(key, userTokens.filter(t => t.tokenId !== tokenId));
}

// Check if a refresh token is still valid (not revoked)
async function isRefreshTokenValid(userId, tokenId) {
  const key = `refresh:${userId}`;
  const userTokens = refreshTokenStore.get(key) || [];
  return userTokens.some(t => t.tokenId === tokenId);
}

// Nuclear option: revoke ALL user tokens (password change, security breach)
async function revokeAllUserTokens(userId) {
  const key = `refresh:${userId}`;
  refreshTokenStore.delete(key);
}*/

// Token refresh endpoint with rotation
// This is the core of the security model - each refresh invalidates the old token
/*app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {
    // Step 1: Verify the refresh token signature and claims
    const decoded = jwt.verify(refreshToken, config.refreshToken.secret, {
      algorithms: ['HS256'],
    });

    // Ensure we're dealing with a refresh token, not an access token
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ error: 'Invalid token type' });
    }

    // Step 2: Check if token is in our store (not already used/revoked)
    const isValid = await isRefreshTokenValid(decoded.sub, decoded.jti);
    if (!isValid) {
      // SECURITY ALERT: Token was already used or revoked
      // This could indicate token theft - attacker used it before user
      // Revoke ALL user tokens as a security precaution
      await revokeAllUserTokens(decoded.sub);

      console.warn(`Refresh token reuse detected for user ${decoded.sub}`);
      return res.status(401).json({
        error: 'Token revoked',
        message: 'Please log in again',
      });
    }

    // Step 3: Immediately revoke the used refresh token (rotation)
    // Even if the response fails, the old token is now invalid
    await revokeRefreshToken(decoded.sub, decoded.jti);

    // Step 4: Get fresh user data (roles may have changed)
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Step 5: Generate new token pair
    const tokens = generateTokens(user);

    // Step 6: Store new refresh token for future validation
    await storeRefreshToken(user.id, tokens.refreshTokenId, {
      userAgent: req.get('User-Agent'),
      ip: req.ip,
    });

    // Return new tokens to client
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired' });
    }
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});*/