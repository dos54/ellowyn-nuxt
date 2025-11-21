// server/api/books/index.post.ts
import { z } from 'zod'
import { readBody, createError } from 'h3'
import prisma from '@@/server/utils/prisma'
import { TipTapDocSchema } from '@@/server/validation/tiptap'
import { generateUniqueSlug, slugify } from '@@/shared/utils/slugify'
import type { Prisma } from '@prisma/client'
import { requireAuth } from '~~/server/utils/requireAuth'

const bodySchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).optional(),
  description: TipTapDocSchema,          // your JSONContent validation
  completed: z.boolean(),
  publishDate: z.iso.datetime(),    // ISO string from client
  coverImageUrl: z.url({ message: "Invalid URL" }).optional()
})

export default defineEventHandler(async (event) => {
  await requireAuth(event, { minRole: 'editor' })

  const rawBody = await readBody<unknown>(event)
  const parsed = bodySchema.safeParse(rawBody)

  if (!parsed.success) {
    const errors = z.treeifyError(parsed.error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: errors
    })
  }

  const body = parsed.data

  const publishDate = new Date(body.publishDate)
  if (Number.isNaN(publishDate.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid publishDate'
    })
  }

  const baseSlug = slugify(body.slug ?? body.title)
  const slug = await generateUniqueSlug(baseSlug)

  try {
    const book = await prisma.book.create({
      data: {
        title: body.title,
        slug,
        description: body.description as unknown as Prisma.InputJsonValue,
        completed: body.completed,
        publishDate,
        coverImageUrl: body.coverImageUrl
      }
    })

    return book
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: 'A book with this slug already exists'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create book'
    })
  }
})
