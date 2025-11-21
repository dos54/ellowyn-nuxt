<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container>
      <v-text-field
        v-model="title"
        label="Title"
        required
      />

      <div class="mt-4">
        <span>Description</span>
        <TiptapEditor v-model="description" />
      </div>

      <v-checkbox
        v-model="isComplete"
        class="mt-4"
        label="Completed"
      />

      <v-text-field
        v-model="formPublishDate"
        class="mt-4"
        label="Publish date"
        type="datetime-local"
        :suffix="localTimezone"
      />

      <v-file-input
        v-model="coverFile"
        class="mt-4"
        accept="image/png, image/jpeg, image/bmp"
        label="Cover image"
        placeholder="Upload a cover image"
        append-inner-icon="mdi-camera"
        prepend-icon=""
        :multiple="false"
      />

      <v-btn
        class="mt-6"
        color="primary"
        type="submit"
        :disabled="!valid"
      >
        Save book
      </v-btn>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { JSONContent } from '@tiptap/vue-3'
import TiptapEditor from '~/components/TiptapEditor.client.vue'

const props = defineProps<{
  id?: string
  title?: string
  slug?: string
  description?: JSONContent
  completed?: boolean
  publishDate?: Date
  coverImageUrl?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: {
    title: string
    description: JSONContent
    publishDate: Date
    completed: boolean
    coverImageUrl?: string
  }): void
}>()

const valid = ref(false)
const localTimezone = ref<string>('')

const title = ref<string>(props.title ?? '')
const description = ref<JSONContent>(
  props.description ?? { type: 'doc', content: [{ type: 'paragraph' }] }
)
const isComplete = ref<boolean>(props.completed ?? false)
const formPublishDate = ref<string>('')

// single file, not an array
const coverFile = ref<File | null>(null)

onMounted(() => {
  const initial = props.publishDate ? new Date(props.publishDate) : new Date()

  const year = initial.getFullYear()
  const month = String(initial.getMonth() + 1).padStart(2, '0')
  const day = String(initial.getDate()).padStart(2, '0')
  const hours = String(initial.getHours()).padStart(2, '0')
  const minutes = String(initial.getMinutes()).padStart(2, '0')

  // Value format compatible with <input type="datetime-local">
  formPublishDate.value = `${year}-${month}-${day}T${hours}:${minutes}`

  localTimezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
})

async function handleSubmit(): Promise<void> {
  const publishDate = formPublishDate.value
    ? new Date(formPublishDate.value)
    : new Date()

  let coverImageUrl: string | undefined = props.coverImageUrl

  // Upload image if a file is selected
  if (coverFile.value) {
    const formData = new FormData()
    formData.append('image', coverFile.value)

    const uploadResponse = await $fetch<{ imageUrl: string }>('/api/upload-image', {
      method: 'POST',
      body: formData
    })

    coverImageUrl = uploadResponse.imageUrl
  }

  emit('submit', {
    title: title.value.trim(),
    description: description.value,
    publishDate,
    completed: isComplete.value,
    coverImageUrl
  })
}
</script>

<style scoped>
.p {
  display: block;
  background-color: red;
}

.p:empty::before {
  content: "\00a0";
}
</style>
