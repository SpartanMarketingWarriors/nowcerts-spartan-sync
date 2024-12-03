require('dotenv').config();

const subaccounts = process.env.GHL_SUBACCOUNTS ? 
  JSON.parse(process.env.GHL_SUBACCOUNTS) : 
  [{
    locationId: process.env.GHL_LOCATION_ID,
    apiKey: process.env.GHL_API_KEY
  }];

module.exports = {
  nowcerts: {
    apiUrl: process.env.NOWCERTS_API_URL,
    apiKey: process.env.NOWCERTS_API_KEY,
    agencyId: process.env.NOWCERTS_AGENCY_ID
  },
  ghl: {
    apiUrl: process.env.GHL_API_URL,
    subaccounts
  }
};