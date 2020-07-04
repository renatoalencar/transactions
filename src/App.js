import React, { useState } from 'react';
import './App.css';

function App() {
  const [isVisible, showHello] = useState(false);

  return (
    <div className="App">
      <button onClick={showHello}>click me</button>

      {isVisible && <b>Hello</b>}
    </div>
  );
}

export default App;
