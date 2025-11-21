<template>
  <div>
    <h2>Ellowyn's Bookshelf</h2>
    <v-btn v-if="userData?.user.role === 'admin'" color="primary" :href="'/books/new'">
      Add a new book
    </v-btn>
    <div 
    class="bookshelf-wrapper" >
      <ul 
        v-if="books.length"
        class="bookshelf"
      >
        <li 
          v-for="book in books"
          :key="book.id"
          class="book"
        >
          <BookSummary :book-data="book" />
        </li>
      </ul>
      <ul
      v-else-if="pending"
      class="bookshelf"
      >
        <li 
          v-for="n in 5" 
          :key="n"
          class="book"
        >
          <p>
            {{ n }} A fake book goes here.
          </p>
        </li>
      </ul>
      <p v-else>Sorry, we couldn't find any books.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from '@prisma/client';
import BookSummary from '~/components/posts/BookSummary.vue';
import { hasAtLeast } from '#imports';

const { data, pending, error } = await useFetch<Book[]>('/api/books')
const books = ref<Book[]>([])

const { data: userData } = useAuth()

watchEffect(() => {
  books.value = data.value ?? []
})

if (error.value) console.error(error.value)

</script>

<style scoped lang="scss">
.bookshelf-wrapper {
  margin-top: .5rem;
}

.bookshelf {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  list-style: none;
  margin: auto;
}

.book {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid lightblue;
  border-radius: .5rem;
  background-color: hsla(0, 50%, 50%, .3);
  padding: 0;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;

}

.book-cover {
  aspect-ratio: 2 / 3;
  height: auto;
}

</style>