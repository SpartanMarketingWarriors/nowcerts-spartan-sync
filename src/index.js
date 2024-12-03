const express = require('express');
const cron = require('node-cron');
const config = require('./config');
const ContactSync = require('./sync/ContactSync');
const logger = require('./utils/logger');
const GHLAPI = require('./services/GHLAPI');
const { securityMiddleware, validateWebhookSignature } = require('./middleware/security');

const app = express();

// Apply security middleware
app.use(express.json());
app.use(securityMiddleware);

// Secure webhook endpoint
app.post('/webhook/ghl', 
  validateWebhookSignature(process.env.WEBHOOK_SECRET),
  async (req, res) => {
    try {
      const { contact, event } = req.body;
      if (contact.tags.includes('API V2')) {
        await ContactSync.syncToNowCerts(contact);
      }
      res.status(200).json({ success: true });
    } catch (error) {
      logger.error('Webhook error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Scheduled sync with error handling
cron.schedule('*/5 * * * *', async () => {
  try {
    logger.info('Starting scheduled sync');
    const contacts = await GHLAPI.getContactsByTag('API V2');
    for (const contact of contacts) {
      await ContactSync.syncToNowCerts(contact);
    }
    logger.info('Scheduled sync completed');
  } catch (error) {
    logger.error('Scheduled sync error:', error);
  }
});

app.listen(config.server.port, '127.0.0.1', () => {
  logger.info(`Server running on port ${config.server.port}`);
});