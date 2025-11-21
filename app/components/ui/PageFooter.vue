<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4 w-100">
    <div class="d-flex ga-3">
      <v-btn 
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      />
    </div>
    <div v-if="data">
      <p>Signed in as {{ data.user?.name }} | Role: {{ data.user?.role }} | ID: {{ data.user.id }}</p>
      <v-btn color="primary" @click="signOut">Sign Out</v-btn>
    </div>
    <v-btn v-else color="primary" @click="signIn">Sign In</v-btn>
  </v-footer>
</template>

<script setup lang="ts">
const { data, signIn, signOut } = useAuth()

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-instagram'
]
</script>