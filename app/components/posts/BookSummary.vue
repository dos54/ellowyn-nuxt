<template>
  <a class="link" :href="`/books/${book.slug}`">
    <div class="book-container">
      <NuxtImg
        :src="book.coverImageUrl"
        height="300"
        width="200"
        class="book-cover"
      />
      <div class="book-summary">
        <h2>{{ book.title }}</h2>
        <p>Published {{ new Date(book.publishDate).toLocaleDateString() }}</p>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Book } from '@prisma/client';

const props = defineProps<{
  bookData: Book
}>()

const book = props.bookData

</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: black;
}

</style>