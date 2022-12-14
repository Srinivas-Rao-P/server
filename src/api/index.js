const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/auth', require('../service/auth'));

module.exports = router;