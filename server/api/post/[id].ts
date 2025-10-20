import prisma from "~~/server/utils/prisma"

export default defineEventHandler(async (event) => {
  const strId = getRouterParam(event, 'id')
  const id = Number.parseInt(strId ?? '', 10) as number
  if (!Number.isInteger(id) || id < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  console.log('Post', id, 'found')
  return post
})