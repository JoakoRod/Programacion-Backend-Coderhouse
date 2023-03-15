import express, { Express } from "npm:express";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import mainRouter from './routes/index';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.listen(config().PORT);
console.log(`Server ok on port ${config().PORT}`);

//deno run --allow-net --allow-read --allow-env index.ts