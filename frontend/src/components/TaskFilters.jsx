import React from 'react';

export default function TaskFilters({ filters, onChange }) {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value, page: 1 });

  return (
    <div style={styles.bar}>
      <input
        name="search" value={filters.search || ''} onChange={handle}
        placeholder="Search tasks..." style={styles.search}
      />
      <select name="status" value={filters.status || ''} onChange={handle} style={styles.sel}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select name="priority" value={filters.priority || ''} onChange={handle} style={styles.sel}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

const styles = {
  bar: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  search: {
    flex: 2, minWidth: 180, padding: '9px 14px', borderRadius: 8,
    border: '1px solid #e2e8f0', fontSize: 14, outline: 'none',
  },
  sel: {
    flex: 1, minWidth: 130, padding: '9px 12px', borderRadius: 8,
    border: '1px solid #e2e8f0', fontSize: 14,
  },
};
