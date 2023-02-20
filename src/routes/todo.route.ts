import { Router } from "express";
import { body } from "express-validator";
import Todo from "../models/todo.model";
import { authGuard, validate } from "../utils/validator";

const todoRouter = Router();

todoRouter.get('/', authGuard, async (req, res) => {
    try {
        const currentUser = req.user;
        const todos = await Todo.find({ user: currentUser?.id });
        res.json(todos);
    } catch (err: any) {
        res.status(400).send({ err: err });
    }
});

todoRouter.get('/:todoId', authGuard, async (req, res) => {
    try {
        const id = req.params['todoId'];
        const todo = await Todo.findOne({ _id: id, user: req.user?.id });
        res.json(todo);
    } catch (err) {
        res.status(400).send({ err: err });
    }
});

todoRouter.post('/create', authGuard, validate([
    body('title').isString(),
    body('status').optional().isIn(['pending', 'done', 'archived'])
]), async (req, res) => {
    try {
        const { title, status } = req.body;
        const todo = new Todo({
            title,
            status: status ? status : 'pending',
            user: req.user?.id,
        });
        await todo.save();
    
        res.json(todo);
    } catch(err) {
        res.status(400).send({ err: err });
    }
});

todoRouter.put('/:todoId', authGuard, validate([
    body('title').optional().isString(),
    body('status').optional().isIn(['pending', 'done', 'archived'])
]), async (req, res) => {
    try {
      const id = req.params['todoId'];

      const { title, status } = req.body;
      const todo = await Todo.findByIdAndUpdate(id, {
        title,
        status,
      });
      res.json(todo);
    } catch(err) {
      res.status(400).send({ err: err });
    }
});

todoRouter.delete('/:todoId', authGuard, async (req, res) => {
    try {
        const id = req.params['todoId'];
        const todo = await Todo.findByIdAndDelete(id);
        res.json(todo);
    } catch(err) {
        res.status(400).send({ err: err });
    }
});

export default todoRouter;