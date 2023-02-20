import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/user.route';
import { connect } from './src/utils/fakedb';
import User from './src/models/user.model';
import todoRouter from './src/routes/todo.route';
import userService from './src/services/user.service';

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(userRouter);
app.use('/todo', todoRouter);

// database connection starting

connect().then(async () => {
    console.log('Database Connected');
    //await User.findOneAndDelete({ email: 'abcd@gmail.com' });
    // locally register the user using hard code because tempory storage will lose the past registration 
    await userService.register('abc@gmail.com', 'Adheesha', 'b', '12345678', 'user');
    app.listen(5000, () => console.log('Server Started'));
}).catch((err) => {
    console.error('Connection ERROR', err);
})

