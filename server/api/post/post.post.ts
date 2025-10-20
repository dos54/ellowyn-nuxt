import prisma from "~~/server/utils/prisma"
import type { JSONContent } from '@tiptap/vue-3';

type PostBody = { content: JSONContent }

export default defineEventHandler(async (event) => {
  const body = (await readBody<PostBody>(event)) ?? {}
  if (!body.content) {
    throw createError({ statusCode: 400, statusMessage: 'Missing content' })
  }

  const post = await prisma.post.create({ data: { content: body.content } })

  setResponseStatus(event, 201)
  return { ok: true, postId: post.id }
})