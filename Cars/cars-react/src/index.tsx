import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import { App } from './app/App';

<<<<<<< HEAD
ReactDOM.render(
  <React.StrictMode>
    {  <App /> }
  </React.StrictMode>,
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

>>>>>>> 40a134ee45da5d8985eb6703d17d251723408d9e

reportWebVitals();