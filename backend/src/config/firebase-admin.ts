import admin from 'firebase-admin'

import serviceAccount from './serviceAccountKey.json' with {type: "json"}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "posts-bhandara-app"
})

export const authAdmin: admin.auth.Auth = admin.auth()
export const bucket: any = admin.storage().bucket()
export const db = admin.firestore()

//have changed the project in cloud console now create bucket and try