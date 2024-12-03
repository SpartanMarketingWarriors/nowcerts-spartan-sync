require('dotenv').config();

const ghlSubaccounts = process.env.GHL_SUBACCOUNTS ? 
  JSON.parse(process.env.GHL_SUBACCOUNTS) : 
  [{
    locationId: process.env.GHL_LOCATION_ID,
    apiKey: process.env.GHL_API_KEY,
    nowcertsAgencyId: process.env.NOWCERTS_AGENCY_ID
  }];

const nowcertsAccounts = process.env.NOWCERTS_ACCOUNTS ?
  JSON.parse(process.env.NOWCERTS_ACCOUNTS) :
  [{
    agencyId: process.env.NOWCERTS_AGENCY_ID,
    apiKey: process.env.NOWCERTS_API_KEY
  }];

module.exports = {
  nowcerts: {
    apiUrl: process.env.NOWCERTS_API_URL,
    accounts: nowcertsAccounts
  },
  ghl: {
    apiUrl: process.env.GHL_API_URL,
    subaccounts: ghlSubaccounts
  }
};