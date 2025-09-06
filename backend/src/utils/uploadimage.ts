import { bucket } from "../config/firebase-admin.js"

export async function uploadImage(file: any) {

    const filename = `/posts/${Date.now()}-${file.originalname}`
    const fileRef = bucket.file(filename)

    await fileRef.save(file.buffer, {contentType: file.mimeType})

    const [url] = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-09-2491"
    })

    return url;
}