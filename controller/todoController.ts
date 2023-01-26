import { Response, Request } from "../deps.ts";
import { Todos } from '../data/todos.ts'
import Todo from "../interfaces/Todo.ts";

// create type req, res
type myCtx = {
    request: Request,
    response: Response,
    params: { id: string }
};

// untuk membaca file todos.json
const readFiletodos: () => Array<Todo> = (): Array<Todo> => {
    const data: string = Deno.readTextFileSync("./data/todos.json");
    const dataJson: Array<Todo> = JSON.parse(data);
    return dataJson;
}

// fungsi untuk menulis file todos.json
const writeFile: (data: Todo[]) => Promise<void> = async (data: Todo[]): Promise<void> =>{
    const dataJson: string = JSON.stringify(data);
    await Deno.writeTextFile('./data/todos.json', dataJson);
}

export default {

    getAllTodos({ response }: myCtx) {
        
        response.status = 200;
        response.body = {
            success: true,
            data: readFiletodos(),

        };
        return;
    },

    getTodoById({ params, response }: myCtx): void {
        const id: string = params.id;

        const todo: Todo | undefined = readFiletodos().find((t: Todo): boolean => t.id === id);
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
        
        // menambah data todo baru pada array todos
        const dataTodos =  [...readFiletodos(), data];
        // menambah data json todos
        writeFile(dataTodos);

        response.status = 201;
        response.body = {
            success: "true",
            data: data
        };
        return;
    },

    async updateTodo({ params, request, response }: myCtx): Promise<void> {
        const dataTodos: Todo[] = readFiletodos();
        const id: string = params.id;
        // find todo by param id
        const findIndex: number = dataTodos.findIndex((t: Todo): boolean => t.id === id);
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
        const dataBody: { todo?: string, isCompleted?: boolean } = await request.body().value;
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }
        // update todo by index
        dataTodos[findIndex] = {
            ...dataTodos[findIndex],
            ...dataBody,
            updatedAt: String(new Date())
        };
        writeFile(dataTodos);
        // response
        response.status = 201;
        response.body = {
            success: "true",
            data: Todos[findIndex]
        };
        return;
    },
    deleteTodo({ params, response }: myCtx): void {
        // deklarasi data todos
        const dataTodos : Todo[] = readFiletodos()
        // ambil parameter id dari url
        const id: string = params.id;
        // cari index array data todos berdasarkan id
        const findIndex: number = dataTodos.findIndex((t: Todo): boolean => t.id === id);
        // cek apakan index ada atau tidak
        if (findIndex < 0) {
            // jika indexnya tidak ditemukan
            response.status = 404;
            response.body = {
                success: false,
                messsage: "id not found"
            }
            return
        }
        // hapus todo berdasarkan index
        dataTodos.splice(findIndex, 1);
        // simpan perubahan pada file todos.json
        writeFile(dataTodos);
        // respon api
        response.status = 200;
        response.body = {
            success: true,
            message: "todo has been deleted"
        }
        return;
    }
}