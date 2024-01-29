const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FS_ADMIN || "")),
});

const firestore = admin.firestore();
exports.firestore = firestore;
