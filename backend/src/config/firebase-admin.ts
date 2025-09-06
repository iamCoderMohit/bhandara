import admin from 'firebase-admin'

import serviceAccount from './serviceAccountKey.json' with {type: "json"}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "posts-bucket-web"
})

export const authAdmin: admin.auth.Auth = admin.auth()
export const bucket: any = admin.storage().bucket()
export const db = admin.firestore()
