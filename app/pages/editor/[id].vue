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
type Post = { id: number; content: JSONContent }

const route = useRoute()
const postId = route.params.id

const { data, error } = await useFetch<Post>(`/api/post/${postId}`)
if (error.value) throw error.value

const content = ref<JSONContent>(
  data.value?.content ?? { type: 'doc', content: [] }
)

</script>