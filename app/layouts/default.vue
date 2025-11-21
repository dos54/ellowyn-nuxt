
<template>
  <v-app>
    <div class="app-flex">
      <NavBar />
      <v-main class="pa-6 app-main">
        <slot />
      </v-main>
      <PageFooter />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from '~/components/ui/NavBar.vue';
import PageFooter from '~/components/ui/PageFooter.vue';
</script>

<style scoped lang="scss">
.app-flex {
  height: 100vh;
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

</style>

