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

function createDemoNote() {
  const demoNote = notesStore.createNote({
    title: `Демо-заметка ${notes.value.length + 1}`,
    todos: [
      { id: `${Date.now()}-1`, text: 'Сформировать список задач', done: false },
      { id: `${Date.now()}-2`, text: 'Проверить сохранение после F5', done: false },
      { id: `${Date.now()}-3`, text: 'Открыть страницу редактирования', done: true },
      { id: `${Date.now()}-4`, text: 'Удалить заметку через модалку', done: false }
    ]
  })

  if (demoNote.id) {
    noteIdForDelete.value = null
  }
}

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
    <section class="flex! it! justify-between! gap-4!">
      <h1 class="text-2xl font-semibold">
        Заметки
      </h1>
      <div class="flex flex-wrap gap-2">
        <UButton
          icon="i-lucide-plus"
          @click="goToCreateNote"
        >
          Создать заметку
        </UButton>
        <UButton
          color="neutral"
          variant="soft"
          icon="i-lucide-flask-conical"
          @click="createDemoNote"
        >
          Создать демо-заметку
        </UButton>
      </div>
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
      :description="`Вы уверены что хотете удалить заметку - «${selectedNote?.title || ''}» ?`"
      confirm-text="Удалить"
      cancel-text="Отмена"
      @confirm="confirmDeleteNote"
    />
  </div>
</template>
