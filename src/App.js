import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Grid from './containers/grid';
import { hot } from 'react-hot-loader';
import './App.css';

export const Comp = () => {
  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  )
};

const App = hot(module)(() => {
  return (
    <Comp/>
  )
});

export default App