import React from 'react';
import Alert from './Alert';

const App = () => {
    return (
      <div className="container mt-5">
          <Alert text="Leonardo"/>
          <Alert text="Manuela"/>
          <Alert />
      </div>
    );
}

export default App;