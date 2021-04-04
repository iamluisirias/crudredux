import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//Componentes
import Producto from './Producto';

//Actions de Redux 
import { descargarProductosAction } from '../action/productoAction';


const Productos = () => {

    //Para usar el hook del dispatch
    const dispatch = useDispatch();

    ////Para acceder al state del store se utiliza el hook useSelector
    const productos = useSelector( state => state.productos.productos );
    const error = useSelector( state => state.productos.error );
    const cargando = useSelector( state => state.productos.loading );

    useEffect(() => {

        //Funcion para cargar los productos
        const cargarProductos = () => dispatch( descargarProductosAction() ) 
        cargarProductos();
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <h2 className="text-center my-5">Listado de productos</h2>

            {
                error? <p className="font-weight-bold text-center alert alert-danger mt-4">Hubo un error</p> : null
            }

            {
                cargando? <p className="text-center">Cargando productos...</p> : null
            }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.length === 0 
                        ? 
                            'No hay productos' 
                        : 
                            productos.map( producto => (
                                <Producto 
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default Productos;