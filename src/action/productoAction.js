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
    EDITAR_PRODUCTO_ERROR, 
    COMENZAR_EDITAR_PRODUCTO
} from '../types';

//Cliente axios para hacer las peticiones a la API
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


/* ------------------------------------------- Logica para agregar un nuevo producto ----------------------------------- */
//Crear nuevos productos
export const crearNuevoProductoAction = producto => {
    return async ( dispatch ) => {
        dispatch( agregarProducto() );

        try {

            //Insertando en la API.
            await clienteAxios.post('/productos', producto);

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
};

//Definiendo la funcion asociada al action crearProductoNuevo
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//Si el agregar el producto a la base de datos es exitoso.
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si hubo un error al agregar un producto.
const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

/* ----------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------- Logica para descargar los productos de la base de datos -------------------------------------- */
//Descargar los productos de la API
export const descargarProductosAction = () => {
    return async ( dispatch ) => {
        dispatch( descargarProductos() );

        try {
            
            const resultado = await clienteAxios.get('/productos');

            dispatch ( descargarProductosExito(resultado.data) );

        } catch (error) {
            console.log(error);

            dispatch ( descargarProductosError() );
        }
    }
};

//Comenzando a buscar los productos en la db o api.
const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

//Si se obtienen los productos de la API con éxito.
const descargarProductosExito = productos => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
});

//Si hubo un problema al obtener los productos de API
const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------- Logica para eliminar un producto ------------------------------------------- */
export const eliminarProductoAction = id => {
    return async dispatch => {
        dispatch( eliminarProducto(id) )

        try {

            await clienteAxios.delete(`/productos/${id}`)

            dispatch( eliminarProductoExito() )

            //Alerta si se elimina
            Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado',
                'success'
            )
            
        } catch (error) {
            console.log(error);

            dispatch( eliminarProductoError() )
        }
    }
};

const eliminarProducto = id => ({
    type: ELIMINAR_PRODUCTO,
    payload: id
});

const eliminarProductoExito = () => ({
    type: ELIMINAR_PRODUCTO_EXITO
    //payload: id
});


const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
});

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ---------------------------------- Logica para editar un producto seleccionado. ---------------------------------------------- */

//Obteniendo el proyecto a editar.
export const editarProductoAction = producto => {
    return dispatch => {
        dispatch( obtenerProductoEditar(producto) );
    }
};

const obtenerProductoEditar = producto => ({
    type: EDITAR_PRODUCTO,
    payload: producto
});

//Editando el producto en la api.
export const comenzarEditarProductoAction = producto => {
    return async dispatch => {
        dispatch( editarProducto() )

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            
            dispatch( editarProductoExito(producto) )

        } catch (error) {
            console.log(error);

            dispatch( editarProductoError() )
        }
    }
};

//Este no va al reducer porque no cambia el state, ya que solo nos dice que se esta comenzando a editar un producto.
const editarProducto = () => ({
    type: COMENZAR_EDITAR_PRODUCTO
});


const editarProductoExito = producto => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
})

