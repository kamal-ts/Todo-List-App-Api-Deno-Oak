import { Response, Request } from "../deps.ts";
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
        
        const data: Todo = {
            id: String(crypto.randomUUID()),
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

    async updateTodo({ params, request, response }: myCtx) {
        const id: string = params.id;
        // find todo by param id
        const findIndex = Todos.findIndex((t: Todo): boolean => t.id === id);
        // if todo not found
        if (findIndex < 0) {
            response.status = 404;
            response.body = {
                success: false,
                message: "id not found",
            };
            return;
        }
        // get request body
        const dataBody : {todo?: string, isCompleted?:boolean} = await request.body().value;
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }
        // update todo by index
        Todos[findIndex] = {
            ...Todos[findIndex],
            ...dataBody,
            updatedAt: String(new Date())
        };
        // response
        response.status = 201;
        response.body = {
            success: "true",
            data: Todos[findIndex]
        };
        return;
    },
    deleteTodo({ params, response }: myCtx) {
        const id: string = params.id;
        const findIndex = Todos.findIndex((t):boolean => t.id === id);
        if (findIndex < 0) {
            response.status = 404;
            response.body = {
                success: false,
                messsage: "id not found"
            }
            return
        }
        Todos.splice(findIndex, 1);
        response.status = 200;
        response.body = {
            success: true,
            message: "todo has been deleted"
        }
        return;
    }
}