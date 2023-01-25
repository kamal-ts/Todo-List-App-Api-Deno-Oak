import { Router } from "../deps.ts";
import todoController from '../controller/todoController.ts';

const router = new Router();

router
    .get("/todos", todoController.getAllTodos)
    .get("/todos/:id", todoController.getTodoById)
    .post("/todos", todoController.createTodo)
    .patch("/todos/:id", todoController.updateTodo)
    .delete("/todos/:id", todoController.deleteTodo);

export default router;