import { useState } from "react";
import { STATUS_LABELS, TASK_STATUS } from "../constants/taskStatus";
import { TaskForm } from "./TaskForm";

const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));

export function TaskItem({ task, onUpdate, onComplete, onDelete, saving }) {
  const [isEditing, setIsEditing] = useState(false);
  const isDone = task.status === TASK_STATUS.done;

  const handleUpdate = async (payload) => {
    await onUpdate(task.id, payload);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <TaskForm
          initialValues={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitLabel="Salvar"
          disabled={saving}
        />
      </li>
    );
  }

  return (
    <li className="task-item">
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className={`status-badge ${task.status}`}>
            {STATUS_LABELS[task.status] || task.status}
          </span>
        </div>

        {task.description && <p>{task.description}</p>}

        <dl className="task-dates">
          <div>
            <dt>Criada</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
          <div>
            <dt>Atualizada</dt>
            <dd>{formatDate(task.updatedAt)}</dd>
          </div>
        </dl>
      </div>

      <div className="task-actions">
        {!isDone && (
          <>
            <button
              type="button"
              className="button secondary"
              onClick={() => setIsEditing(true)}
              disabled={saving}
            >
              Editar
            </button>
            <button
              type="button"
              className="button success"
              onClick={() => onComplete(task)}
              disabled={saving}
            >
              Concluir
            </button>
          </>
        )}
        <button
          type="button"
          className="button danger"
          onClick={() => onDelete(task.id)}
          disabled={saving}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
