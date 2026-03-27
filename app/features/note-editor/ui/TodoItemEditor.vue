<script setup lang="ts">
import type { TodoItem } from '~/entities/note'

const props = defineProps<{
  todo: TodoItem
}>()

const emit = defineEmits<{
  remove: [todoId: string]
  updateText: [payload: { todoId: string, text: string }]
  updateDone: [payload: { todoId: string, done: boolean }]
}>()

const textModel = computed({
  get: () => props.todo.text,
  set: (value: string) => emit('updateText', { todoId: props.todo.id, text: value })
})

const doneModel = computed({
  get: () => props.todo.done,
  set: (value: boolean) => emit('updateDone', { todoId: props.todo.id, done: value })
})
</script>

<template>
  <div class="todo-item-editor">
    <UCheckbox
      v-model="doneModel"
      aria-label="Отметить задачу выполненной"
    />
    <UInput
      v-model="textModel"
      class="todo-item-editor__input"
      placeholder="Текст задачи"
    />
    <UButton
      color="error"
      variant="ghost"
      size="sm"
      icon="i-lucide-trash-2"
      aria-label="Удалить задачу"
      @click="emit('remove', props.todo.id)"
    />
  </div>
</template>

<style scoped lang="scss">
.todo-item-editor {
  display: flex;
  align-items: center;
  gap: 8px;

  &__input {
    flex: 1;
    min-width: 0;
  }
}
</style>
