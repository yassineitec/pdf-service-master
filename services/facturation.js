const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const handlebars = require("handlebars");

// Enregistrés ici aussi (pas seulement dans services/arx.js) : ce module doit rester
// utilisable même si aucune route ARX n'a encore été appelée dans ce process — les
// helpers Handlebars sont globaux au module require("handlebars"), donc réenregistrer
// le même nom avec le même comportement est sans risque (juste redondant si arx.js
// est aussi chargé).
handlebars.registerHelper("inc", (value) => value + 1);

async function renderHtmlToPdf(html) {
  // try/finally : sans ça, un htmlContent qui fait planter/traîner page.setContent()
  // (ex. <img src> vers un hôte injoignable, boucle busy en <script>) laisse le
  // navigateur Chromium ouvert — fuite de process partagé avec les routes arx.js/
  // render.js du même conteneur. Repéré en revue adversariale sur generateFacturationPdfFromSource
  // (maquettes éditables = HTML désormais fourni par un admin, plus seulement un
  // fichier développeur) puis corrigé aussi ici par cohérence.
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });
    await page.waitForTimeout(300);

    return await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    if (browser) await browser.close();
  }
}

async function generateFacturationPdf(templateName, data) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "facturation",
    templateName + ".html"
  );

  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);
  const html = template(data);

  return renderHtmlToPdf(html);
}

/**
 * Variante "maquette éditable" : compile le SOURCE HTML/Handlebars fourni directement
 * (pas un nom de fichier sur disque) — utilisée par FactPdfService.renderFromSource()
 * quand une maquette active existe en base pour ce mode de facturation. Même moteur
 * Handlebars, mêmes helpers, même pipeline Playwright que generateFacturationPdf() —
 * seule la provenance du source HTML change.
 */
async function generateFacturationPdfFromSource(htmlSource, data) {
  const template = handlebars.compile(htmlSource);
  const html = template(data);

  return renderHtmlToPdf(html);
}

module.exports = { generateFacturationPdf, generateFacturationPdfFromSource };
