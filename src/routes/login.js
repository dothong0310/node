const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

router.use('/', loginController.index);

module.exports = router;