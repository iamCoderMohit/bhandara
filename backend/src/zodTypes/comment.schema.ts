import z from 'zod'

export const commentSchema = z.object({
    content: z.string(),
    username: z.string()
})

export const replySchema = z.object({
    postId: z.string(),
    replyToUserId: z.string(),
    commentId: z.string(),
    username: z.string(),
    content: z.string()
})