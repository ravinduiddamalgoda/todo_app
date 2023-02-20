import mongoose from "mongoose";

const todoScheme = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'done', 'archived'],
        default: 'pending',
        required: true,
    }
}, {
    timestamps: true,
});


const Todo = mongoose.model('Todo', todoScheme);
export default Todo;