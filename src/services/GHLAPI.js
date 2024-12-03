const axios = require('axios');
const config = require('../config');

class GHLAPI {
  constructor(locationId) {
    const subaccount = config.ghl.subaccounts.find(s => s.locationId === locationId);
    if (!subaccount) {
      throw new Error(`No configuration found for location ID: ${locationId}`);
    }

    this.locationId = locationId;
    this.client = axios.create({
      baseURL: config.ghl.apiUrl,
      headers: {
        'Authorization': `Bearer ${subaccount.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getContactsByTag(tag) {
    const response = await this.client.get('/contacts', {
      params: {
        locationId: this.locationId,
        tags: tag
      }
    });
    return response.data;
  }

  async getContactActivities(contactId) {
    const response = await this.client.get(`/contacts/${contactId}/activities`);
    return response.data;
  }

  static getInstances() {
    return config.ghl.subaccounts.map(({locationId}) => new GHLAPI(locationId));
  }
}

module.exports = GHLAPI;