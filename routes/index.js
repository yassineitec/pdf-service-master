const express = require("express");

const router = express.Router();


// DAF360 HR attestations (consumed by daf360-rh-service via /pdf/api/arx/*).
const arx = require("./arx");
const render = require("./render");
// DAF360 facturation (consumed by daf360-facturation-service via /pdf/api/facturation/*).
const facturation = require("./facturation");

router.use("/api/arx", arx);
router.use("/api/render", render);
router.use("/api/facturation", facturation);

module.exports = router;
