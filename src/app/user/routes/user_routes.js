import {Router} from 'express'
import {pool} from "../../../config/config_db.js";



const userRouter = Router();

userRouter.get('/user', (req, res) => {
    res.send('Welcome to the user page');
});


export default userRouter;