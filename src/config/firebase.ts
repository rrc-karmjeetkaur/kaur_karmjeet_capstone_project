import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '');

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Firebase service account file not found at path: ${serviceAccountPath}`);
}
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase Admin initialized successfully!');

export default admin;
