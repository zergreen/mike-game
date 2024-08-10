const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/score', authController.score);
router.get('/score/:username', authController.scoreGetWithUsername);

module.exports = router;