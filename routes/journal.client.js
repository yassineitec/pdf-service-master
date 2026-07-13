const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');

router.post('/proagro', proagroService.journalClient);
router.post('/ecochimix', ecochimixService.journalClient);

module.exports = router;