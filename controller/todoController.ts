import { Response, Request } from "../deps.ts";
import { Todos } from '../data/todos.ts'
import Todo from "../interfaces/Todo.ts";

// create type req, res
type myCtx = {
    request: Request,
    response: Response,
    params: {id:string}
};

export default {

    getAllTodos({response}: myCtx): void{
        response.status = 200;
        response.body = {
            success: true,
            data: Todos
        };
        return;
    },

    getTodoById({params, response}: myCtx): void{
        const id: string = params.id;
        
        const todo: Todo | undefined = Todos.find((t: Todo):boolean => t.id === id);
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
            success : true,
            data: todo
        }
        return;
    },
    createTodo({response}: myCtx){
        response.status
    },
    updateTodo({response}: myCtx){
        response.status
    },
    deleteTodo({response}: myCtx){
        response.status
    }
}