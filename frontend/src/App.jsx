import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';

export default function App() {
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', page: 1 });
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { tasks, total, loading, error, reload, removeTask, changeStatus } = useTasks(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''))
  );

  const handleSaved = () => {
    setShowForm(false);
    setEditingTask(null);
    reload();
  };

  const handleStatusChange = async (id, status) => {
    try {
      await changeStatus(id, status);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const openEdit = (task) => { setEditingTask(task); setShowForm(true); };

  return (
    <div style={styles.root}>
      <Toaster position="top-right" />
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.logo}>✅ To-Do App</h1>
          <button onClick={() => { setEditingTask(null); setShowForm(true); }} style={styles.newBtn}>
            + New Task
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {showForm && (
          <div style={styles.formWrapper}>
            <TaskForm
              existing={editingTask}
              onSaved={handleSaved}
              onCancel={() => { setShowForm(false); setEditingTask(null); }}
            />
          </div>
        )}

        <section style={styles.section}>
          <TaskFilters filters={filters} onChange={setFilters} />
          <div style={styles.meta}>
            {loading ? 'Loading...' : `${total} task${total !== 1 ? 's' : ''} found`}
          </div>
          {error && <div style={styles.error}>{error}</div>}
          {!loading && !error && tasks.length === 0 && (
            <div style={styles.empty}>No tasks yet. Create one!</div>
          )}
          <div style={styles.grid}>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onEdit={openEdit}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  root: { minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  header: { background: '#6366f1', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
  headerInner: {
    maxWidth: 960, margin: '0 auto', padding: '1rem 1.5rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  logo: { margin: 0, color: '#fff', fontSize: 22, fontWeight: 700 },
  newBtn: {
    background: '#fff', color: '#6366f1', border: 'none', borderRadius: 8,
    padding: '8px 18px', fontSize: 14, cursor: 'pointer', fontWeight: 700,
  },
  main: { maxWidth: 960, margin: '0 auto', padding: '1.5rem' },
  formWrapper: { marginBottom: '1.5rem' },
  section: { display: 'flex', flexDirection: 'column', gap: 16 },
  meta: { color: '#64748b', fontSize: 14 },
  error: { background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: 8 },
  empty: { textAlign: 'center', color: '#94a3b8', padding: '3rem 0', fontSize: 16 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
};
