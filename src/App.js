import React from 'react';
import MovieList from './components/MovieList';
import './App.css';
import Formulario from './components/Formulario.js';

import {useState} from "react";


function App() {
  const [user,setUser]= useState([]);

  return (
    <div className="App" style={{
      background: 'linear-gradient(to bottom, #000 0%, #141414 100%)',
      minHeight: '100vh'
    }}>

      <main>
      {!user.length >0
        ?<Formulario setUser={setUser}/>
        : <MovieList /> 

      }
      </main>
    </div>
  );
}

export default App;