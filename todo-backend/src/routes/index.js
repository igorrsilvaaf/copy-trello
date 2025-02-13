import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as todoController from '../controllers/todoController.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Todo routes (protected)
router.use('/todos', authMiddleware);
router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export default router; 