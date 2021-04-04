import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR   
} from '../types';

//Cada reducer tiene su propio state que cambiara y retornara ese cambio al store.
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeditar: null,
    productoeliminar: null
}

const reducer = ( state = initialState, action ) => { //Si no se le pasa el state y la accion proveniente del store, toma el state inicial como valores.
    
    switch (action.type) {
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }    
        
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTO_ERROR:
        case ELIMINAR_PRODUCTO_ERROR:    
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }        
        
        case DESCARGA_PRODUCTO_EXITO: 
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        
        case ELIMINAR_PRODUCTO:    
            return {
                ...state,
                productoeliminar: action.payload        //Para seleccionar primero cual y preguntar antes de borrarlo.
            }

        case ELIMINAR_PRODUCTO_EXITO: 
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null
            }    

        case EDITAR_PRODUCTO: 
            return {
                ...state,
                productoeditar: action.payload
            }    

        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }   

        default:
            return state;
    }

};       

export default reducer;