import z from 'zod'

export const postSchema = z.object({
    address: z.string(),
    description: z.string(),
    location: z.string(),
    media: z.array(z.string())
})

export const updatePostSchema = z.object({
    address: z.string(),
    description: z.string(),
    location: z.string(),
})