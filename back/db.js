const admin = require('firebase-admin');
const serviceAccount = require('./mike-game-db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log('DB Connect success');

module.exports = db;