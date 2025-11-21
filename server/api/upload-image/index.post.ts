import { uploadImage } from '~~/server/utils/uploadImage'
import { optimizeImage } from '~~/shared/utils/optimize-image'
import { requireAuth } from '~~/server/utils/requireAuth'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

export default defineEventHandler(async (event) => {
  await requireAuth(event, { minRole: 'editor' })
  const parts = await readMultipartFormData(event)
  if(!parts) throw createError({ statusCode: 400, statusMessage: 'No form-data' })

  const file = parts.find(p => p.name === 'image' && p.filename)
  if (!file?.data || !file.type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing image file' })
  }
  if (!ALLOWED.has(file.type)) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported media type' })
  }
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  }

  const key = `books/${Date.now()}-${crypto.randomUUID()}`
  const optimizedImage = await optimizeImage(file.data)

  const url = await uploadImage({
    buffer: optimizedImage,
    key,
    contentType: file.type
  })

  setResponseStatus(event, 201)
  return { ok: true, imageUrl: url, key }
})