import React, { useState } from "react";
import validarUser from "../validarUser";

function Login({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (evento) => {
        evento.preventDefault();

        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }

        const existeUsuario = validarUser(nombre, contraseña);

        if (existeUsuario !== -1) {
            setUser(existeUsuario);
        } else {
            setError(true);
            return;
        }

        setError(false);
    };


    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="login-content">
                <header className="App-header">
                    <div className="header-left">
                        <img src={process.env.PUBLIC_URL + '/netflix-logo.png'} alt="Netflix" className="netflix-logo" />
                    </div>
                </header>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h1>Inicia sesión</h1>
                        <div className="input-group">
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(evento) => setNombre(evento.target.value)}
                                required
                            />
                            <label htmlFor="nombre">Nombre de usuario</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="contraseña"
                                value={contraseña}
                                onChange={(evento) => setContraseña(evento.target.value)}
                                required
                            />
                            <label htmlFor="contraseña">Contraseña</label>
                        </div>
                        <button type="submit" className="login-button">Iniciar sesión</button>
                        {error && <p className="error-message">No se encontró el usuario</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;