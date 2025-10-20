<template>
  <v-card
    :title
    :text
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string,
  text: string,
}>()

const title = props.title ?? ''
const text = props.text ?? ''

</script>
