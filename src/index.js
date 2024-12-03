const express = require('express');
const cron = require('node-cron');
const config = require('./config');
const ContactSync = require('./sync/ContactSync');
const logger = require('./utils/logger');
const GHLAPI = require('./services/GHLAPI');

const app = express();
app.use(express.json());

// Webhook endpoint for GHL events
app.post('/webhook/ghl', async (req, res) => {
  try {
    const { contact, event } = req.body;
    if (contact.tags.includes('API V2')) {
      await ContactSync.syncToNowCerts(contact);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Scheduled sync job
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

app.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port}`);
});