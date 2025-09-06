import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' with { type: "json" };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "posts-bhandara-app"
});
export const authAdmin = admin.auth();
export const bucket = admin.storage().bucket();
export const db = admin.firestore();
//# sourceMappingURL=firebase-admin.js.map