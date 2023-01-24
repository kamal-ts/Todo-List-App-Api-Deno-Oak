import { Response, Request, v5 } from "../deps.ts";
import { Todos } from '../data/todos.ts'
import Todo from "../interfaces/Todo.ts";

// create type req, res
type myCtx = {
    request: Request,
    response: Response,
    params: { id: string }
};

export default {

    getAllTodos({ response }: myCtx): void {
        response.status = 200;
        response.body = {
            success: true,
            data: Todos
        };
        return;
    },

    getTodoById({ params, response }: myCtx): void {
        const id: string = params.id;

        const todo: Todo | undefined = Todos.find((t: Todo): boolean => t.id === id);
        if (!todo) {
            response.status = 404;
            response.body = {
                success: false,
                message: "todo not found"
            }
            return;
        }

        response.status = 200;
        response.body = {
            success: true,
            data: todo
        }
        return;
    },
    async createTodo({ request, response }: myCtx): Promise<void> {
        const { todo, isCompleted } = await request.body().value;
        
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }
        const NAMESPACE_URL = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        const data: Todo = {
            id: String(await v5.generate(NAMESPACE_URL, new TextEncoder().encode("python.org"))),
            todo: String(todo),
            isCompleted: Boolean(isCompleted),
            createdAt: String(new Date()),
            updatedAt: String(new Date())
        };
        Todos.push(data);
        response.status = 201;
        response.body = {
            success: "true",
            data
        };
        return;
    },
    updateTodo({ response }: myCtx) {
        response.status
    },
    deleteTodo({ response }: myCtx) {
        response.status
    }
}