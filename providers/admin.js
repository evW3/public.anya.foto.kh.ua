const express = require('express');
const { AdminController } = require('../controllers/Admin');
const Token = require('../middleware/Token');
const router = express.Router();

router.post('/sign-in', AdminController.signIn);
router.get('/isValidToken', Token.verify, AdminController.isValidToken);

module.exports = router;