<script setup lang="ts">
import type { Note, TodoItem } from '../model/types'

const props = defineProps<{
  note: Note
  previewTodos: TodoItem[]
}>()

const emit = defineEmits<{
  edit: [noteId: string]
  delete: [noteId: string]
}>()
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <h3 class="text-sm sm:text-base font-semibold leading-tight line-clamp-2">
        {{ props.note.title }}
      </h3>
    </template>

    <div class="space-y-2">
      <ul
        v-if="props.previewTodos.length"
        class="space-y-1.5 text-xs sm:text-sm"
      >
        <li
          v-for="todo in props.previewTodos"
          :key="todo.id"
          class="text-muted line-clamp-1"
        >
          - {{ todo.text || 'Без текста' }}
        </li>
      </ul>
      <p
        v-else
        class="text-xs sm:text-sm text-muted"
      >
        Пока нет задач в заметке
      </p>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UButton
          color="primary"
          variant="soft"
          @click="emit('edit', props.note.id)"
        >
          Изменить
        </UButton>
        <UButton
          color="error"
          variant="ghost"
          @click="emit('delete', props.note.id)"
        >
          Удалить
        </UButton>
      </div>
    </template>
  </UCard>
</template>
