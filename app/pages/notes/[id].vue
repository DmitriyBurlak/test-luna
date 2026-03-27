<script setup lang="ts">
import { TodoEditorCard, useNoteEditor } from '~/features/note-editor'
import BackButton from '~/shared/ui/BackButton.vue'
import ConfirmModal from '~/shared/ui/ConfirmModal.vue'

const {
  title,
  todos,
  sourceNote,
  isCreateMode,
  isCancelModalOpen,
  isDeleteModalOpen,
  isDirty,
  addTodo,
  removeTodo,
  updateTodoText,
  updateTodoDone,
  saveNote,
  askCancelEdit,
  confirmCancelEdit,
  askDeleteNote,
  confirmDeleteNote
} = useNoteEditor()
</script>

<template>
  <div class="space-y-6">
    <BackButton />

    <div>
      <h1
        v-if="!isCreateMode && !sourceNote"
        class="text-xl font-semibold"
      >
        Заметка не найдена
      </h1>

      <div
        v-else
        class="flex flex-col gap-6"
      >
        <h1 class="text-2xl font-semibold">
          {{ isCreateMode ? 'Создание заметки' : 'Редактирование заметки' }}
        </h1>

        <UCard>
          <template #header>
            <h2 class="text-lg font-medium">
              Заголовок заметки
            </h2>
          </template>

          <UInput
            v-model="title"
            size="lg"
            class="w-full"
            placeholder="Введите заголовок заметки"
          />
        </UCard>

        <TodoEditorCard
          :todos="todos"
          @add="addTodo"
          @remove="removeTodo"
          @update-text="updateTodoText($event.todoId, $event.text)"
          @update-done="updateTodoDone($event.todoId, $event.done)"
        />

        <div class="flex flex-wrap flex-col sm:flex-row gap-2">
          <UButton
            icon="i-lucide-save"
            :disabled="!title.trim().length || !isDirty"
            @click="saveNote"
          >
            Сохранить изменения
          </UButton>
          <UButton
            color="neutral"
            variant="soft"
            :disabled="!isDirty"
            @click="askCancelEdit"
          >
            Отменить редактирование
          </UButton>
          <UButton
            color="error"
            variant="ghost"
            @click="askDeleteNote"
          >
            Удалить
          </UButton>
        </div>
      </div>
    </div>

    <ConfirmModal
      v-model:open="isCancelModalOpen"
      title="Отменить редактирование?"
      description="Все несохраненные изменения будут потеряны."
      confirm-text="Да, отменить"
      cancel-text="Продолжить редактирование"
      @confirm="confirmCancelEdit"
    />

    <ConfirmModal
      v-model:open="isDeleteModalOpen"
      title="Удалить заметку?"
      description="Заметка будет удалена без возможности восстановления."
      confirm-text="Удалить"
      cancel-text="Отмена"
      @confirm="confirmDeleteNote"
    />
  </div>
</template>
