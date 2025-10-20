<template>
  <div>
    <h1>Here's the TipTap Editor</h1>
    <ClientOnly
      fallback-tag="span">
      <TiptapEditor v-model="content" />
      <template #fallback>
        <p>Loading editor...</p>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3';
const placeholderContent: JSONContent = { type: 'doc', content: [{'type': 'paragraph'}] } 
const content = ref<JSONContent>(placeholderContent)
</script>