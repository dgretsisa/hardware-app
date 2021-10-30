import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/** Context */
import { SocketContext, socket } from './context/websocket.context';

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SocketContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
