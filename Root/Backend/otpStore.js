const USE_REDIS = process.env.USE_REDIS === 'true';
let client = null;

if (USE_REDIS) {
  const Redis = require('ioredis');
  client = new Redis(process.env.REDIS_URL);
  client.on('error', (err)=>console.error('Redis error', err));
}

const otpMap = new Map(); // fallback

async function setOTP(key, otp, ttlSeconds = 300) {
  if (USE_REDIS) {
    await client.setex(key, ttlSeconds, otp);
  } else {
    otpMap.set(key, { otp, expiresAt: Date.now() + ttlSeconds * 1000 });
  }
}

async function getOTP(key) {
  if (USE_REDIS) {
    const val = await client.get(key);
    return val;
  } else {
    const rec = otpMap.get(key);
    if (!rec) return null;
    if (Date.now() > rec.expiresAt) {
      otpMap.delete(key);
      return null;
    }
    return rec.otp;
  }
}

async function deleteOTP(key) {
  if (USE_REDIS) {
    await client.del(key);
  } else {
    otpMap.delete(key);
  }
}

module.exports = { setOTP, getOTP, deleteOTP };
