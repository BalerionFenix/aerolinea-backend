import express, {json} from "express";
import baseRouter from "./app/Base/routes/baseRouter.js";

const app = express();
app.use(express.json());
app.use('/api', [baseRouter]);

export default app;

