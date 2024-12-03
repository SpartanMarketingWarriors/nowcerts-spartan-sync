const axios = require('axios');
const config = require('../config');

class GHLAPI {
  constructor() {
    this.client = axios.create({
      baseURL: config.ghl.apiUrl,
      headers: {
        'Authorization': `Bearer ${config.ghl.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getContactsByTag(tag) {
    const response = await this.client.get('/contacts', {
      params: {
        locationId: config.ghl.locationId,
        tags: tag
      }
    });
    return response.data;
  }

  async getContactActivities(contactId) {
    const response = await this.client.get(`/contacts/${contactId}/activities`);
    return response.data;
  }

  async updateContact(contactId, data) {
    const response = await this.client.put(`/contacts/${contactId}`, data);
    return response.data;
  }
}

module.exports = new GHLAPI();