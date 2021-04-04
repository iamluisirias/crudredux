import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { comenzarEditarProductoAction } from '../action/productoAction';

const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    //Nuevo state para el producto.
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: ''
    });

    //Extrayendo los valores por destructuring.
    const { nombre, precio } = producto;

    //Extrayendo los datos del state del producto a editar.
    const productoEditar = useSelector(state => state.productos.productoeditar);
    
    //Llenar el state automaticamente con el productoeditar traido.
    useEffect( () => {
        guardarProducto(productoEditar);
    }, [productoEditar])

    
    
    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value 
        })
    }

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch( comenzarEditarProductoAction(producto) );

        history.push('/');
    }

    

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre" 
                                    id="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="precio">Precio del producto</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio" 
                                    id="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;