import express, {json} from "express";
import userRouter from "./app/user/routes/user_routes.js";

const app = express();
app.use(express.json());
app.use('/api', [userRouter]);

export default app;

