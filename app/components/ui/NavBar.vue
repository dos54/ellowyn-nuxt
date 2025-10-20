<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon class="d-sm-none d-print-none" @click="drawer = true" />
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list
          density="comfortable"
          nav
        >
          <v-list-item 
            v-for="link in links"
            :key="link.path"
            :to="{ path: link.path }"
          >
          {{ link.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar-title>Ellowyn.com</v-toolbar-title>
      <v-spacer />
      <v-btn 
        v-for="link in links" 
        :key="link.path" variant="text" 
        :to="{ path: link.path }"
        class="d-none d-sm-inline-flex"
      >
      {{ link.title }}
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
const drawer = ref(false)

const links = [
  { title: 'Home', path: '/' },
  { title: 'Editor', path: '/editor' },
  { title: 'Blog', path: '/blog/list' },
]

</script>