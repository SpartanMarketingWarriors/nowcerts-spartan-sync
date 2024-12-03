require('dotenv').config();

module.exports = {
  nowcerts: {
    apiUrl: process.env.NOWCERTS_API_URL,
    apiKey: process.env.NOWCERTS_API_KEY,
    agencyId: process.env.NOWCERTS_AGENCY_ID
  },
  ghl: {
    apiUrl: process.env.GHL_API_URL,
    apiKey: process.env.GHL_API_KEY,
    locationId: process.env.GHL_LOCATION_ID
  },
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  }
};