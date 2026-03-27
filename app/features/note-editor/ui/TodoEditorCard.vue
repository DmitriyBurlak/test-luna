<script setup lang="ts">
import type { TodoItem } from '~/entities/note'

import TodoItemEditor from './TodoItemEditor.vue'

const props = defineProps<{
  todos: TodoItem[]
}>()

const emit = defineEmits<{
  add: []
  remove: [todoId: string]
  updateText: [payload: { todoId: string, text: string }]
  updateDone: [payload: { todoId: string, done: boolean }]
}>()
</script>

<template>
  <UCard class="todo-editor-card">
    <template #header>
      <div class="todo-editor-card__header">
        <h2 class="todo-editor-card__title">
          Todo
        </h2>
        <UButton
          icon="i-lucide-plus"
          size="sm"
          @click="emit('add')"
        >
          Добавить пункт
        </UButton>
      </div>
    </template>

    <div
      v-if="props.todos.length"
      class="todo-editor-card__list"
    >
      <TodoItemEditor
        v-for="todo in props.todos"
        :key="todo.id"
        :todo="todo"
        @remove="emit('remove', $event)"
        @update-text="emit('updateText', $event)"
        @update-done="emit('updateDone', $event)"
      />
    </div>
    <p
      v-else
      class="todo-editor-card__empty"
    >
      Добавьте первый пункт Todo.
    </p>
  </UCard>
</template>

<style scoped lang="scss">
.todo-editor-card {
  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__empty {
    font-size: 14px;
    color: var(--ui-text-muted, #737373);
  }
}
</style>
