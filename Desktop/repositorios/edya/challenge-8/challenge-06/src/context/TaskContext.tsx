import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react"
import useCollection, { FirestoreDoc } from "../hooks/useCollection"
import { useAuthContext } from "./AuthContext"

// ─── Tipos ────────────────────────────────────────────
export interface Task extends FirestoreDoc {
  title:     string
  done:      boolean
  userId:    string
  createdAt: string
}

interface TaskContextType {
  tasks:      Task[]
  loading:    boolean
  error:      string | null
  addTask:    (title: string) => Promise<void>
  toggleTask: (id: string, done: boolean) => Promise<void>
  removeTask: (id: string) => Promise<void>
  updateTask: (id: string, title: string) => Promise<void>
}

// ─── Contexto ─────────────────────────────────────────
const TaskContext = createContext<TaskContextType | null>(null)

// ─── Provider ─────────────────────────────────────────
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext()
  const { data, loading, error, getAll, add, update, remove, clear} =
    useCollection("tasks")

  // Carga las tareas del usuario actual al montar
 useEffect(() => {
  if (user) {
    clear()                                      // ← limpia antes de cargar
    getAll([["userId", "==", user.uid]])
  } else {
    clear()                                      // ← limpia al cerrar sesión
  }
}, [user])

  // ── Agregar tarea ─────────────────────────────────
  const addTask = async (title: string): Promise<void> => {
    if (!user) return
    await add({
      title,
      done:      false,
      userId:    user.uid,
      createdAt: new Date().toISOString(),
    })
  }

  // ── Toggle done/pending ───────────────────────────
  const toggleTask = async (id: string, done: boolean): Promise<void> => {
    await update(id, { done: !done })
  }

  // ── Editar título ─────────────────────────────────
  const updateTask = async (id: string, title: string): Promise<void> => {
    await update(id, { title })
  }

  // ── Eliminar tarea ────────────────────────────────
  const removeTask = async (id: string): Promise<void> => {
    await remove(id)
  }

  return (
    <TaskContext.Provider value={{
      tasks:      data as Task[],
      loading,
      error,
      addTask,
      toggleTask,
      removeTask,
      updateTask,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

// ─── Hook para consumir el contexto ───────────────────
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de TaskProvider")
  }
  return context
}