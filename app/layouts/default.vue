
<template>
  <v-app>
    <NavBar />
    <v-main class="pa-6">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from '~/components/ui/NavBar.vue';

</script>

<style scoped>

</style>

