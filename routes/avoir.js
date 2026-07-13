const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');


router.post('/proagro', proagroService.avoir);
router.post('/ecochimix', ecochimixService.avoir);

module.exports = router;