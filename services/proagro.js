const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const handlebars = require("handlebars");
const { numberToFrench } = require("../utils/NumbersToLetters");

exports.devis = async (req, res) => {
  try {
    const data = {
      ...req.body,
      showTVA: !req.body.exonore,
      totalLetters: numberToFrench(Number(req.body.total).toFixed(3)),
    };

    const baseDir = process.cwd();

    const templatePath = path.join(baseDir, "templates", "proagro", "devis.proagro.html");
    const logoPath = path.join(baseDir, "assets", "logos", "logo-proagro.png");

    const source = fs.readFileSync(templatePath, "utf8");

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("formatMillimes", (value) =>
      Number(value).toFixed(3)
    );

    handlebars.registerHelper("inc", (value) => {
      return value + 1;
    });

    const template = handlebars.compile(source);
    const html = template(data);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=devis.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};

exports.bl = async (req, res) => {
  try {
    const data = req.body;

    const baseDir = process.cwd();

    const templatePath = path.join(baseDir, "templates", "proagro", "bl.proagro.html");
    const logoPath = path.join(baseDir, "assets", "logos", "logo-proagro.png");

    const source = fs.readFileSync(templatePath, "utf8");

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("formatMillimes", (value) =>
      Number(value).toFixed(3)
    );

    handlebars.registerHelper("inc", (value) => {
      return value + 1;
    });

    // Compile HTML
    const template = handlebars.compile(source);
    const html = template(data);

    // Launch Chromium
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Inject HTML
    await page.setContent(html, {
      waitUntil: "load", // safer than "networkidle" for local assets
    });

    // Wait small delay (fonts rendering fix)
    await page.waitForTimeout(300);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    // Send PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=bl.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};

exports.facture = async (req, res) => {
  try {
    const data = {
      ...req.body,
      showTVA: !req.body.exonore,
      totalLetters: numberToFrench(Number(req.body.total).toFixed(3)),
    };

    const baseDir = process.cwd();

    const templatePath = path.join(
      baseDir,
      "templates",
      "proagro",
      "facture.proagro.html"
    );
    const logoPath = path.join(baseDir, "assets", "logos", "logo-proagro.png");

    const source = fs.readFileSync(templatePath, "utf8");

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("formatMillimes", (value) =>
      Number(value).toFixed(3)
    );

    handlebars.registerHelper("inc", (value) => {
      return value + 1;
    });

    const template = handlebars.compile(source);
    const html = template(data);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};

exports.avoir = async (req, res) => {
  try {
    const data = {
      ...req.body,
      showTVA: !req.body.exonore,
    };

    const templatePath = path.join(
      baseDir,
      "templates",
      "proagro",
      "avoir.proagro.html"
    );
    const source = fs.readFileSync(templatePath, "utf8");

    const logoPath = path.join(
      __dirname,
      "..",
      "assets",
      "logos",
      "logo-proagro.png"
    );

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("formatMillimes", (value) =>
      Number(value).toFixed(3)
    );

    handlebars.registerHelper("inc", (value) => {
      return value + 1;
    });

    const template = handlebars.compile(source);
    const html = template(data);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=avoir.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};

exports.journal = async (req, res) => {
  try {
    const data = req.body;

    const baseDir = process.cwd();

    const templatePath = path.join(
      baseDir,
      "templates",
      "proagro",
      "journal.proagro.html"
    );
    const logoPath = path.join(baseDir, "assets", "logos", "logo-proagro.png");

    const source = fs.readFileSync(templatePath, "utf8");

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("inc", function (value) {
      return parseInt(value) + 1;
    });

    handlebars.registerHelper("formatMillimes", function (value) {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? "0.000" : numValue.toFixed(3);
    });

    handlebars.registerHelper("gt", function (a, b) {
      return a > b;
    });

    handlebars.registerHelper("eq", function (a, b) {
      return a === b;
    });

    handlebars.registerHelper("subtract", function (a, b) {
      return parseFloat(a) - parseFloat(b);
    });

    const template = handlebars.compile(source);
    const html = template(data);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=journal.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};

exports.journalClient = async (req, res) => {
  try {
    const data = req.body;
    
    const baseDir = process.cwd();

    const templatePath = path.join(
      baseDir,
      "templates",
      "proagro",
      "journalClient.proagro.html"
    );
    const logoPath = path.join(
      baseDir,
      "assets",
      "logos",
      "logo-proagro.png"
    );

    const source = fs.readFileSync(templatePath, "utf8");

    if (!fs.existsSync(logoPath)) {
      console.error("⚠️ Logo not found at:", logoPath);
    }

    const logoBase64 = fs.readFileSync(logoPath).toString("base64");
    data.logoBase64 = `data:image/png;base64,${logoBase64}`;

    handlebars.registerHelper("inc", function (value) {
      return parseInt(value) + 1;
    });

    handlebars.registerHelper("formatMillimes", function (value) {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? "0.000" : numValue.toFixed(3);
    });

    handlebars.registerHelper("gt", function (a, b) {
      return a > b;
    });

    handlebars.registerHelper("eq", function (a, b) {
      return a === b;
    });

    handlebars.registerHelper("subtract", function (a, b) {
      return parseFloat(a) - parseFloat(b);
    });

    const template = handlebars.compile(source);
    const html = template(data);

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=journal.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "PDF generation failed",
      details: err.message,
    });
  }
};
