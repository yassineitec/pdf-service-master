const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');


router.post('/proagro', proagroService.facture);
router.post('/ecochimix', ecochimixService.facture);

module.exports = router;