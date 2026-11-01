import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';
import toast from 'react-hot-toast';

const empty = { title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' };

export default function TaskForm({ existing, onSaved, onCancel }) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || '',
        description: existing.description || '',
        status: existing.status || 'pending',
        priority: existing.priority || 'medium',
        dueDate: existing.dueDate ? existing.dueDate.split('T')[0] : '',
      });
    } else {
      setForm(empty);
    }
  }, [existing]);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setLoading(true);
    try {
      const payload = { ...form, dueDate: form.dueDate || null };
      const saved = existing ? await updateTask(existing._id, payload) : await createTask(payload);
      toast.success(existing ? 'Task updated!' : 'Task created!');
      onSaved(saved);
      if (!existing) setForm(empty);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={styles.form}>
      <h2 style={styles.heading}>{existing ? 'Edit Task' : 'New Task'}</h2>
      <input
        name="title" value={form.title} onChange={handle}
        placeholder="Task title *" required style={styles.input}
      />
      <textarea
        name="description" value={form.description} onChange={handle}
        placeholder="Description (optional)" rows={3} style={styles.textarea}
      />
      <div style={styles.row}>
        <select name="status" value={form.status} onChange={handle} style={styles.select}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={form.priority} onChange={handle} style={styles.select}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date" name="dueDate" value={form.dueDate} onChange={handle} style={styles.select}
        />
      </div>
      <div style={styles.row}>
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Saving...' : existing ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
    padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 12,
  },
  heading: { margin: 0, fontSize: 18, color: '#1e293b' },
  input: {
    padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
    fontSize: 15, outline: 'none',
  },
  textarea: {
    padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
    fontSize: 14, outline: 'none', resize: 'vertical',
  },
  row: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  select: {
    flex: 1, minWidth: 120, padding: '9px 12px', borderRadius: 8,
    border: '1px solid #e2e8f0', fontSize: 14,
  },
  submitBtn: {
    flex: 1, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8,
    padding: '10px 0', fontSize: 15, cursor: 'pointer', fontWeight: 600,
  },
  cancelBtn: {
    flex: 1, background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8,
    padding: '10px 0', fontSize: 15, cursor: 'pointer', fontWeight: 600,
  },
};
