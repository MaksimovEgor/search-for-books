import {combineReducers, createStore, creteStore} from 'redux';

let reducers = combineReducers({});

let store = createStore(reducers);

export default store;


window.store = store;