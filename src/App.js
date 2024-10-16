import React from 'react';
import MovieList from './components/MovieList';
import './App.css';
import Login from './components/Login.js';

import {useState} from "react";


function App() {
  const [user,setUser]= useState(null);

  return (
    <div className="App" style={{
      background: 'linear-gradient(to bottom, #000 0%, #141414 100%)',
      minHeight: '100vh'
    }}>

      <main>
      {!user
        ?<Login setUser={setUser}/>
        : <MovieList user={user} setUser={setUser} /> 

      }
      </main>
    </div>
  );
}

export default App;