const express = require("express");
const router = express.Router();
const { generateArxPdf } = require("../services/arx");

router.post("/decharge-responsabilite", async (req, res) => {
  try {
    const pdf = await generateArxPdf("decharge-responsabilite", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="decharge-responsabilite.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-travail", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-travail", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-travail.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-salaire", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-salaire", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-salaire.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-non-benefice-pret", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-non-benefice-pret", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-non-benefice-pret.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-titularisation", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-titularisation", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-titularisation.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-domiciliation-salaire", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-domiciliation-salaire", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-domiciliation-salaire.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
