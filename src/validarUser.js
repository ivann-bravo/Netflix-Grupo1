import Users from "./data/users.json";
import { getUsersFromStorage } from "./movieUpdater";

function validarUser(nombre, contraseña) {

    const user = Users.find(user => user.user === nombre && user.pass === contraseña)
    const users = getUsersFromStorage();

    if(user){
        const userId = user.id
        const userIndex = users.findIndex((user) => user.id === userId);
        return users[userIndex] ? users[userIndex] : -1

    }else {
        return -1
    }


}

export default validarUser;