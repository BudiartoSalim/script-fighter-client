import React from 'react';
import { Container } from 'react-bootstrap';
import OnGame from './components/onGame'

function App() {

  return (
    <div
    style= {{
      margin: 'auto',
      border: '3px solid green',
    }}>
      <OnGame/>
    </div>
  );
}

export default App;