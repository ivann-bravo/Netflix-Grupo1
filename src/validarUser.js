import Users from "./data/users.json";

function validarUser( nombre , contraseña ){
    

    return Users.find( user => user.user === nombre && user.pass === contraseña )


}

export  default validarUser;
