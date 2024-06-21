const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');

const app = express();
const port = 3000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    // Add more transports (e.g., file) as needed
  ],
});

// Middleware to log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
const corsOptions = {
  origin: 'https://esago.alfinx.com', // Your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' })); // Increase limit if necessary

app.post('/', async (req, res) => {
  const { html } = req.body;
        console.log('yarraq')
  if (!html) {
    logger.error('HTML content is required');
    return res.status(400).send('HTML content is required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=output.pdf',
    });
    res.send(pdfBuffer);
    logger.info('PDF generated and sent successfully');
  } catch (error) {
    logger.error(`Error generating PDF: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  logger.info(`Server is running on https://esago.alfinx.com/generate_pdf`);
});