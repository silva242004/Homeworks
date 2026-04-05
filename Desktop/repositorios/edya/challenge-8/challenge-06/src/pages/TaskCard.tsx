import { useState } from "react"
import { useTaskContext, Task } from "../context/TaskContext"

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const { toggleTask, removeTask, updateTask } = useTaskContext()

  const handleEdit = async () => {
    if (!editTitle.trim()) return
    await updateTask(task.id, editTitle.trim())
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  return (
    <div className={`task-card ${task.done ? "task-card--done" : ""}`}>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id, task.done)}
        className="task-checkbox"
      />

      {/* Título o input de edición */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          className="task-edit-input"
          autoFocus
          onKeyDown={e => {
            if (e.key === "Enter")  handleEdit()
            if (e.key === "Escape") handleCancelEdit()
          }}
        />
      ) : (
        <span className={`task-title ${task.done ? "task-title--done" : ""}`}>
          {task.title}
        </span>
      )}

      {/* Acciones */}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button
              className="btn-icon btn-icon--save"
              onClick={handleEdit}
              title="Guardar"
            >
              ✓
            </button>
            <button
              className="btn-icon btn-icon--cancel"
              onClick={handleCancelEdit}
              title="Cancelar"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-icon btn-icon--edit"
              onClick={() => setIsEditing(true)}
              title="Editar"
              disabled={task.done}
            >
              ✎
            </button>
            <button
              className="btn-icon btn-icon--delete"
              onClick={() => removeTask(task.id)}
              title="Eliminar"
            >
              
            </button>
          </>
        )}
      </div>

    </div>
  )
}

export default TaskCard