const express = require("express");

const router = express.Router();

// DAF360 HR attestations (consumed by daf360-rh-service via /pdf/api/arx/*).
const arx = require("./arx");
router.use("/api/arx", arx);

module.exports = router;
