import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles.css';
import './script-vision-logo.png';
import App from './App.jsx';
import store from './store';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);