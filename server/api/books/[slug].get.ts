import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  try {
    const book = await prisma.book.findUnique({ where: { slug } })
    return book
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Book not found' })
  }
})