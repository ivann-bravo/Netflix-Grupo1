import React from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App" style={{
      background: 'linear-gradient(to bottom, #000 0%, #141414 100%)',
      minHeight: '100vh'
    }}>
      <header className="App-header">
        <h1>Netflix Grupo 1</h1>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default App;