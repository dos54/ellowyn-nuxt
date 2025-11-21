<template>
  <v-toolbar app color="primary">
    <v-app-bar-nav-icon class="d-sm-none d-print-none" @click="drawer = true" />
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
    <v-app-bar-nav-icon v-if="isAdmin" class="d-none d-sm-block" @click="drawer=true" />
  </v-toolbar>
  <v-navigation-drawer
    v-model="drawer" 
    scrim
    temporary
    @click:outside="drawer = false"
    >
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
      <v-spacer />
      <div v-if="isAdmin">
        <v-list-item
          v-for="link in adminLinks"
          :key="link.path"
          :to="{ path: link.path }"
        >
        {{ link.title }}
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { isOneOf } from '@@/shared/utils/rbac'
const drawer = ref(false)
const isAdmin = ref(false)

const auth = useAuth()

isAdmin.value = isOneOf(auth.data.value?.user.role ?? 'user', [ 'admin' ])

const links = [
  { title: 'Home', path: '/' },
  { title: 'Books', path: '/books'},
  { title: 'Blog', path: '/blog/list' },
]

const adminLinks = [
  { title: 'Editor', path: '/editor' },
]
</script>