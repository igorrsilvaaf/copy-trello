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
        const { id } = req.params;
        
        const todo = await Todo.findOne({ user: req.userId });
        
        if(!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        const listExists = todo.lists.some(list => list.id === id);
        if (!listExists) {
            return res.status(404).json({ error: "List not found" });
        }
        
        todo.lists = todo.lists.filter(list => list.id !== id);
        todo.tasks = todo.tasks.filter(task => task.list !== id);
        await todo.save();
        
        res.json({ message: "List deleted successfully" });
    } catch (err) {
        console.error("Erro ao excluir lista:", err);
        res.status(400).json({ error: "Error deleting list" });
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const todo = await Todo.findOne({ user: req.userId });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        const listExists = todo.tasks.some(task => task.id === taskId);
        if (!listExists) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        todo.tasks = todo.tasks.filter(task => task.id !== taskId);
        await todo.save();
        
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
        res.status(400).json({ error: 'Error deleting task' });
    }
}; 