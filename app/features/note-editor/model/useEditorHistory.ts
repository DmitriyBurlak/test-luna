import type { Ref } from 'vue'

import type { TodoItem } from '~/entities/note'

/** Количество снапшотов в истории undo/redo */
const MAX_EDITOR_HISTORY_STEPS = 20

interface EditorSnapshot {
  title: string
  todos: TodoItem[]
}

function cloneTodos(todos: TodoItem[]): TodoItem[] {
  return todos.map(todo => ({ ...todo }))
}

function snapshotsEqual(a: EditorSnapshot, b: EditorSnapshot): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function useEditorHistory(title: Ref<string>, todos: Ref<TodoItem[]>) {
  const history = ref<EditorSnapshot[]>([])
  const historyIndex = ref(-1)
  const isApplyingHistory = ref(false)

  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  function createSnapshot(): EditorSnapshot {
    return {
      title: title.value,
      todos: cloneTodos(todos.value)
    }
  }

  function applySnapshot(snapshot: EditorSnapshot) {
    isApplyingHistory.value = true
    title.value = snapshot.title
    todos.value = cloneTodos(snapshot.todos)
    queueMicrotask(() => {
      isApplyingHistory.value = false
    })
  }

  function initHistory() {
    const snapshot = createSnapshot()
    history.value = [snapshot]
    historyIndex.value = 0
  }

  function pushToHistory() {
    if (isApplyingHistory.value) return

    const snapshot = createSnapshot()
    const currentSnapshot = history.value[historyIndex.value]

    if (currentSnapshot && snapshotsEqual(currentSnapshot, snapshot)) return

    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }

    history.value.push(snapshot)
    historyIndex.value = history.value.length - 1

    if (history.value.length > MAX_EDITOR_HISTORY_STEPS) {
      const excess = history.value.length - MAX_EDITOR_HISTORY_STEPS
      history.value = history.value.slice(excess)
      historyIndex.value = Math.max(0, historyIndex.value - excess)
    }
  }

  function undo() {
    if (!canUndo.value) return

    historyIndex.value -= 1
    const snapshot = history.value[historyIndex.value]
    if (!snapshot) return

    applySnapshot(snapshot)
  }

  function redo() {
    if (!canRedo.value) return

    historyIndex.value += 1
    const snapshot = history.value[historyIndex.value]
    if (!snapshot) return

    applySnapshot(snapshot)
  }

  function handleHotkeys(event: KeyboardEvent) {
    const isMetaOrCtrl = event.metaKey || event.ctrlKey
    if (!isMetaOrCtrl || event.key.toLowerCase() !== 'z') return

    event.preventDefault()

    if (event.shiftKey) {
      redo()
      return
    }

    undo()
  }

  watch([title, todos], pushToHistory, { deep: true })

  onMounted(() => {
    window.addEventListener('keydown', handleHotkeys)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleHotkeys)
  })

  return {
    canUndo,
    canRedo,
    initHistory,
    undo,
    redo
  }
}
