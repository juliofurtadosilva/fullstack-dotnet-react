import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, loading, saving, onUpdate, onComplete, onDelete }) {
  if (loading) {
    return <p className="empty-state">Carregando tarefas...</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty-state">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onComplete={onComplete}
          onDelete={onDelete}
          saving={saving}
        />
      ))}
    </ul>
  );
}
