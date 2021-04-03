//Store es el archivo central que contendrá el state y comunicará a las vistas los cambios que provengan de los reducer.

import  { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';                               //Importando el index.js donde convergen los reducer.

//Para la extension de Redux Developer Tools y otros middleware
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)                                       //Necesario para utilizar thunk
);

const store = createStore(reducer, enhancer);

export default store;

