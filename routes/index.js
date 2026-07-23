const express = require("express");

const router = express.Router();

// DAF360 HR attestations (consumed by daf360-rh-service via /pdf/api/arx/*).
const arx = require("./arx");
const render = require("./render");

router.use("/api/arx", arx);
router.use("/api/render", render);

module.exports = router;
