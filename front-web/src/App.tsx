import React, { useState, useEffect } from 'react';

const App = () => {
const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('mudou de valor')
    }, [counter]);

    return (
      <div className="container mt-5">
          <button className="btn btn-primary mr-3" onClick={() => setCounter(counter + 1)} >
              +
          </button>
          <span>
              {counter}
          </span>
          <button className="btn btn-primary ml-3" onClick={() => setCounter(counter - 1)} >
              -
          </button>

          <div>
              {counter > 5 && <h1>O valor é maior do que 5</h1>}
              {counter <= 5 && <h1>O valor é menor ou igual a 5</h1>}
          </div>
      </div>
    );
}

export default App;