import { useCallback, useEffect, useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { TASK_STATUS } from "../constants/taskStatus";

const getErrorMessage = (error) => {
  const response = error?.response?.data;

  if (response?.message) {
    return response.message;
  }

  if (response?.title) {
    return response.title;
  }

  return "Nao foi possivel completar a operacao. Verifique se a API esta em execucao.";
};

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(TASK_STATUS.all);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async (status, options = { showLoading: true }) => {
    if (options.showLoading) {
      setLoading(true);
    }

    setError("");

    try {
      const data = await tasksApi.list(status);
      setTasks(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      if (options.showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadTasks(filter);
  }, [filter, loadTasks]);

  const runMutation = async (mutation) => {
    setSaving(true);
    setError("");

    try {
      await mutation();
      await loadTasks(filter, { showLoading: false });
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const createTask = (task) => runMutation(() => tasksApi.create(task));

  const updateTask = (id, task) => runMutation(() => tasksApi.update(id, task));

  const completeTask = (task) =>
    updateTask(task.id, {
      title: task.title,
      description: task.description || "",
      status: TASK_STATUS.done,
    });

  const deleteTask = (id) => runMutation(() => tasksApi.remove(id));

  return {
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
    reload: () => loadTasks(filter),
  };
}
