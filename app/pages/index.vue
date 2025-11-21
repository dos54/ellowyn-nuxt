<template>
  <div>
    <h1>Welcome to the home page!</h1>
    <NuxtLink to="/editor">Go to the editor</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
if (route.query.code) {
  showError({
    statusCode: Number(route.query.code),
    statusMessage: route.query.message as string,
  })

  router.replace({ query: {} })
}
</script>