import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

import type { Note, TodoItem } from './types'

const TODO_PREVIEW_LIMIT = 3
const NOTES_STORAGE_KEY = 'notes-store-v1'

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function cloneTodos(todos: TodoItem[]): TodoItem[] {
  return todos.map(todo => ({ ...todo }))
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  if (import.meta.client) {
    const readFromStorage = () => {
      const saved = localStorage.getItem(NOTES_STORAGE_KEY)
      if (!saved) return

      try {
        const parsed = JSON.parse(saved) as Note[]
        if (!notes.value.length && parsed.length) {
          notes.value = parsed
        }
      } catch {
        notes.value = []
      }
    }

    // First pass for cold start, second pass after hydration.
    readFromStorage()
    queueMicrotask(readFromStorage)

    watch(notes, (value) => {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(value))
    }, { deep: true })
  }

  const allNotes = computed(() => notes.value)

  const getNoteById = (noteId: string) =>
    notes.value.find(note => note.id === noteId)

  const getTodoPreviewByNoteId = (noteId: string, limit = TODO_PREVIEW_LIMIT) => {
    const note = notes.value.find(item => item.id === noteId)

    return note ? note.todos.slice(0, limit) : []
  }

  const createNote = (payload?: { title?: string, todos?: TodoItem[] }) => {
    const now = new Date().toISOString()
    const nextNote: Note = {
      id: createId(),
      title: payload?.title?.trim() || 'Untitled note',
      todos: cloneTodos(payload?.todos ?? []),
      createdAt: now,
      updatedAt: now
    }

    notes.value.unshift(nextNote)
    return nextNote
  }

  const updateNote = (noteId: string, patch: { title?: string, todos?: TodoItem[] }) => {
    const note = notes.value.find(item => item.id === noteId)
    if (!note) return false

    if (typeof patch.title === 'string') note.title = patch.title
    if (patch.todos) note.todos = cloneTodos(patch.todos)

    note.updatedAt = new Date().toISOString()
    return true
  }

  const deleteNote = (noteId: string) => {
    const index = notes.value.findIndex(note => note.id === noteId)
    if (index === -1) return false

    notes.value.splice(index, 1)
    return true
  }

  const addTodo = (noteId: string, text = '') => {
    const note = notes.value.find(item => item.id === noteId)
    if (!note) return null

    const todo: TodoItem = {
      id: createId(),
      text,
      done: false
    }

    note.todos.push(todo)
    note.updatedAt = new Date().toISOString()
    return todo
  }

  const removeTodo = (noteId: string, todoId: string) => {
    const note = notes.value.find(item => item.id === noteId)
    if (!note) return false

    const index = note.todos.findIndex(todo => todo.id === todoId)
    if (index === -1) return false

    note.todos.splice(index, 1)
    note.updatedAt = new Date().toISOString()
    return true
  }

  const updateTodoText = (noteId: string, todoId: string, text: string) => {
    const note = notes.value.find(item => item.id === noteId)
    if (!note) return false

    const todo = note.todos.find(item => item.id === todoId)
    if (!todo) return false

    todo.text = text
    note.updatedAt = new Date().toISOString()
    return true
  }

  const toggleTodo = (noteId: string, todoId: string) => {
    const note = notes.value.find(item => item.id === noteId)
    if (!note) return false

    const todo = note.todos.find(item => item.id === todoId)
    if (!todo) return false

    todo.done = !todo.done
    note.updatedAt = new Date().toISOString()
    return true
  }

  return {
    notes,
    allNotes,
    getNoteById,
    getTodoPreviewByNoteId,
    createNote,
    updateNote,
    deleteNote,
    addTodo,
    removeTodo,
    updateTodoText,
    toggleTodo
  }
})
