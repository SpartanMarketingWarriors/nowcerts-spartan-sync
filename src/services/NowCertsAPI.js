const axios = require('axios');
const config = require('../config');

class NowCertsAPI {
  constructor() {
    this.client = axios.create({
      baseURL: config.nowcerts.apiUrl,
      headers: {
        'Authorization': `Bearer ${config.nowcerts.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createContact(data) {
    const response = await this.client.post('/contacts', {
      ...data,
      agencyId: config.nowcerts.agencyId
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

  async getContact(contactId) {
    const response = await this.client.get(`/contacts/${contactId}`);
    return response.data;
  }
}

module.exports = new NowCertsAPI();