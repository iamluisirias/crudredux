import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR 
} from '../../types';

//Cliente axios para hacer las peticiones a la API
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';


/* ------------------------------------------- Logica para agregar un nuevo producto ----------------------------------- */
//Crear nuevos productos
export const crearNuevoProductoAction = producto => {
    return async ( dispatch ) => {
        dispatch( agregarProducto() );

        try {

            //Insertando en la API.
            await clienteAxios.post('/prductos', producto);

            //Si todo sale bien actualizar el state.
            dispatch ( agregarProductoExito(producto) );

            //Alerta 
            Swal.fire(
                'Correcto', 
                'El producto ha sido agregado exitosamente', 
                'success'
            );

        } catch (error) {
            console.log(error);
            
            //Si existe un error, cambiar el state.
            dispatch( agregarProductoError(true) );

             //Alerta 
             Swal.fire(
                'Error', 
                'Ha ocurrido un error', 
                'error'
            );
        }
    }
}

//Definiendo la funcion asociada al action crearProductoNuevo
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Si el agregar el producto a la base de datos es exitoso.
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo un error al agregar un producto.
const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})

/* ----------------------------------------------------------------------------------------------------------------------------------- */