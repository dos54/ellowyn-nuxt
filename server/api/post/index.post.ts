import { createError, readBody, setResponseStatus } from 'h3'
import prisma from '@@/server/utils/prisma'
import type { PostType, Prisma } from '@prisma/client'
import type { JSONContent } from '@tiptap/vue-3'
import { slugify, generateUniqueSlug } from '~~/shared/utils/slugify'
import { getServerSession } from '#auth'

type PostBody = {
  title: string
  content: JSONContent
  type: PostType
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session || !session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = (await readBody<PostBody>(event)) ?? {}

  if (!body.title || !body.content) {
    throw createError({ statusCode: 400, statusMessage: 'Missing title or content' })
  }

  const baseSlug = slugify(body.title)
  const slug = await generateUniqueSlug(baseSlug)

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      content: body.content as unknown as Prisma.InputJsonValue,
      type: body.type,
      authorId: session.user.id
    }
  })

  setResponseStatus(event, 201)
  return { ok: true, postId: post.id }
})
