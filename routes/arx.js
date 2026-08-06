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

router.post("/lettre-invitation-arx-france", async (req, res) => {
  try {
    const pdf = await generateArxPdf("lettre-invitation-arx-france", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="lettre-invitation-arx-france.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Offboarding documents -------------------------------------------------
// Same one-route-per-template shape as above. These are consumed by rh-service's
// offboarding stages 4 (décharge de restitution), 5 (attestation de fin de contrat,
// part of the Kit RH) and 6 (reçu pour solde de tout compte).

router.post("/decharge-restitution", async (req, res) => {
  try {
    const pdf = await generateArxPdf("decharge-restitution", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="decharge-restitution.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/attestation-fin-contrat", async (req, res) => {
  try {
    const pdf = await generateArxPdf("attestation-fin-contrat", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="attestation-fin-contrat.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/recu-solde-tout-compte", async (req, res) => {
  try {
    const pdf = await generateArxPdf("recu-solde-tout-compte", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="recu-solde-tout-compte.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
