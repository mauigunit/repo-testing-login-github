import mongoose from 'mongoose';
const usersCollection = 'users';

import mongoosePaginate from 'mongoose-paginate-v2'

const usersSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, required: true}
})

usersSchema.plugin(mongoosePaginate);

export {usersCollection, usersSchema};