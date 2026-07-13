const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');

router.post('/proagro', proagroService.journal);
router.post('/ecochimix', ecochimixService.journal);

module.exports = router;