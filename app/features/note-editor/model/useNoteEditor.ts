import type { TodoItem } from '~/entities/note'
import { useNotesStore } from '~/entities/note'
import { createId } from '~/shared/lib/createId'
import { useEditorHistory } from './useEditorHistory'

export function useNoteEditor() {
  const route = useRoute()
  const router = useRouter()
  const notesStore = useNotesStore()
  const toast = useToast()

  const noteId = computed(() => String(route.params.id || 'new'))
  const isCreateMode = computed(() => noteId.value === 'new')

  const title = ref('')
  const todos = ref<TodoItem[]>([])
  const {
    canUndo,
    canRedo,
    initHistory,
    undo,
    redo
  } = useEditorHistory(title, todos)

  const isCancelModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)

  const sourceNote = computed(() =>
    notesStore.getNoteById(noteId.value)
  )

  const isDirty = computed(() => {
    if (isCreateMode.value) {
      return title.value.trim().length > 0 || todos.value.length > 0
    }

    if (!sourceNote.value) return false

    const initial = JSON.stringify({
      title: sourceNote.value.title,
      todos: sourceNote.value.todos
    })

    const current = JSON.stringify({
      title: title.value,
      todos: todos.value
    })

    return initial !== current
  })

  function fillForm() {
    if (isCreateMode.value) {
      title.value = ''
      todos.value = []
      initHistory()
      return
    }

    if (!sourceNote.value) {
      initHistory()
      return
    }

    title.value = sourceNote.value.title
    todos.value = sourceNote.value.todos.map(todo => ({ ...todo }))
    initHistory()
  }

  function addTodo() {
    todos.value.push({
      id: createId(),
      text: '',
      done: false
    })
  }

  function removeTodo(todoId: string) {
    todos.value = todos.value.filter(todo => todo.id !== todoId)
  }

  function updateTodoText(todoId: string, text: string) {
    const todo = todos.value.find(item => item.id === todoId)
    if (!todo) return

    todo.text = text
  }

  function updateTodoDone(todoId: string, done: boolean) {
    const todo = todos.value.find(item => item.id === todoId)
    if (!todo) return

    todo.done = done
  }

  function saveNote() {
    const normalizedTitle = title.value.trim()

    if (!normalizedTitle) return

    if (isCreateMode.value) {
      const created = notesStore.createNote({
        title: normalizedTitle,
        todos: todos.value
      })

      toast.add({
        title: 'Данные сохранены',
        description: 'Новая заметка успешно создана.',
        color: 'success'
      })
      router.replace(`/notes/${created.id}`)
      initHistory()
      return
    }

    notesStore.updateNote(noteId.value, {
      title: normalizedTitle,
      todos: todos.value
    })
    toast.add({
      title: 'Данные сохранены',
      description: 'Изменения заметки сохранены.',
      color: 'success'
    })
    initHistory()
  }

  function askCancelEdit() {
    if (!isDirty.value) {
      return
    }

    isCancelModalOpen.value = true
  }

  function confirmCancelEdit() {
    isCancelModalOpen.value = false
    fillForm()
  }

  function askDeleteNote() {
    isDeleteModalOpen.value = true
  }

  function confirmDeleteNote() {
    if (!isCreateMode.value) {
      notesStore.deleteNote(noteId.value)
    }

    isDeleteModalOpen.value = false
    router.push('/')
  }

  watch(noteId, fillForm, { immediate: true })

  return {
    title,
    todos,
    sourceNote,
    isCreateMode,
    isDirty,
    isCancelModalOpen,
    isDeleteModalOpen,
    canUndo,
    canRedo,
    addTodo,
    removeTodo,
    updateTodoText,
    updateTodoDone,
    saveNote,
    undo,
    redo,
    askCancelEdit,
    confirmCancelEdit,
    askDeleteNote,
    confirmDeleteNote
  }
}
