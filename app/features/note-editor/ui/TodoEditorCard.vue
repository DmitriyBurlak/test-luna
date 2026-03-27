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
  <UCard>
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-medium">
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
      class="space-y-3"
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
      class="text-sm text-muted"
    >
      Добавьте первый пункт Todo.
    </p>
  </UCard>
</template>
