import React from 'react';
import './App.css';
import Joke from './components/Joke'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Joke />
    </div>
  );
}

export default App;
