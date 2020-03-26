import React, { useState } from 'react';

import Logon from './pages/Logon';

function App() {
  let [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
    console.log(counter);
  }
  return (
    <>
      <Logon/>

      <button onClick={increment}>Incrementar</button>
    </>
  );
}

export default App;
