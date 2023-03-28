import containerMongoDB from "../dao/index.dao.js";
import {usersCollection, usersSchema} from '../dao/models/users.models.js';

const userModel = new containerMongoDB(usersCollection, usersSchema);

const registerUser = async (firstname, lastname, email, password, rol) => {
    const registro = { firstname, lastname, email, password, rol };
    console.log(registro);
    let result = await userModel.registerUser(registro);
    return result
}

const loginUser = async (email) => {
    const search = {email};
    let result = await userModel.searchUser(search);
    return result
}

export {registerUser, loginUser};