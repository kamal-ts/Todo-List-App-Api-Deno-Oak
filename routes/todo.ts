import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import todoController from '../controller/todoController.ts';

const router = new Router();

router
    .get("/todos", todoController.getAllBooks)
    .get("/todos:id", todoController.getBookById)
    .post("/todos", todoController.createBook)
    .patch("/todos", todoController.updateBook)
    .delete("/todos/:id", todoController.deleteBook);

export default router;