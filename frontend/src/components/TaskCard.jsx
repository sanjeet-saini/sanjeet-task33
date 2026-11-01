import React, { useState } from 'react';

const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const STATUS_LABELS = { pending: 'Pending', 'in-progress': 'In Progress', completed: 'Completed' };

export default function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    setDeleting(true);
    try { await onDelete(task._id); } finally { setDeleting(false); }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={{ ...styles.priority, color: PRIORITY_COLORS[task.priority] }}>
          ● {task.priority}
        </span>
        <span style={styles.status}>{STATUS_LABELS[task.status]}</span>
      </div>
      <h3 style={styles.title}>{task.title}</h3>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      {task.dueDate && (
        <p style={styles.due}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div style={styles.actions}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          style={styles.select}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onEdit(task)} style={styles.editBtn}>Edit</button>
        <button onClick={handleDelete} disabled={deleting} style={styles.deleteBtn}>
          {deleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priority: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase' },
  status: {
    fontSize: 11,
    background: '#f1f5f9',
    borderRadius: 12,
    padding: '2px 10px',
    color: '#475569',
    fontWeight: 600,
  },
  title: { margin: 0, fontSize: 16, color: '#1e293b' },
  desc: { margin: 0, fontSize: 14, color: '#64748b' },
  due: { margin: 0, fontSize: 12, color: '#94a3b8' },
  actions: { display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' },
  select: { fontSize: 13, padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', flex: 1 },
  editBtn: {
    background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6,
    padding: '5px 14px', cursor: 'pointer', fontSize: 13,
  },
  deleteBtn: {
    background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6,
    padding: '5px 14px', cursor: 'pointer', fontSize: 13,
  },
};
