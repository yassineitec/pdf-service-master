const express = require('express');

const router = express.Router();
const proagroService = require('../services/proagro');
const ecochimixService = require('../services/ecochimix');


router.post('/proagro', proagroService.bl);
router.post('/ecochimix', ecochimixService.bl);

module.exports = router;