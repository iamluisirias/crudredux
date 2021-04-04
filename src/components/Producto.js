import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Actions de Redux 
import { editarProductoAction, eliminarProductoAction } from '../action/productoAction';

const Producto = ({producto}) => {

    const { id, nombre, precio } = producto;

    const dispatch = useDispatch();
    const history = useHistory();           //Habilitar history para redireccion.

    const confirmarBorrarProducto = id => {

        //Preguntar al usuario
        Swal.fire({
            title: 'Está seguro?',
            text: "Este es un cambio irreversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                //Mandarlo al action
                dispatch ( eliminarProductoAction(id) );
            }
          })
    }

    //Funcion que redirige de forma programada.
    const redireccionarEdicion = producto => {
        //Mandarlo al action
        dispatch ( editarProductoAction(producto) );

        //Para ir a esa direccion cuando se ejecute el dispatch.
        history.push(`/productos/editar/${producto.id}`)
    }


    return (
        <tr>
            <td>{nombre}</td> 
            <td><span className="font-weight-bold">${precio}</span></td> 
            <td className="acciones">
                <button type="button" className="btn btn-primary mr-2" onClick={() => redireccionarEdicion(producto)}>Editar</button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarBorrarProducto(id)}
                >Eliminar</button>
            </td> 
        </tr>
    );
};

export default Producto;