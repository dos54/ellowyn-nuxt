<template>
  <div class="editor-container">
    <div class="control-group">
      <div class="button-group">
        <button @click="addImage">Set image</button>
        <button
          :disabled="!editor?.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor?.isActive('bold') }"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          :disabled="!editor?.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor?.isActive('italic') }"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>
        <button
          :disabled="!editor?.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor?.isActive('strike') }"
          @click="editor?.chain().focus().toggleStrike().run()"
        >
          Strike
        </button>
        <button
          :disabled="!editor?.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor?.isActive('code') }"
          @click="editor?.chain().focus().toggleCode().run()"
        >
          Code
        </button>
        <button @click="editor?.chain().focus().unsetAllMarks().run()">Clear marks</button>
        <button @click="editor?.chain().focus().clearNodes().run()">Clear nodes</button>
        <button
          :class="{ 'is-active': editor?.isActive('paragraph') }"
          @click="editor?.chain().focus().setParagraph().run()"
        >
          Paragraph
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          H1
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          H2
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          H3
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 4 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
        >
          H4
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 5 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
        >
          H5
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('heading', { level: 6 }) }"
          @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
        >
          H6
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('bulletList') }"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          Bullet list
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('orderedList') }"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          Ordered list
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('codeBlock') }"
          @click="editor?.chain().focus().toggleCodeBlock().run()"
        >
          Code block
        </button>
        <button
          :class="{ 'is-active': editor?.isActive('blockquote') }"
          @click="editor?.chain().focus().toggleBlockquote().run()"
        >
          Blockquote
        </button>
        <button @click="editor?.chain().focus().setHorizontalRule().run()">Horizontal rule</button>
        <button @click="editor?.chain().focus().setHardBreak().run()">Hard break</button>
        <button
          :disabled="!editor?.can().chain().focus().undo().run()"
          @click="editor?.chain().focus().undo().run()"
        >
          Undo
        </button>
        <button
          :disabled="!editor?.can().chain().focus().redo().run()"
          @click="editor?.chain().focus().redo().run()"
        >
          Redo
        </button>
      </div>
    </div>

    <EditorContent v-if="editor" :editor="editor" />

    <div class="character-count">
      {{ editor?.storage.characterCount.words() }} words |
      {{ editor?.storage.characterCount.characters() }} characters
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { CharacterCount, Placeholder } from '@tiptap/extensions'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/vue-3'

const props = defineProps<{
  modelValue?: JSONContent
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: JSONContent): void
}>()

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({ placeholder: 'Write something...' }),
    CharacterCount.configure(),
    Image
  ],
  content: props.modelValue ?? { type: 'doc', content: [{ type: 'paragraph' }] },
  onCreate: () => console.debug('Editor created'),
  onUpdate: ({ editor }) => {
    const json = editor.getJSON()
    console.log(json)
    emit('update:modelValue', json)
  },
  onDestroy: () => console.debug('Editor destroyed')
})

// keep editor in sync if parent changes modelValue
watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value || !value) return
    const current = editor.value.getJSON()
    if (JSON.stringify(current) === JSON.stringify(value)) return
    editor.value.commands.setContent(value)
  },
  { deep: true }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

function addImage(): void {
  const url = window.prompt('URL')

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
}
</script>


<style lang="scss">

.post-button {
  margin-top: .5rem;
}

.editor-container {
  border: 3px solid lightgray;
  border-radius: 8px;
  padding: .5rem .5rem;
  
  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  
    button {
      background-color: rgb(var(--v-theme-surface-variant));
      border-radius: 4px;
      padding: .25rem .5rem;
  
    }
    .is-active {
      background-color: aquamarine;
    }
  }

  .character-count {
    margin-top: .5rem;
    color: gray;
  }

}


/* Basic editor styles */
.tiptap {
  margin-top: .5rem;
  padding: .5rem;

  min-height: 25rem;

  border: 2px solid lightgray;
  border-radius: 8px;
  background-color: rgb(var(--v-theme-surface-variant));
  
  :first-child {
    margin-top: 0;

  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid var(--purple-light);
    }
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  p.is-editor-empty:first-child::before {
    color: var(--gray-3);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
}

</style>
