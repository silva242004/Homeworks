import { useState, FormEvent } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useTaskContext, Task } from "../context/TaskContext"
import TaskCard from "../components/TaskCard"

const Tasks = () => {
  const [newTitle, setNewTitle] = useState("")
  const { user, logout }        = useAuthContext()
  const { tasks, loading, error, addTask } = useTaskContext()

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    await addTask(newTitle.trim())
    setNewTitle("")
  }

  const handleLogout = async () => {
    await logout()
  }

  // ── Filtros de visualización ──────────────────────
  const pendientes = tasks.filter(t => !t.done)
  const completadas = tasks.filter(t => t.done)

  return (
    <div className="tasks-container">

      {/* Header */}
      <header className="tasks-header">
        <div>
          <h1 className="tasks-title">Mis Tareas</h1>
          <p className="tasks-user">👤 {user?.email}</p>
        </div>
        <button
          className="btn btn-logout"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Formulario nueva tarea */}
      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="task-input"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !newTitle.trim()}
        >
          + Agregar
        </button>
      </form>

      {error && <p className="tasks-error">{error}</p>}

      {/* Lista de tareas */}
      {loading ? (
        <p className="tasks-loading">Cargando tareas...</p>
      ) : (
        <>
          {/* Pendientes */}
          {pendientes.length > 0 && (
            <section className="tasks-section">
              <h2 className="section-title">
                Pendientes ({pendientes.length})
              </h2>
              {pendientes.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </section>
          )}

          {/* Completadas */}
          {completadas.length > 0 && (
            <section className="tasks-section">
              <h2 className="section-title section-title--done">
                Completadas ({completadas.length})
              </h2>
              {completadas.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </section>
          )}

          {/* Sin tareas */}
          {tasks.length === 0 && (
            <div className="tasks-empty">
              <p>¡No tienes tareas aún!</p>
              <p>Agrega una arriba para empezar 👆</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Tasks