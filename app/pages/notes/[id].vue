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
  <div class="note-page">
    <BackButton />

    <div>
      <h1
        v-if="!isCreateMode && !sourceNote"
        class="note-page__not-found"
      >
        Заметка не найдена
      </h1>

      <div
        v-else
        class="note-page__editor"
      >
        <h1 class="note-page__page-title">
          {{ isCreateMode ? 'Создание заметки' : 'Редактирование заметки' }}
        </h1>

        <UCard>
          <template #header>
            <h2 class="note-page__card-heading">
              Заголовок заметки
            </h2>
          </template>

          <UInput
            v-model="title"
            size="lg"
            class="note-page__title-input"
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

        <div class="note-page__actions">
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

<style scoped lang="scss">
@use '~/assets/scss/variables' as app;

.note-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__editor {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__page-title {
    font-size: 24px;
    font-weight: 600;
  }

  &__not-found {
    font-size: 20px;
    font-weight: 600;
  }

  &__card-heading {
    font-size: 18px;
    font-weight: 500;
  }

  &__title-input {
    width: 100%;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 8px;

    @media (min-width: app.$bp-sm) {
      flex-direction: row;
    }
  }
}
</style>
