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

// DAF360 HR attestations (consumed by daf360-rh-service via /pdf/api/arx/*).
const arx = require("./arx");
const render = require("./render");

router.use("/api/arx", arx);
router.use("/api/render", render);

module.exports = router;
