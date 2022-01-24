import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const PORT = parse(args).port;
//const PORT : number  = +Deno.env.get("PORT");

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on Port:${PORT} 🚀`);

await app.listen({ port: PORT });
