const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const crypto = require('crypto');

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1
});

const validateWebhookSignature = (secret) => (req, res, next) => {
  const signature = req.headers['x-webhook-signature'];
  const calculated = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
    
  if (signature !== calculated) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  next();
};

const encryptData = (text, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex');
  return {
    encrypted: encrypted + cipher.final('hex'),
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex')
  };
};

module.exports = {
  securityMiddleware: [
    helmet(),
    (req, res, next) => {
      rateLimiter.consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).json({ error: 'Too many requests' }));
    }
  ],
  validateWebhookSignature,
  encryptData
};