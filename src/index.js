import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';

if (module.hot) {
  module.hot.accept()
}

const wrapper = document.getElementById('app');
ReactDOM.render(<App/>, wrapper);