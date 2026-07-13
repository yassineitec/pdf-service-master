const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');

router.post('/proagro', proagroService.devis);
router.post('/ecochimix', ecochimixService.devis);

module.exports = router;