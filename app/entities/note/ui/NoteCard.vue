<script setup lang="ts">
import type { Note, TodoItem } from '../model/types'

const props = defineProps<{
  note: Note
  previewTodos: TodoItem[]
}>()

const router = useRouter()

const emit = defineEmits<{
  delete: [noteId: string]
}>()

function openNote() {
  router.push(`/notes/${props.note.id}`)
}
</script>

<template>
  <UCard
    class="h-full min-h-[240px]"
  >
    <template #header>
      <div
        class="flex items-center justify-between gap-2 cursor-pointer!"
        @click="openNote"
      >
        <h3 class="text-sm sm:text-base font-semibold leading-tight line-clamp-2">
          {{ props.note.title }}
        </h3>
        <uButton
          color="error"
          variant="soft"
          size="sm"
          icon="i-lucide-trash"
          class="cursor-pointer!"
          @click.stop="emit('delete', props.note.id)"
        />
      </div>
    </template>

    <div class="space-y-2 min-h-24">
      <div
        v-if="props.previewTodos.length"
        class="space-y-1.5 text-xs sm:text-sm max-h-31 overflow-y-auto pr-1"
      >
        <div
          v-for="todo in props.previewTodos"
          :key="todo.id"
          class="flex items-start gap-2"
        >
          <UCheckbox
            :model-value="todo.done"
            disabled
            :label="todo.text || 'Без текста'"
            class="pointer-events-none mt-0.5"
            :ui="{ label: `text-muted line-clamp-1 ${todo.done ? 'line-through opacity-70' : ''}` }"
          />
        </div>
      </div>
      <p
        v-else
        class="text-xs sm:text-sm text-muted"
      >
        Пока нет задач в заметке
      </p>
    </div>
  </UCard>
</template>
