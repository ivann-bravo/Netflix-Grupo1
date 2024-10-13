import  "./Formulario.css";
import {useState} from "react";

function Formulario({setUser}){
    const [nombre,setNombre]= useState('');
    const [contraseña,setContraseña]= useState('');
    const [error, setError]= useState(false);
  
    const handleSubmit = (evento) =>{
        evento.preventDefault();
               
        if(nombre === "" || contraseña===""){
            setError(true)
            return
        }
        setError(false);
        setUser([nombre]);
    }
  

    return(
        <section className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                 value={nombre}
                 onChange={evento=> setNombre(evento.target.value)}
                />
                <input type="password"
                    value={contraseña}
                    onChange={evento=> setContraseña(evento.target.value)}
                />
                <button>Iniciar sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    )

}

export default Formulario;