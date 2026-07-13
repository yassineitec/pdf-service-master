const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const handlebars = require("handlebars");

async function generateArxPdf(templateName, data) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "arx",
    templateName + ".html"
  );
  const logoPath = path.join(
    __dirname,
    "..",
    "assets",
    "logos",
    "arxx.png"
  );

  const source = fs.readFileSync(templatePath, "utf8");

  let logoBase64 = null;
  try {
    if (fs.existsSync(logoPath)) {
      logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
    } else {
      console.warn("⚠️ ARX logo not found at:", logoPath);
    }
  } catch (e) {
    console.warn("⚠️ Could not load ARX logo:", e.message);
    logoBase64 = null;
  }

  const templateData = {
    ...data,
    logoBase64,
  };

  handlebars.registerHelper("formatMillimes", (value) =>
    Number(value).toFixed(3)
  );

  handlebars.registerHelper("inc", (value) => {
    return value + 1;
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
  const html = template(templateData);

  const browser = await chromium.launch({
    headless: true,
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

  return pdfBuffer;
}

module.exports = { generateArxPdf };
