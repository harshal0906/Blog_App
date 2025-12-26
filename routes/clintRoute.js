const express = require('express');
const clintPage = require('../controller/clintcontreller');

const router = express.Router();

router.get('/', clintPage);

module.exports = router;