import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'src/reducers';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

store.subscribe(() => {
  console.log(store.getState())
});

if (module.hot) {
  module.hot.accept('src/reducers', () => {
    const nextRootReducer = require('src/reducers').rootReducer;
    store.replaceReducer(nextRootReducer)
  })
}

export default store
