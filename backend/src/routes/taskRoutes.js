const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');
const { taskValidationRules, validate } = require('../middleware/validate');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(getAllTasks));
router.get('/:id', asyncHandler(getTaskById));
router.post('/', taskValidationRules, validate, asyncHandler(createTask));
router.put('/:id', taskValidationRules, validate, asyncHandler(updateTask));
router.patch('/:id/status', asyncHandler(updateTaskStatus));
router.delete('/:id', asyncHandler(deleteTask));

module.exports = router;
