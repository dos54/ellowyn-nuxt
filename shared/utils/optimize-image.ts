import sharp from 'sharp'

export async function optimizeImage(image: Buffer): Promise<Buffer> {
  const optimizedImage = await sharp(image)
    .webp()
    .toBuffer()

  return optimizedImage
}