import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, deleteTask, updateTaskStatus } from '../services/api';

export function useTasks(filters = {}) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(filters);
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line

  useEffect(() => { load(); }, [load]);

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setTotal((n) => n - 1);
  };

  const changeStatus = async (id, status) => {
    const updated = await updateTaskStatus(id, status);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return { tasks, total, loading, error, reload: load, removeTask, changeStatus };
}
