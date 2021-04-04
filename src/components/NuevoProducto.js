import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import { crearNuevoProductoAction } from '../action/productoAction';
import { mostrarAlertaAction, ocultarAlertaAction } from '../action/alertaAction';

const NuevoProducto = ({history}) => {              //history es un prop a los que los componentes dentro del router tienen acceso.

    //state del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    //Utilizar useDispatch devuelve una función
    const dispatch = useDispatch();

    //Para acceder al state del store se utiliza el hook useSelector
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error );

    const alerta = useSelector( state => state.alertas.alerta );

    //Manda a llamar la funcion del productoAction.
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )  //El dispatch se usa para llamar las funciones del action.

    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar form
        if (nombre.trim() === '' || Number(precio) <= 0) {
            
            //Si hay errores
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch( mostrarAlertaAction(alerta) );

            return;
        }

        //Si no hay errores
        dispatch( ocultarAlertaAction() );

        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //Redireccionar a la pagina principal
        history.push('/');

    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar un producto nuevo
                        </h2>

                        {
                            alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null
                        }

                        <form
                            onSubmit={submitNuevoProducto}
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
                                    onChange={e => guardarNombre(e.target.value)}
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
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;