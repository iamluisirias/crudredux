//Index sera el archivo donde convergeran todos los reducer para tener un solo state.

import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertasReducer from './alertasReducer';

export default combineReducers({
    productos: productosReducer,
    alertas: alertasReducer
});