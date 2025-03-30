/**
 * Requiers - FindByProps
 * data/findByProps.js
 */

// Bot
findByProps('getCurrentUser').getCurrentUser().bot = true;

// Verified Bot
findByProps('getCurrentUser').getCurrentUser().bot = true;
findByProps('getCurrentUser').getCurrentUser().flags = 65536;

// System
findByProps('getCurrentUser').getCurrentUser().system = true;

// AI (Only visible in profile)
findByProps('getCurrentUser').getCurrentUser().isClyde = () => true;
