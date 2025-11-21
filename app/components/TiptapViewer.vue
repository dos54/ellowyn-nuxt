<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="html-viewer" v-html="cleanOutput" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StarterKit from '@tiptap/starter-kit'
import type { JSONContent } from '@tiptap/vue-3'
import { CharacterCount, Placeholder } from '@tiptap/extensions'
import Image from '@tiptap/extension-image'
import { renderToHTMLString } from '@tiptap/static-renderer'
import DOMPurify from 'isomorphic-dompurify'

const props = defineProps<{
  modelValue?: JSONContent | null
}>()

const doc = computed<JSONContent>(() => {
  const value = props.modelValue

  // Fallback if description is null / wrong shape / missing type
  if (!value || value.type !== 'doc' || !Array.isArray(value.content)) {
    return { type: 'doc', content: [] }
  }

  return value
})

const dirtyOutput = computed(() => {
  try {
    return renderToHTMLString({
      content: doc.value,
      extensions: [StarterKit, Image, CharacterCount, Placeholder]
    })
  } catch (error) {
    console.error('Failed to render TipTap JSON', error, doc.value)
    return ''
  }
})

const cleanOutput = computed(() => DOMPurify.sanitize(dirtyOutput.value))
</script>

<style scoped lang="scss">
.html-viewer :deep(p) {
  margin: 0 0 0.75rem;
}

.html-viewer :deep(p:empty::before) {
  content: "\00a0";
  display: block;
}
</style>
