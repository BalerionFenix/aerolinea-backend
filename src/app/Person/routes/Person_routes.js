import {Router} from 'express'



const userRouter = Router();

userRouter.get('/user', (req, res) => {
    res.send('Welcome to the user page');
});


export default userRouter;