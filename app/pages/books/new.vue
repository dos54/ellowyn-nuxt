<template>
  <div>
    <BookForm @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3'

type BookFormPayload = {
  title: string
  description: JSONContent
  publishDate: Date
  completed: boolean
  coverImageUrl?: string
}

async function onSubmit(payload: BookFormPayload) {
  await $fetch('/api/books', {
    method: 'POST',
    body: {
      ...payload,
      publishDate: payload.publishDate.toISOString()
    }
  })
}
</script>


<style scoped lang="scss">
</style>