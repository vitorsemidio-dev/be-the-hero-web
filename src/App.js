import React, { useState } from 'react';

import Header from './Header';

function App() {
  let [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
    console.log(counter);
  }
  return (
    <>
      <Header title="Semana Omnistack" />
      <Header>
        Contador: {counter}
      </Header>

      <button onClick={increment}>Incrementar</button>
    </>
  );
}

export default App;
