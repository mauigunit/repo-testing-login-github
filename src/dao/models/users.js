import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {type: String, unique: true},
    password: String
})

const userService = mongoose.model('usuarios', usersSchema)

export default userService