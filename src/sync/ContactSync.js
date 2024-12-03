const NowCertsAPI = require('../services/NowCertsAPI');
const GHLAPI = require('../services/GHLAPI');
const logger = require('../utils/logger');

class ContactSync {
  async syncToNowCerts(ghlContact) {
    try {
      const nowCertsData = this.transformGHLToNowCerts(ghlContact);
      const contact = await NowCertsAPI.createContact(nowCertsData);
      await this.syncActivities(ghlContact.id, contact.id);
      return contact;
    } catch (error) {
      logger.error('Error syncing contact to NowCerts:', error);
      throw error;
    }
  }

  async syncActivities(ghlContactId, nowCertsContactId) {
    try {
      const activities = await GHLAPI.getContactActivities(ghlContactId);
      for (const activity of activities) {
        const nowCertsActivity = this.transformActivity(activity);
        await NowCertsAPI.createActivity(nowCertsContactId, nowCertsActivity);
      }
    } catch (error) {
      logger.error('Error syncing activities:', error);
      throw error;
    }
  }

  transformGHLToNowCerts(ghlContact) {
    return {
      firstName: ghlContact.firstName,
      lastName: ghlContact.lastName,
      email: ghlContact.email,
      phone: ghlContact.phone,
      address: {
        street: ghlContact.address1,
        city: ghlContact.city,
        state: ghlContact.state,
        zip: ghlContact.postalCode
      }
    };
  }

  transformActivity(ghlActivity) {
    const typeMap = {
      'SMS': 'TEXT_MESSAGE',
      'CALL': 'PHONE_CALL',
      'EMAIL': 'EMAIL'
    };

    return {
      type: typeMap[ghlActivity.type] || 'NOTE',
      timestamp: ghlActivity.timestamp,
      description: ghlActivity.description,
      metadata: ghlActivity.metadata
    };
  }
}

module.exports = new ContactSync();