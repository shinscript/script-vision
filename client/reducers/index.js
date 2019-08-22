import { combineReducers } from 'redux';
import mainReducer from './MainReducer';

const reducers = combineReducers({
  main: mainReducer,
});

// make the combined reducers available for import
export default reducers;