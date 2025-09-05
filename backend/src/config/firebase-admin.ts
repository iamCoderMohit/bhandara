import admin from 'firebase-admin'

import serviceAccount from './serviceAccountKey.json' with {type: "json"}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const authAdmin: admin.auth.Auth = admin.auth()
export const db = admin.firestore()