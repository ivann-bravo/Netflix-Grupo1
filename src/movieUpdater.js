import usersData from './data/users.json'

const saveInLocalStorage = () => {
  // Guardar en LocalStorage al iniciar la app si no existe
  if(!localStorage.getItem('users')){
    localStorage.setItem('users', JSON.stringify(usersData))
  }
}

// Funcion para obtener los usuarios del LocalStorage
const getUsersFromStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Funcion para guardar los usuarios actualizados
const saveUsersToStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
}

// Agregar una pelicula al historial
const addMovieToRecord = (userId, movie) => {
  const users = getUsersFromStorage();
  const userIndex = users.findIndex((user) => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].record.push(movie);
    
    // Guardar los datos actualizados
    saveUsersToStorage(users);
    console.log('Se agrego una pelicula al historial')
  }
}

// Agregar una pelicula a la lista
const addMovieToMiList = (userId, movie) => {
  const users = getUsersFromStorage();
  const userIndex = users.findIndex((user) => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].miList.push(movie);
    
    // Guardar los datos actualizados
    saveUsersToStorage(users);
    console.log('Se agrego una pelicula a la lista')
  }
}

// Quitar una pelicula de la lista
const removeMovieToList = (userId, movie) => {
  const users = getUsersFromStorage();
  const userIndex = users.findIndex((user) => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].record.filter(item => item.id !== movie.id);
    
    // Guardar los datos actualizados
    saveUsersToStorage(users);
    console.log('Se elimino una pelicula de la lista')
  }
}

export {saveInLocalStorage,
    getUsersFromStorage,
    saveUsersToStorage,
    addMovieToRecord, 
    addMovieToMiList, 
    removeMovieToList
  }