import prisma from "~~/server/utils/prisma"

export default defineEventHandler(async () => {
  return await prisma.post.findMany({ orderBy: { id: 'desc' }})
})