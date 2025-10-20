<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-html="cleanOutput" />
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
// import { generateHTML } from '@tiptap/html'; 
import type { JSONContent } from '@tiptap/vue-3';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { Image } from '@tiptap/extension-image'
import { renderToHTMLString } from '@tiptap/static-renderer'

import DOMPurify from 'isomorphic-dompurify'

const props = defineProps<{ modelValue?: JSONContent }>()
const doc: JSONContent = { type: 'doc', content: props.modelValue?.content ??  []}

const dirtyOutput = renderToHTMLString({
  content: doc,
  extensions: [
    StarterKit,
    Image,
    CharacterCount,
    Placeholder
  ]
})

const cleanOutput = DOMPurify.sanitize(dirtyOutput)
</script>