<script setup lang="ts">
import NoteCard from '~/entities/note/ui/NoteCard.vue'
import { useNotesStore } from '~/entities/note'
import ConfirmModal from '~/shared/ui/ConfirmModal.vue'

const notesStore = useNotesStore()
const router = useRouter()

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

function goToCreateNote() {
  router.push('/notes/new')
}

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
  <div class="space-y-6">
    <section class="flex! justify-between! flex-wrap gap-4!">
      <h1 class="text-2xl font-semibold">
        Заметки
      </h1>
      <UButton
        icon="i-lucide-plus"
        @click="goToCreateNote"
      >
        Создать заметку
      </UButton>
    </section>

    <div class="pt-4">
      <div
        v-if="notes.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
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
        class="text-sm text-muted"
      >
        Заметок пока нет. Создайте первую заметку.
      </div>
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
