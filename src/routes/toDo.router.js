import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo_controllers.js";

const router = Router()

router.get('/todo', authRequired, getTodo)
router.post('/todo', authRequired, createTodo)

router.get('/todo:id', authRequired, getTodo)
router.delete('/todo:id', authRequired, deleteTodo)
router.put('/todo:id', authRequired, updateTodo)

export default router;