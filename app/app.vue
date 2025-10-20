<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <v-snackbar v-model="n.open" :timeout="n.timeout" :color="n.color" location="bottom center">
      {{ n.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useNotify } from '@/store/notify';
const n = useNotify()
</script>