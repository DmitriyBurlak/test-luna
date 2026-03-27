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

function checkboxLabelClass(done: boolean) {
  return [
    'note-card__checkbox-label',
    done ? 'note-card__checkbox-label--done' : ''
  ].filter(Boolean).join(' ')
}
</script>

<template>
  <UCard class="note-card">
    <template #header>
      <div
        class="note-card__header"
        @click="openNote"
      >
        <h3 class="note-card__title">
          {{ props.note.title }}
        </h3>
        <UButton
          color="error"
          variant="soft"
          size="sm"
          icon="i-lucide-trash"
          class="note-card__delete"
          @click.stop="emit('delete', props.note.id)"
        />
      </div>
    </template>

    <div class="note-card__body">
      <div
        v-if="props.previewTodos.length"
        class="note-card__todo-list"
      >
        <template
          v-for="todo in props.previewTodos"
          :key="todo.id"
        >
          <UCheckbox
            :model-value="todo.done"
            disabled
            :label="todo.text || 'Без текста'"
            class="note-card__checkbox"
            :ui="{ label: checkboxLabelClass(todo.done) }"
          />
        </template>
      </div>
      <p
        v-else
        class="note-card__empty"
      >
        Пока нет задач в заметке
      </p>
    </div>
  </UCard>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as app;

.note-card {
  height: 100%;
  min-height: 210px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: pointer;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;

    @media (min-width: app.$bp-sm) {
      font-size: 16px;
    }
  }

  &__delete {
    flex-shrink: 0;
    cursor: pointer!important;
  }

  &__body {
    min-height: 96px;
  }

  &__todo-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 124px;
    overflow-y: auto;
    font-size: 12px;

    @media (min-width: app.$bp-sm) {
      font-size: 14px;
    }
  }

  &__checkbox {
    pointer-events: none;
  }

  &__empty {
    font-size: 12px;
    color: var(--ui-text-muted, #737373);

    @media (min-width: app.$bp-sm) {
      font-size: 14px;
    }
  }
}

:deep(.note-card__checkbox-label) {
  color: var(--ui-text-muted, #737373);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.note-card__checkbox-label--done) {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
