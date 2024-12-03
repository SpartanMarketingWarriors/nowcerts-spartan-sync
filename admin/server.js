const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

app.use(basicAuth({
  users: { 'admin': process.env.ADMIN_PASSWORD },
  challenge: true
}));

app.use(express.static('public'));

app.listen(3001, '127.0.0.1', () => {
  console.log('Admin panel running on http://localhost:3001');
});