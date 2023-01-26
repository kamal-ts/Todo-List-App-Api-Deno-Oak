import { Application, Context, existsSync } from "./deps.ts";
import todoRouter from './routes/todo.ts'

const app = new Application();

// Logger
app.use(async (ctx: Context, next): Promise<void> => {
    await next();
    const rt: string | null = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx: Context, next): Promise<void> => {
    const start: number = Date.now();
    await next();
    const ms: number = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// make direktory
app.use(async (_ctx: Context, next): Promise<void> => {
    if (!existsSync("./data")) await Deno.mkdir("data");
    if (!existsSync("./data/todos.json")) await Deno.writeTextFile("./data/todos.json", '[]');
    next();
})

// routes
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// Hello World!
app.use((ctx: Context): void => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });