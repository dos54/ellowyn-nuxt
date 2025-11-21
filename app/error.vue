<template>
  <NuxtLayout>
    <v-sheet elevation="3" rounded="xl" class="error-sheet">
      <h1>{{ error?.statusCode }}</h1>
      <p>{{ error?.statusMessage }}</p>
      <v-btn to="/">Go Home</v-btn>
    </v-sheet>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
})

const error = props.error

</script>

<style scoped lang="scss">
.error-sheet {
  display: flex;

  height: max(50dvh, 200px);
  width: min(500px, 90vw);
  margin: 0 auto;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .5rem;
}
</style>