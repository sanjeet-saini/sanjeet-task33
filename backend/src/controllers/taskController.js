const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  const { status, priority, search, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  res.json({ tasks, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted successfully' });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask };
