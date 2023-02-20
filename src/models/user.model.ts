import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fname: String,
    lname: String,
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
    }
})

const User = mongoose.model('User', userSchema);
export default User;