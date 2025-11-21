<template>
  <div>
    <h1>Create Blog Post</h1>

    <ClientOnly fallback-tag="span">
      <v-text-field 
        v-model="title"
        label="Title"
        required
      />

      <TiptapEditorClient v-model="content" />

      <v-btn color="primary" :disabled="!canPost" @click="onPost">
        Post
      </v-btn>

      <template #fallback>
        <p>Loading editor...</p>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { JSONContent } from '@tiptap/vue-3'
import TiptapEditorClient from '~/components/TiptapEditor.client.vue'
import { useNotify } from '~/store/notify'

const placeholderContent: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }]
}

const content = ref<JSONContent>(placeholderContent)

function hasMeaningfulContent(node: JSONContent): boolean {
  if (node.type === 'text' && (node.text ?? '').trim().length > 0) return true
  if ((node.content ?? []).some(hasMeaningfulContent)) return true
  return false
}

const canPost = computed(() => hasMeaningfulContent(content.value))

const title = ref('')

async function onPost(): Promise<void> {
  const n = useNotify()
  console.log('onPost triggered')

  try {
    await $fetch('/api/post', {
      method: 'POST',
      body: {
        title: title.value,
        content: content.value,
        type: 'blog'
      }
    })
    n.show('Post successful.', 'success', 200)
  } catch {
    n.show('Post failed', 'error', 400)
  }
}

definePageMeta({
  auth: { minRole: 'editor' },
  middleware: []
})
</script>
