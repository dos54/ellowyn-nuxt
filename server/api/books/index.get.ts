import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async () => {
  return await prisma.book.findMany({ 
    where: { publishDate: { lte: new Date()} },
    orderBy: { createdAt: 'desc' }
  })
})