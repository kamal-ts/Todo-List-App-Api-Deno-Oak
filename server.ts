import { Application, Context, existsSync } from "./deps.ts";
import todoRouter from './routes/todo.ts'

const app = new Application();


app.use(async (_ctx: Context, next): Promise<void> => {
    if (!existsSync("./data")) await Deno.mkdir("data");
    if (!existsSync("./data/todos.json")) await Deno.writeTextFile("./data/todos.json", '[]');
    next();
})


app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// Hello World!
app.use((ctx: Context): void => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });