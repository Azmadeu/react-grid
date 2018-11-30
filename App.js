import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import {hot} from 'react-hot-loader';
import RostGrid from './src/containers/orders';
import './App.styl';

export const Comp = () => {
  return (
    <Provider store={store}>
      <RostGrid />
    </Provider>
  )
};

const App = hot(module)(() => {
  return (
    <Comp/>
  )
});

export default App