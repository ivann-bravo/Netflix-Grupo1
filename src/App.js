import React from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App" style={{
      background: 'linear-gradient(to bottom, #000 0%, #141414 100%)',
      minHeight: '100vh'
    }}>

      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default App;