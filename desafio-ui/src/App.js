import "./App.css";
import { StatusFilter } from "./components/StatusFilter";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    filter,
    setFilter,
    loading,
    saving,
    error,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
  } = useTasks();

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">Fullstack challenge</p>
          <h1>Gerenciador de tarefas</h1>
        </div>
        <span className="task-count">{tasks.length} tarefas</span>
      </section>

      <section className="new-task-section" aria-labelledby="new-task-title">
        <h2 id="new-task-title">Nova tarefa</h2>
        <TaskForm onSubmit={createTask} disabled={saving} />
      </section>

      <section className="tasks-section" aria-labelledby="tasks-title">
        <div className="section-toolbar">
          <div>
            <h2 id="tasks-title">Tarefas</h2>
          </div>
          <StatusFilter value={filter} onChange={setFilter} disabled={loading || saving} />
        </div>

        {error && <p className="alert-error">{error}</p>}

        <TaskList
          tasks={tasks}
          loading={loading}
          saving={saving}
          onUpdate={updateTask}
          onComplete={completeTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;
