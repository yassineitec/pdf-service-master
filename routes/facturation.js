const express = require("express");
const router = express.Router();
const { generateFacturationPdf, generateFacturationPdfFromSource } = require("../services/facturation");

// Aperçu (brouillon, non numéroté) d'une facture en mode AV — consommé par
// daf360-facturation-service via /pdf/api/facturation/facture-av-preview, à la demande
// du bouton "Exporter en PDF" de l'étape Récapitulatif de l'assistant de création.
router.post("/facture-av-preview", async (req, res) => {
  try {
    const pdf = await generateFacturationPdf("facture-av-preview", req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="facture-apercu.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Maquette éditable (admin des maquettes de facture, daf360-facturation-service) : le
// corps porte le SOURCE HTML/Handlebars lui-même (pas un nom de fichier), compilé ici
// avec le vrai moteur Handlebars — préserve {{#each}}/{{#if}}, contrairement au
// remplacement littéral {{clé}} utilisé pour les maquettes RH.
router.post("/render-source", async (req, res) => {
  try {
    const { htmlSource, data } = req.body;
    if (!htmlSource) {
      res.status(400).json({ error: "htmlSource requis" });
      return;
    }
    const pdf = await generateFacturationPdfFromSource(htmlSource, data || {});
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="apercu-maquette.pdf"',
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
