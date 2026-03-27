<script setup lang="ts">
import NoteCard from '~/entities/note/ui/NoteCard.vue'
import { useNotesStore } from '~/entities/note'
import ConfirmModal from '~/shared/ui/ConfirmModal.vue'

const notesStore = useNotesStore()

const noteIdForDelete = ref<string | null>(null)
const isDeleteModalOpen = computed({
  get: () => noteIdForDelete.value !== null,
  set: (value) => {
    if (!value) {
      noteIdForDelete.value = null
    }
  }
})

const selectedNote = computed(() =>
  noteIdForDelete.value ? notesStore.getNoteById(noteIdForDelete.value) : null
)

const notes = computed(() => notesStore.allNotes)

function requestDeleteNote(noteId: string) {
  noteIdForDelete.value = noteId
}

function confirmDeleteNote() {
  if (!noteIdForDelete.value) {
    return
  }

  notesStore.deleteNote(noteIdForDelete.value)
  noteIdForDelete.value = null
}
</script>

<template>
  <div class="notes-page">
    <section class="notes-page__header">
      <h1 class="notes-page__title">
        Заметки
      </h1>
      <UButton
        icon="i-lucide-plus"
        to="/notes/new"
      >
        Создать заметку
      </UButton>
    </section>

    <div
      v-if="notes.length"
      class="notes-page__grid"
    >
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :preview-todos="notesStore.getTodoPreviewByNoteId(note.id)"
        @delete="requestDeleteNote"
      />
    </div>

    <div
      v-else
      class="notes-page__empty"
    >
      Заметок пока нет. Создайте первую заметку.
    </div>

    <ConfirmModal
      v-model:open="isDeleteModalOpen"
      title="Удалить заметку?"
      :description="`Вы уверены, что хотите удалить заметку «${selectedNote?.title || ''}»?`"
      confirm-text="Удалить"
      cancel-text="Отмена"
      @confirm="confirmDeleteNote"
    />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as app;

.notes-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    @media (min-width: app.$bp-sm) {
      gap: 16px;
    }

    @media (min-width: app.$bp-md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: app.$bp-lg) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__empty {
    font-size: 14px;
    color: var(--ui-text-muted, #737373);
  }
}
</style>
