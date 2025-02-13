import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findOne({ user: req.userId });
    res.json(todos || { lists: [], tasks: [], settings: {} });
  } catch (err) {
    res.status(400).json({ error: 'Error loading todos' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      user: req.userId
    });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Error creating todo' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { user: req.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Error updating todo' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ user: req.userId });
    res.send();
  } catch (err) {
    res.status(400).json({ error: 'Error deleting todo' });
  }
}; 