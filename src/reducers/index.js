import {combineReducers} from 'redux';
import allOrders from './getOrders';
import Checked from './checked';
import Sorted from './sorted';

const rootReducer = combineReducers({
  allOrders, Checked, Sorted
});

export {rootReducer}
