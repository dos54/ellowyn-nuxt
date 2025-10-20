<template>
<div>
  <ul v-if="posts.length">
      <li v-for="p in posts" :key="p.id">
        <PostListItem :title="'Post ' + p.id" text="Content here" class="post-list-item" />
        <!-- <TiptapViewer v-model="p.content" /> -->
      </li>
  </ul>
  <p v-else-if="pending">Loading...</p>
  <p v-else>No posts.</p>
</div>
</template>

<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3';
// import TiptapViewer from '~/components/TiptapViewer.vue';
import PostListItem from '~/components/posts/PostListItem.vue';
type Blog = { id: number; content: JSONContent }

const { data, pending, error } = await useFetch<Blog[]>('/api/posts')

const posts = ref<Blog[]>([])
watchEffect(() => {
  posts.value = (data.value ?? []).map(p => ({
    id: p.id,
    content: p.content ?? { type: 'doc', content: [] }
  }))
})
if (error.value) console.error(error.value)

</script>

<style scoped lang="scss">
ul {
  list-style: none;

  li {
    margin-top: 1rem;
  }
  
  .post-list-item {
    background-color: antiquewhite;
  }
}
</style>