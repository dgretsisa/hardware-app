import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/** Redux */
import { Provider } from 'react-redux';
import store from './redux/store/store';

/** Context */
import { SocketContext, socket } from './context/websocket.context';

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
