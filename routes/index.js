const express = require("express");

const router = express.Router();
const devis = require("./devis");
const bl = require("./bl");
const facture = require("./facture");
const avoir = require("./avoir");
const journal = require("./journal");
const journalClient = require("./journal.client");

router.use("/api/devis", devis);
router.use("/api/bl", bl);
router.use("/api/facture", facture);
router.use("/api/avoir", avoir);
router.use("/api/journal", journal);
router.use("/api/journal/client", journalClient);

const arx = require('./arx');
router.use('/api/arx', arx);

module.exports = router;
