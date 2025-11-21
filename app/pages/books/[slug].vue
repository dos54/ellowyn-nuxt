<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <NuxtImg
          :src="book?.coverImageUrl"
          class="book-cover"
        />
      </v-col>
      <v-col cols="12" md="6">
        <h2>{{ book?.title }}</h2>
        <TiptapViewer v-if="description" :model-value="description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import TiptapViewer from '~/components/TiptapViewer.vue'
import type { JSONContent } from '@tiptap/vue-3'
import { TipTapDocSchema } from '~~/server/validation/tiptap'

const route = useRoute()
const slug = route.params.slug as string

const { data: book } = await useAsyncData(
  `book-${slug}`,
  async () => {
    try {
      const result = await $fetch(`/api/books/${slug}`)
      return result ?? null
    } catch (e) {
      console.error('Failed to load book', e)
      return null
    }
  }
)

const description = computed<JSONContent | undefined>(() => {
  const raw = book.value?.description
  if (!raw) return undefined

  const parsed = TipTapDocSchema.safeParse(raw)
  if (!parsed.success) {
    console.error('Invalid TipTap JSON in book.description', parsed.error)
    return undefined
  }

  return parsed.data
})
</script>

<style scoped lang="scss">
.book-cover {
  max-width: 100%;
  height: auto;
}
</style>