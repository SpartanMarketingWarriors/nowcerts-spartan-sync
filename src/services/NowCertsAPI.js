const axios = require('axios');
const config = require('../config');

class NowCertsAPI {
  constructor(agencyId) {
    const account = config.nowcerts.accounts.find(a => a.agencyId === agencyId);
    if (!account) {
      throw new Error(`No configuration found for agency ID: ${agencyId}`);
    }

    this.agencyId = agencyId;
    this.client = axios.create({
      baseURL: config.nowcerts.apiUrl,
      headers: {
        'Authorization': `Bearer ${account.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createContact(data) {
    const response = await this.client.post('/contacts', {
      ...data,
      agencyId: this.agencyId
    });
    return response.data;
  }

  async updateContact(contactId, data) {
    const response = await this.client.put(`/contacts/${contactId}`, data);
    return response.data;
  }

  async createActivity(contactId, activity) {
    const response = await this.client.post(`/contacts/${contactId}/activities`, activity);
    return response.data;
  }

  static getInstanceForGHL(locationId) {
    const subaccount = config.ghl.subaccounts.find(s => s.locationId === locationId);
    if (!subaccount) {
      throw new Error(`No configuration found for GHL location ID: ${locationId}`);
    }
    return new NowCertsAPI(subaccount.nowcertsAgencyId);
  }
}