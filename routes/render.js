const express = require('express');
const router  = express.Router();
const { chromium } = require('playwright');

/**
 * POST /pdf/api/render
 * Body: { html: string, filename?: string }
 * Returns: application/pdf
 *
 * Generic HTML→PDF endpoint for dynamic document templates.
 * The caller is responsible for substituting all template variables before sending.
 */
router.post('/', async (req, res) => {
  const { html, filename = 'document.pdf' } = req.body;

  if (!html || typeof html !== 'string' || html.trim().length === 0) {
    return res.status(400).json({ error: 'html is required and must be a non-empty string' });
  }

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}"`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error('[render] PDF generation failed:', err.message);
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;
