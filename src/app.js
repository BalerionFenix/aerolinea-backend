import express, {json} from "express";
import baseRouter from "./app/Base/routes/baseRouter.js";
import avionRouter from "./app/Base/routes/avionRouter.js";

const app = express();
app.use(express.json());
app.use('/api', [baseRouter, avionRouter]);

export default app;

