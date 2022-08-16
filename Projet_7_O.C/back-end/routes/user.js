const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require('express-rate-limit');

const userLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 20 minutes)
});

router.post('/signup', userLimiter, userCtrl.signup);
router.post('/login', userLimiter, userCtrl.login);
router.get('/user', userCtrl.getUser);

module.exports = router;
