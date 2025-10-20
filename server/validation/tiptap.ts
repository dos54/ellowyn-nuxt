import { z } from 'zod'
import type { JSONContent } from '@tiptap/vue-3'

const MarkSchema = z.object({
  type: z.string(),
  // attrs: z.record(z.unknown()).optional()
})

export const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
  z.object({
    type: z.string(),
    text: z.string().optional(),
    // attrs: z.record(z.unknown()).optional(),
    marks: z.array(MarkSchema).optional(),
    content: z.array(JSONContentSchema).optional()
  })
)

const MEANINGFUL_CONTENT = new Set(['text', 'image', 'video', 'audio'])

function hasMeaningfulContent(node: JSONContent): boolean {
  if (node.type === 'text' && (node.text ?? '').trim().length > 0) return true
  if (MEANINGFUL_CONTENT.has(node.type ?? '')) return true
  return (node.content ?? []).some(hasMeaningfulContent)
}

export const TipTapDocSchema = JSONContentSchema.superRefine((doc, ctx) => {
  if (doc.type !== 'doc') {
    ctx.addIssue({ code: 'custom', message: 'Root must not be "doc"'})
  } else if (!hasMeaningfulContent(doc)) {
    ctx.addIssue({ code: 'custom', message: 'Content cannot be empty' })
  }
})