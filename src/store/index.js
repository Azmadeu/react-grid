import { createStore } from 'redux';
import { rootReducer } from 'src/reducers';

const store = createStore(rootReducer);

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
