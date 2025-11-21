import prisma from '@@/server/utils/prisma'

export function slugify(text: string) {
  return text.toLowerCase()
            .replace(/['"]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
}

export async function generateUniqueSlug(base: string) {
  let slug = base
  let counter = 1

  while (true) {
    const existing = await prisma.book.findUnique({ where: { slug } })
    if (!existing) return slug
    slug = `${base}-${counter++}`
  }
}