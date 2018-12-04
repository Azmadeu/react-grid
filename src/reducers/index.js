import { combineReducers } from 'redux';
import Coordinates from './coordinates'
import FocusList from './focusList'

const rootReducer = combineReducers({ Coordinates, FocusList });

export { rootReducer }
